const WEBLLM_VERSION = "0.2.84";
const WEBLLM_URL = `https://esm.run/@mlc-ai/web-llm@${WEBLLM_VERSION}`;
const MODEL_ID = "Qwen3-0.6B-q4f16_1-MLC";
const TRANSFORMERS_URL = "https://esm.run/@huggingface/transformers@3.8.1";
const LITE_MODEL_ID = "onnx-community/SmolLM2-135M-Instruct-ONNX";

let engine = null;
let liteGenerator = null;
let loadingPromise = null;

function isAppleMobile() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function useLiteBackend() {
  return isAppleMobile() || new URLSearchParams(location.search).has("lite");
}

export function getLocalAiInfo() {
  return {
    model: useLiteBackend() ? LITE_MODEL_ID : MODEL_ID,
    loaded: Boolean(engine || liteGenerator),
    backend: useLiteBackend() ? "lite-cpu" : "webgpu",
  };
}

export async function loadLocalModel(onProgress = () => {}) {
  if (engine || liteGenerator) return engine || liteGenerator;
  if (loadingPromise) return loadingPromise;

  loadingPromise = (async () => {
    if (useLiteBackend()) {
      onProgress({ progress: 0.01, text: "Loading iPhone-safe AI engine…" });
      const transformers = await import(TRANSFORMERS_URL);
      liteGenerator = await transformers.pipeline("text-generation", LITE_MODEL_ID, {
        dtype: "q4",
        progress_callback: (report) => {
          const progress = Number(report.progress || 0);
          const file = report.file ? ` ${report.file}` : "";
          onProgress({
            progress: progress > 1 ? progress / 100 : progress,
            text: report.status === "ready"
              ? "iPhone-safe AI is ready"
              : `${report.status || "Downloading"}${file}`,
          });
        },
      });
      onProgress({ progress: 1, text: "iPhone-safe AI is ready" });
      return liteGenerator;
    }

    if (!navigator.gpu) {
      throw new Error("WebGPU is unavailable. Open this app in a newer browser or device.");
    }
    onProgress({ progress: 0.01, text: "Loading the free AI engine…" });
    const webllm = await import(WEBLLM_URL);
    engine = await webllm.CreateMLCEngine(MODEL_ID, {
      initProgressCallback: (report) => {
        onProgress({
          progress: Number(report.progress || 0),
          text: report.text || "Downloading the AI model…",
        });
      },
    });
    onProgress({ progress: 1, text: "Free local AI is ready" });
    return engine;
  })();

  try {
    return await loadingPromise;
  } catch (error) {
    engine = null;
    loadingPromise = null;
    throw error;
  }
}

export async function generateLocalText({ prompt, instruction, temperature = 0.65, onProgress, onToken }) {
  const localEngine = await loadLocalModel(onProgress);
  if (useLiteBackend()) {
    const messages = [
      {
        role: "system",
        content: `${instruction || "You are a helpful assistant."}
Follow the requested response language exactly.
Be concise and honest about uncertainty.`,
      },
      { role: "user", content: prompt },
    ];
    const result = await localEngine(messages, {
      max_new_tokens: 384,
      do_sample: temperature > 0,
      temperature: Math.max(0.1, temperature),
      top_p: 0.9,
    });
    const generated = result?.[0]?.generated_text;
    let text = "";
    if (Array.isArray(generated)) {
      text = generated[generated.length - 1]?.content || "";
    } else {
      text = String(generated || "").replace(prompt, "").trim();
    }
    onToken?.(text, text);
    return text.trim();
  }

  const stream = await localEngine.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `${instruction || "You are a helpful assistant."}
Follow the requested response language exactly.
Be honest about uncertainty. Do not claim to have searched sources that are not included in the prompt.`,
      },
      { role: "user", content: `${prompt}\n\n/no_think` },
    ],
    temperature,
    top_p: 0.9,
    max_tokens: 1024,
    enable_thinking: false,
    stream: true,
  });

  let text = "";
  for await (const chunk of stream) {
    const token = chunk.choices?.[0]?.delta?.content || "";
    text += token;
    onToken?.(cleanModelOutput(text), token);
  }
  return cleanModelOutput(text);
}

function cleanModelOutput(text) {
  const closingTag = text.lastIndexOf("</think>");
  if (closingTag !== -1) return text.slice(closingTag + 8).trim();
  if (text.trimStart().startsWith("<think>")) return "";
  return text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}
