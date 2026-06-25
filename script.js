const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const toolConfig = {
  chat: {
    title: "AI Chat",
    subtitle: "Your everyday thinking partner",
    icon: "message-square-text",
    welcome: "What are we working on?",
    copy: "Ask a question, plan a project, improve an idea, or solve a difficult problem.",
    placeholder: "Ask anything...",
    instruction: "You are a helpful, precise creative and productivity copilot.",
  },
  research: {
    title: "Deep Research",
    subtitle: "Free public-source search and synthesis",
    icon: "telescope",
    welcome: "What should I investigate?",
    copy: "Describe a topic or question. I’ll gather free public sources and create a source-grounded answer.",
    placeholder: "Research a market, topic, product, or question...",
    instruction: "Research the user's topic using only the source excerpts included with the prompt. Give a concise, well-organized report. Clearly distinguish sourced facts from inference.",
    research: true,
  },
  writer: {
    title: "Smart Writer",
    subtitle: "From blank page to polished copy",
    icon: "pen-line",
    welcome: "What should we write?",
    copy: "Give me the topic, audience, tone, and format—or simply paste your rough notes.",
    placeholder: "Write a YouTube script about...",
    instruction: "You are an expert writer. Produce polished, audience-aware writing in the requested tone and format.",
  },
  translate: {
    title: "Translator",
    subtitle: "Natural, context-aware translation",
    icon: "languages",
    welcome: "What should I translate?",
    copy: "Paste your text and name the target language. Tone and meaning will be preserved.",
    placeholder: "Translate this into Burmese...",
    instruction: "Translate accurately and naturally. Preserve meaning, tone, formatting, names, and cultural context.",
  },
  "image-prompt": {
    title: "Image Prompt Lab",
    subtitle: "Ideas into production-ready prompts",
    icon: "palette",
    welcome: "Describe the image in your head",
    copy: "I’ll expand it into a detailed prompt with composition, lighting, lens, palette, and style.",
    placeholder: "A futuristic Yangon at night...",
    instruction: "Turn the user's concept into an excellent image generation prompt. Include subject, composition, lighting, palette, camera, texture, mood, and negative constraints.",
  },
  transcribe: {
    title: "Transcript Helper",
    subtitle: "Clean, structure, and extract",
    icon: "mic-2",
    welcome: "Paste a raw transcript",
    copy: "I can clean filler words, add chapters, summarize, and extract highlights or action items.",
    placeholder: "Paste transcript text here...",
    instruction: "Clean and structure the transcript. Preserve meaning and flag unclear portions rather than inventing content.",
  },
  "voice-script": {
    title: "Voice Script",
    subtitle: "Natural words made to be spoken",
    icon: "radio",
    welcome: "What is the story?",
    copy: "Share a topic, duration, audience, and mood for a natural voiceover or podcast script.",
    placeholder: "Write a 60-second voiceover...",
    instruction: "Write natural spoken-language scripts with good rhythm, breath, emphasis, and timing.",
  },
  code: {
    title: "Code Assistant",
    subtitle: "Build, explain, debug, improve",
    icon: "code-2",
    welcome: "What are you building?",
    copy: "Describe the feature or paste code and an error. Include the language or framework if relevant.",
    placeholder: "Debug this JavaScript...",
    instruction: "You are a senior software engineer. Give correct, secure, maintainable code and concise explanations.",
  },
  summarize: {
    title: "Summarizer",
    subtitle: "Less reading, more understanding",
    icon: "scan-text",
    welcome: "Paste the content to summarize",
    copy: "Choose any long text. I’ll extract the main ideas, decisions, risks, and next actions.",
    placeholder: "Paste an article, report, or notes...",
    instruction: "Summarize the input faithfully. Extract key points, decisions, risks, facts, and action items without inventing details.",
  },
  ideas: {
    title: "Idea Generator",
    subtitle: "Creative directions with substance",
    icon: "lightbulb",
    welcome: "What needs fresh ideas?",
    copy: "Tell me your goal and constraints. I’ll generate distinct, useful directions—not generic filler.",
    placeholder: "Give me campaign ideas for...",
    instruction: "Generate original, diverse, practical ideas. Explain each idea's angle and a concrete first step.",
  },
  photo: { title: "Photo Editor", subtitle: "Fast browser-based image editing", icon: "image-plus", workspace: "photo" },
  video: { title: "Video Studio", subtitle: "Trim and export video clips", icon: "clapperboard", workspace: "video" },
};

