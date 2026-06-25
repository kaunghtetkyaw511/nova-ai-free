const WEBLLM_VERSION = "0.2.84";
const WEBLLM_URL = `https://esm.run/@mlc-ai/web-llm@${WEBLLM_VERSION}`;
const MODEL_ID = "Qwen3-0.6B-q4f16_1-MLC";

let engine = null;
let loadingPromise = null;

export function getLocalAiInfo() {
  return {
    model: MODEL_ID,
    loaded: Boolean(engine),
    hasWebGPU: Boolean(navigator.gpu),
  };
}

export async function loadLocalModel(onProgress = () => {}) {
  if (engine) return engine;
  if (loadingPromise) return loadingPromise;
  if (!navigator.gpu) {
    throw new Error("This device does not expose WebGPU. Update Chrome/Edge/Safari or try a newer device.");
  }

  loadingPromise = (async () => {
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
  const stream = await localEngine.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `${instruction || "You are a helpful assistant."}
Reply in the same language as the user unless they ask for another language.
Be honest about uncertainty. Do not claim to have searched sources that are not included in the prompt.`,
      },
      { role: "user", content: `${prompt}\n\n/no_think` },
    ],
    temperature,
    top_p: 0.9,
    max_tokens: 768,
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