let currentTool = "chat";
let localModelLoaded = false;
let localAiModulePromise = null;
let deferredInstallPrompt = null;
let toastTimer;
let photoImage = null;
let photoRotation = 0;
let photoMono = false;
let videoUrl = null;
const historyKey = "nova-ai-activity";

function getLocalAiModule() {
  if (!localAiModulePromise) localAiModulePromise = import("./local-ai.js");
  return localAiModulePromise;
}

function renderIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function showToast(message, icon = "check-circle-2") {
  const toast = $("#toast");
  toast.innerHTML = `<i data-lucide="${icon}"></i><span></span>`;
  $("span", toast).textContent = message;
  renderIcons();
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

function addActivity(tool, detail) {
  const items = JSON.parse(localStorage.getItem(historyKey) || "[]");
  items.unshift({ tool, detail: detail.slice(0, 100), date: new Date().toISOString() });
  localStorage.setItem(historyKey, JSON.stringify(items.slice(0, 30)));
}

function renderActivity() {
  const list = $("#recentList");
  const items = JSON.parse(localStorage.getItem(historyKey) || "[]");
  if (!items.length) {
    list.innerHTML = `<div class="recent-empty">No activity yet. Open a tool and create something.</div>`;
    return;
  }
  list.innerHTML = items.map((item) => {
    const config = toolConfig[item.tool] || toolConfig.chat;
    return `<article class="recent-item">
      <span><i data-lucide="${config.icon}"></i></span>
      <span><strong>${escapeHtml(config.title)}</strong><small>${escapeHtml(item.detail)}</small></span>
      <time>${new Date(item.date).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}</time>
    </article>`;
  }).join("");
  renderIcons();
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function showView(view) {
  $("#homeView").classList.toggle("hidden", view !== "home");
  $("#recentView").classList.toggle("hidden", view !== "recent");
  $$(".nav-item[data-view]").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  if (view === "recent") renderActivity();
  window.scrollTo({ top: 0, behavior: "smooth" });
  $("#sidebar").classList.remove("open");
}

function openTool(tool) {
  const config = toolConfig[tool] || toolConfig.chat;
  currentTool = tool;
  $("#drawerTitle").textContent = config.title;
  $("#drawerSubtitle").textContent = config.subtitle;
  $("#drawerIcon").innerHTML = `<i data-lucide="${config.icon}"></i>`;
  $("#aiWorkspace").classList.toggle("hidden", Boolean(config.workspace));
  $("#photoWorkspace").classList.toggle("hidden", config.workspace !== "photo");
  $("#videoWorkspace").classList.toggle("hidden", config.workspace !== "video");

  if (!config.workspace) {
    $("#aiPrompt").placeholder = config.placeholder;
    $("#modeLabel").innerHTML = `<i data-lucide="${config.research ? "library-big" : "cpu"}"></i> ${config.research ? "Free source research" : "Free local AI"}`;
    $("#chatStream").innerHTML = `<div class="welcome-message">
      <span><i data-lucide="${config.icon}"></i></span>
      <h3 id="welcomeTitle">${escapeHtml(config.welcome)}</h3>
      <p id="welcomeCopy">${escapeHtml(config.copy)}</p>
    </div>`;
    setTimeout(() => $("#aiPrompt").focus(), 280);
  }

  $("#toolDrawer").classList.add("open");
  $("#drawerBackdrop").classList.add("show");
  $("#toolDrawer").setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  $("#sidebar").classList.remove("open");
  renderIcons();
}

function closeTool() {
  $("#toolDrawer").classList.remove("open");
  $("#drawerBackdrop").classList.remove("show");
  $("#toolDrawer").setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function filterTools(category = "all", search = "") {
  let visible = 0;
  const normalized = search.trim().toLowerCase();
  $$(".tool-card").forEach((card) => {
    const categoryMatch = category === "all" || card.dataset.category.split(" ").includes(category);
    const searchMatch = !normalized || card.textContent.toLowerCase().includes(normalized);
    const show = categoryMatch && searchMatch;
    card.classList.toggle("is-filtered", !show);
    if (show) visible += 1;
  });
  $("#emptySearch").classList.toggle("show", visible === 0);
}

function updateModelProgress({ progress = 0, text = "Preparing free AI…" } = {}) {
  const percent = Math.max(0, Math.min(100, Math.round(progress * 100)));
  $("#localModelProgress").style.width = `${percent}%`;
  $("#localModelStatus").textContent = percent >= 100 ? "Free local AI is ready" : `Loading free AI — ${percent}%`;
  $("#localModelDetail").textContent = text;
  $("#apiStatus").classList.remove("connected", "error");
  $("#apiStatus").classList.add("loading");
  $("#apiStatus").lastChild.textContent = ` Loading ${percent}%`;
}

function setModelReady() {
  localModelLoaded = true;
  $("#localModelBar").classList.add("ready");
  $("#localModelBar").classList.remove("error");
  $("#localModelProgress").style.width = "100%";
  $("#localModelStatus").textContent = "Free local AI is ready";
  $("#localModelDetail").textContent = "Runs privately on this device with no per-message fee.";
  $("#apiStatus").classList.add("connected");
  $("#apiStatus").classList.remove("loading", "error");
  $("#apiStatus").lastChild.textContent = " Free AI ready";
  renderIcons();
}

function setModelError(message) {
  $("#localModelBar").classList.add("error");
  $("#localModelBar").classList.remove("ready");
  $("#localModelStatus").textContent = "Free AI could not start";
  $("#localModelDetail").textContent = message;
  $("#loadModelButton").disabled = false;
  $("#loadModelButton").textContent = "Try again";
  $("#apiStatus").classList.add("error");
  $("#apiStatus").classList.remove("loading", "connected");
  $("#apiStatus").lastChild.textContent = " Device unsupported";
}

async function loadFreeModel() {
  const button = $("#loadModelButton");
  button.disabled = true;
  button.textContent = "Loading…";
  try {
    const localAi = await getLocalAiModule();
    await localAi.loadLocalModel(updateModelProgress);
    setModelReady();
    closeSetup();
    showToast("Free local AI is ready");
    return true;
  } catch (error) {
    setModelError(error.message || "The model could not load on this device.");
    showToast("Free AI could not load", "triangle-alert");
    return false;
  }
}

async function checkLocalAi() {
  $("#apiStatus").classList.add("connected");
  $("#apiStatus").lastChild.textContent = navigator.gpu ? " Free local mode" : " Free tools mode";
  try {
    const localAi = await getLocalAiModule();
    const info = localAi.getLocalAiInfo();
    if (info.loaded) setModelReady();
  } catch {
    // The module is loaded lazily again when the user starts the model.
  }
}

function addMessage(role, text, loading = false) {
  $(".welcome-message", $("#chatStream"))?.remove();
  const message = document.createElement("div");
  message.className = `message ${role}${loading ? " loading" : ""}`;
  if (role === "assistant") message.innerHTML = `<span><i data-lucide="sparkles"></i></span>`;
  const content = document.createElement("div");
  content.className = "message-content";
  content.textContent = text;
  message.appendChild(content);
  $("#chatStream").appendChild(message);
  $("#chatStream").scrollTop = $("#chatStream").scrollHeight;
  renderIcons();
  return message;
}

async function submitAi(event) {
  event.preventDefault();
  const input = $("#aiPrompt");
  const prompt = input.value.trim();
  if (!prompt) return;
  const config = toolConfig[currentTool] || toolConfig.chat;
  addMessage("user", prompt);
  input.value = "";
  addActivity(currentTool, prompt);
  const loading = addMessage("assistant", config.research ? "Gathering free public sources" : "Preparing free local AI", true);

  try {
    let finalPrompt = prompt;
    let sources = [];
    if (config.research) {
      sources = await collectResearchSources(prompt);
      if (sources.length) {
        finalPrompt = `${prompt}

Use these source excerpts:
${sources.map((source, index) => `[${index + 1}] ${source.title}
URL: ${source.url}
Excerpt: ${source.excerpt}`).join("\n\n")}

Base factual claims on these excerpts and cite them inline as [1], [2], etc.`;
      } else {
        finalPrompt = `${prompt}

No public source excerpts were available. Give a research plan and clearly label anything that is general knowledge or inference.`;
      }
    }

    const localAi = await getLocalAiModule();
    const content = $(".message-content", loading);
    const text = await localAi.generateLocalText({
      prompt: finalPrompt,
      instruction: config.instruction,
      temperature: config.research ? 0.2 : 0.65,
      onProgress: (report) => {
        updateModelProgress(report);
        content.textContent = report.text || "Loading free local AI…";
      },
      onToken: (fullText) => {
        loading.classList.remove("loading");
        content.textContent = fullText || "Thinking privately…";
        $("#chatStream").scrollTop = $("#chatStream").scrollHeight;
      },
    });
    setModelReady();
    content.textContent = text || "The local model returned no text.";
    loading.classList.remove("loading");
    appendSources(loading, sources);
  } catch (error) {
    $(".message-content", loading).textContent =
      `Free local AI could not run: ${error.message}\n\nPhoto and video tools still work. On mobile, update the browser and make sure the device has enough free storage.`;
    loading.classList.remove("loading");
    setModelError(error.message || "The model could not run.");
  }
  $("#chatStream").scrollTop = $("#chatStream").scrollHeight;
}

async function collectResearchSources(query) {
  const sources = [];
  const normalizedQuery = query
    .replace(/^(what|who|where|when|why|how|is|are|was|were|tell me about|research)\s+/i, "")
    .replace(/[?!.,]+$/g, "")
    .trim() || query;
  const wikiSearchUrl = new URL("https://en.wikipedia.org/w/api.php");
  wikiSearchUrl.search = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: normalizedQuery,
    srlimit: "5",
    format: "json",
    origin: "*",
  });

  const crossrefUrl = new URL("https://api.crossref.org/works");
  crossrefUrl.search = new URLSearchParams({
    query,
    rows: "3",
    select: "title,author,published,URL,abstract",
  });

  const [wikiSearchResult, crossrefResult] = await Promise.allSettled([
    fetch(wikiSearchUrl).then((response) => response.ok ? response.json() : Promise.reject()),
    fetch(crossrefUrl).then((response) => response.ok ? response.json() : Promise.reject()),
  ]);

  if (wikiSearchResult.status === "fulfilled") {
    const searchItems = wikiSearchResult.value.query?.search || [];
    const pageIds = searchItems.map((item) => item.pageid).join("|");
    if (pageIds) {
      try {
        const wikiExtractUrl = new URL("https://en.wikipedia.org/w/api.php");
        wikiExtractUrl.search = new URLSearchParams({
          action: "query",
          pageids: pageIds,
          prop: "extracts|info",
          exintro: "1",
          explaintext: "1",
          exsentences: "7",
          inprop: "url",
          format: "json",
          origin: "*",
        });
        const response = await fetch(wikiExtractUrl);
        const data = response.ok ? await response.json() : {};
        const pages = data.query?.pages || {};
        searchItems.forEach((result) => {
          const page = pages[result.pageid];
          if (!page?.extract) return;
          sources.push({
            title: page.title,
            url: page.fullurl || `https://en.wikipedia.org/?curid=${page.pageid}`,
            excerpt: page.extract.slice(0, 1100),
          });
        });
      } catch {
        // Academic sources below can still provide a useful research result.
      }
    }
  }

  if (crossrefResult.status === "fulfilled") {
    (crossrefResult.value.message?.items || []).forEach((item) => {
      const title = item.title?.[0];
      if (!title || !item.URL) return;
      const year = item.published?.["date-parts"]?.[0]?.[0];
      const author = item.author?.slice(0, 3).map((person) => [person.given, person.family].filter(Boolean).join(" ")).join(", ");
      const abstract = String(item.abstract || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      sources.push({
        title,
        url: item.URL,
        excerpt: [author, year, abstract].filter(Boolean).join(" — ").slice(0, 900),
      });
    });
  }

  return sources.slice(0, 6);
}

function appendSources(message, sources) {
  if (!sources.length) return;
  const sourceBox = document.createElement("div");
  sourceBox.className = "message-sources";
  const label = document.createElement("strong");
  label.textContent = "Sources";
  sourceBox.appendChild(label);
  sources.forEach((source, index) => {
    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = `[${index + 1}] ${source.title}`;
    sourceBox.appendChild(link);
  });
  $(".message-content", message).appendChild(sourceBox);
}

function handleDropZone(zone, input, callback) {
  ["dragenter", "dragover"].forEach((type) => zone.addEventListener(type, (event) => {
    event.preventDefault();
    zone.classList.add("dragging");
  }));
  ["dragleave", "drop"].forEach((type) => zone.addEventListener(type, (event) => {
    event.preventDefault();
    zone.classList.remove("dragging");
  }));
  zone.addEventListener("drop", (event) => {
    const file = event.dataTransfer.files[0];
    if (file) callback(file);
  });
  input.addEventListener("change", () => input.files[0] && callback(input.files[0]));
}

function loadPhoto(file) {
  if (!file.type.startsWith("image/")) return showToast("Please choose an image file", "triangle-alert");
  const reader = new FileReader();
  reader.onload = () => {
    photoImage = new Image();
    photoImage.onload = () => {
      photoRotation = 0;
      photoMono = false;
      resetPhotoControls();
      $("#photoDrop").classList.add("hidden");
      $("#photoStage").classList.remove("hidden");
      drawPhoto();
      addActivity("photo", `Edited ${file.name}`);
    };
    photoImage.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function resetPhotoControls() {
  ["brightness", "contrast", "saturation"].forEach((id) => {
    $(`#${id}`).value = 100;
    $(`#${id}Value`).value = 100;
  });
  $("#blur").value = 0;
  $("#blurValue").value = 0;
}

function drawPhoto() {
  if (!photoImage) return;
  const canvas = $("#photoCanvas");
  const context = canvas.getContext("2d");
  const sideways = Math.abs(photoRotation % 180) === 90;
  const maxDimension = 1800;
  const scale = Math.min(1, maxDimension / Math.max(photoImage.naturalWidth, photoImage.naturalHeight));
  const width = Math.round(photoImage.naturalWidth * scale);
  const height = Math.round(photoImage.naturalHeight * scale);
  canvas.width = sideways ? height : width;
  canvas.height = sideways ? width : height;
  context.save();
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate((photoRotation * Math.PI) / 180);
  context.filter = `brightness(${$("#brightness").value}%) contrast(${$("#contrast").value}%) saturate(${$("#saturation").value}%) blur(${$("#blur").value}px) grayscale(${photoMono ? 1 : 0})`;
  context.drawImage(photoImage, -width / 2, -height / 2, width, height);
  context.restore();
}

function showPhotoPicker() {
  $("#photoStage").classList.add("hidden");
  $("#photoDrop").classList.remove("hidden");
  $("#photoInput").value = "";
}

function loadVideo(file) {
  if (!file.type.startsWith("video/")) return showToast("Please choose a video file", "triangle-alert");
  if (videoUrl) URL.revokeObjectURL(videoUrl);
  videoUrl = URL.createObjectURL(file);
  const video = $("#videoPreview");
  video.src = videoUrl;
  video.onloadedmetadata = () => {
    $("#trimStart").value = 0;
    $("#trimStart").max = video.duration;
    $("#trimEnd").value = video.duration.toFixed(1);
    $("#trimEnd").max = video.duration;
  };
  $("#videoDrop").classList.add("hidden");
  $("#videoStage").classList.remove("hidden");
  addActivity("video", `Edited ${file.name}`);
}

function getTrimRange() {
  const video = $("#videoPreview");
  const start = Math.max(0, Number($("#trimStart").value) || 0);
  const end = Math.min(video.duration || 0, Number($("#trimEnd").value) || video.duration || 0);
  if (end <= start) throw new Error("End time must be after start time.");
  return { start, end };
}

async function previewTrim() {
  try {
    const video = $("#videoPreview");
    const { start, end } = getTrimRange();
    video.currentTime = start;
    await video.play();
    const stop = () => {
      if (video.currentTime >= end) {
        video.pause();
        video.removeEventListener("timeupdate", stop);
      }
    };
    video.addEventListener("timeupdate", stop);
  } catch (error) {
    showToast(error.message, "triangle-alert");
  }
}

async function exportVideo() {
  const button = $("#exportVideo");
  const video = $("#videoPreview");
  try {
    if (!video.captureStream || !window.MediaRecorder) throw new Error("This browser does not support video export. Try Chrome.");
    const { start, end } = getTrimRange();
    video.pause();
    video.currentTime = start;
    await new Promise((resolve) => video.addEventListener("seeked", resolve, { once: true }));
    video.muted = $("#videoMute").checked;
    video.playbackRate = Number($("#videoSpeed").value);
    const stream = video.captureStream();
    if ($("#videoMute").checked) stream.getAudioTracks().forEach((track) => stream.removeTrack(track));
    const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9,opus")
      ? "video/webm;codecs=vp9,opus"
      : "video/webm";
    const recorder = new MediaRecorder(stream, { mimeType });
    const chunks = [];
    recorder.ondataavailable = (event) => event.data.size && chunks.push(event.data);
    button.disabled = true;
    button.innerHTML = `<i data-lucide="loader-circle"></i> Exporting in real time...`;
    renderIcons();
    recorder.start(500);
    await video.play();

    const finish = () => {
      if (video.currentTime >= end || video.ended) {
        video.pause();
        video.removeEventListener("timeupdate", finish);
        if (recorder.state !== "inactive") recorder.stop();
      }
    };
    video.addEventListener("timeupdate", finish);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `nova-clip-${Date.now()}.webm`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      button.disabled = false;
      button.innerHTML = `<i data-lucide="download"></i> Export WebM clip`;
      renderIcons();
      showToast("Video clip exported");
    };
  } catch (error) {
    button.disabled = false;
    button.innerHTML = `<i data-lucide="download"></i> Export WebM clip`;
    renderIcons();
    showToast(error.message, "triangle-alert");
  }
}

function showVideoPicker() {
  $("#videoPreview").pause();
  $("#videoStage").classList.add("hidden");
  $("#videoDrop").classList.remove("hidden");
  $("#videoInput").value = "";
}

function openSetup() {
  $("#setupModal").classList.add("open");
  $("#setupModal").setAttribute("aria-hidden", "false");
}

function closeSetup() {
  $("#setupModal").classList.remove("open");
  $("#setupModal").setAttribute("aria-hidden", "true");
}

document.addEventListener("DOMContentLoaded", () => {
  renderIcons();
  checkLocalAi();

  $$("[data-open-tool], [data-tool]").forEach((button) => {
    button.addEventListener("click", () => openTool(button.dataset.openTool || button.dataset.tool));
  });
  $$("[data-view]").forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
  $$("[data-filter-category]").forEach((button) => button.addEventListener("click", () => {
    showView("home");
    const category = button.dataset.filterCategory;
    $$("#categoryTabs button").forEach((item) => item.classList.toggle("active", item.dataset.category === category));
    filterTools(category);
    $("#tools").scrollIntoView({ behavior: "smooth" });
  }));
  $$("#categoryTabs button").forEach((button) => button.addEventListener("click", () => {
    $$("#categoryTabs button").forEach((item) => item.classList.toggle("active", item === button));
    filterTools(button.dataset.category, $("#globalSearch").value);
  }));

  $("#globalSearch").addEventListener("input", (event) => {
    showView("home");
    const activeCategory = $("#categoryTabs button.active").dataset.category;
    filterTools(activeCategory, event.target.value);
    if (event.target.value) $("#tools").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      $("#globalSearch").focus();
    }
    if (event.key === "Escape") {
      closeTool();
      closeSetup();
      $("#sidebar").classList.remove("open");
    }
  });

  $("#exploreButton").addEventListener("click", () => $("#tools").scrollIntoView({ behavior: "smooth" }));
  $("#menuButton").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  $("#closeDrawer").addEventListener("click", closeTool);
  $("#drawerBackdrop").addEventListener("click", closeTool);
  $("#aiForm").addEventListener("submit", submitAi);
  $("#aiPrompt").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      $("#aiForm").requestSubmit();
    }
  });

  $("#setupButton").addEventListener("click", openSetup);
  $("#loadModelButton").addEventListener("click", loadFreeModel);
  $("#closeSetup").addEventListener("click", closeSetup);
  $("#gotItButton").addEventListener("click", loadFreeModel);
  $("#setupModal").addEventListener("click", (event) => event.target === $("#setupModal") && closeSetup());

  $("#themeButton").addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    localStorage.setItem("nova-theme", dark ? "dark" : "light");
    $("#themeButton").innerHTML = `<i data-lucide="${dark ? "moon" : "sun"}"></i>`;
    renderIcons();
  });
  if (localStorage.getItem("nova-theme") === "dark") {
    document.body.classList.add("dark");
    $("#themeButton").innerHTML = `<i data-lucide="moon"></i>`;
  }

  handleDropZone($("#photoDrop"), $("#photoInput"), loadPhoto);
  ["brightness", "contrast", "saturation", "blur"].forEach((id) => {
    $(`#${id}`).addEventListener("input", (event) => {
      $(`#${id}Value`).value = event.target.value;
      drawPhoto();
    });
  });
  $("#rotatePhoto").addEventListener("click", () => { photoRotation = (photoRotation + 90) % 360; drawPhoto(); });
  $("#monoPhoto").addEventListener("click", () => { photoMono = !photoMono; $("#monoPhoto").classList.toggle("active", photoMono); drawPhoto(); });
  $("#resetPhoto").addEventListener("click", () => { photoRotation = 0; photoMono = false; resetPhotoControls(); drawPhoto(); });
  $("#downloadPhoto").addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `nova-photo-${Date.now()}.png`;
    link.href = $("#photoCanvas").toDataURL("image/png");
    link.click();
    showToast("Photo downloaded");
  });
  $("#replacePhoto").addEventListener("click", showPhotoPicker);

  handleDropZone($("#videoDrop"), $("#videoInput"), loadVideo);
  $("#videoSpeed").addEventListener("change", (event) => { $("#videoPreview").playbackRate = Number(event.target.value); });
  $("#videoMute").addEventListener("change", (event) => { $("#videoPreview").muted = event.target.checked; });
  $("#previewTrim").addEventListener("click", previewTrim);
  $("#exportVideo").addEventListener("click", exportVideo);
  $("#replaceVideo").addEventListener("click", showVideoPicker);

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    $("#installButton").classList.remove("hidden");
  });
  $("#installButton").addEventListener("click", async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    $("#installButton").classList.add("hidden");
  });
  window.addEventListener("appinstalled", () => showToast("Nova AI installed"));

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  renderIcons();
});
