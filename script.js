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
    my: {
      title: "AI အကူအညီ",
      subtitle: "နေ့စဉ်စဉ်းစားဖော်",
      welcome: "ဘာလုပ်ကြမလဲ?",
      copy: "မေးခွန်းမေးပါ၊ အစီအစဉ်ဆွဲပါ၊ အကြံဉာဏ်တိုးတက်အောင်လုပ်ပါ။",
      placeholder: "ဘာမဆို မေးပါ...",
    },
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
    academic: true,
    my: {
      title: "နက်ရှိုင်းစွာ ရှာဖွေခြင်း",
      subtitle: "အခမဲ့ public sources များဖြင့် ရှာဖွေခြင်း",
      welcome: "ဘာအကြောင်း ရှာပေးရမလဲ?",
      copy: "အကြောင်းအရာတစ်ခုကို ရေးပါ။ Sources နဲ့ citation ပါတဲ့ အဖြေကို ဖန်တီးပေးမယ်။",
      placeholder: "အကြောင်းအရာ၊ ဈေးကွက်၊ ထုတ်ကုန် သို့မဟုတ် မေးခွန်းကို ရှာပါ...",
    },
  },
  writer: {
    title: "Smart Writer",
    subtitle: "From blank page to polished copy",
    icon: "pen-line",
    welcome: "What should we write?",
    copy: "Give me the topic, audience, tone, and format—or simply paste your rough notes.",
    placeholder: "Write a YouTube script about...",
    instruction: "You are an expert writer. Produce polished, audience-aware writing in the requested tone and format.",
    my: { title: "စာရေးအကူ", subtitle: "အကြမ်းမှ အချောထိ", welcome: "ဘာရေးပေးရမလဲ?", copy: "ခေါင်းစဉ်၊ ဖတ်မယ့်သူ၊ အသံနေအသံထားနဲ့ ပုံစံကို ပြောပါ။", placeholder: "ဒီအကြောင်း YouTube script ရေးပါ..." },
  },
  translate: {
    title: "Translator",
    subtitle: "Natural, context-aware translation",
    icon: "languages",
    welcome: "What should I translate?",
    copy: "Paste your text and name the target language. Tone and meaning will be preserved.",
    placeholder: "Translate this into Burmese...",
    instruction: "Translate accurately and naturally. Preserve meaning, tone, formatting, names, and cultural context.",
    my: { title: "ဘာသာပြန်", subtitle: "သဘာဝကျပြီး context သိတဲ့ ဘာသာပြန်", welcome: "ဘာသာပြန်ပေးရမလဲ?", copy: "စာသားနဲ့ ပြန်လိုတဲ့ဘာသာစကားကို ရေးပါ။", placeholder: "ဒီစာကို မြန်မာလို ပြန်ပေးပါ..." },
  },
  "image-prompt": {
    title: "Image Prompt Lab",
    subtitle: "Ideas into production-ready prompts",
    icon: "palette",
    welcome: "Describe the image in your head",
    copy: "I’ll expand it into a detailed prompt with composition, lighting, lens, palette, and style.",
    placeholder: "A futuristic Yangon at night...",
    instruction: "Turn the user's concept into an excellent image generation prompt. Include subject, composition, lighting, palette, camera, texture, mood, and negative constraints.",
    my: { title: "ပုံ Prompt စက်ရုံ", subtitle: "အတွေးမှ production prompt ထိ", welcome: "စိတ်ကူးထဲကပုံကို ဖော်ပြပါ", copy: "Composition, lighting, camera နဲ့ style ပါတဲ့ prompt ပြည့်စုံအောင်လုပ်ပေးမယ်။", placeholder: "ညအချိန် အနာဂတ်ရန်ကုန်မြို့..." },
  },
  transcribe: {
    title: "Transcript Helper",
    subtitle: "Clean, structure, and extract",
    icon: "mic-2",
    welcome: "Paste a raw transcript",
    copy: "I can clean filler words, add chapters, summarize, and extract highlights or action items.",
    placeholder: "Paste transcript text here...",
    instruction: "Clean and structure the transcript. Preserve meaning and flag unclear portions rather than inventing content.",
    my: { title: "Transcript အကူ", subtitle: "ရှင်းလင်း၊ စီစဉ်၊ အချက်ထုတ်", welcome: "Transcript ထည့်ပါ", copy: "စကားပိုတွေရှင်း၊ အခန်းခွဲ၊ အကျဉ်းချုပ်နဲ့ အရေးကြီးအချက်တွေ ထုတ်ပေးမယ်။", placeholder: "Transcript စာသားထည့်ပါ..." },
  },
  "voice-script": {
    title: "Voice Script",
    subtitle: "Natural words made to be spoken",
    icon: "radio",
    welcome: "What is the story?",
    copy: "Share a topic, duration, audience, and mood for a natural voiceover or podcast script.",
    placeholder: "Write a 60-second voiceover...",
    instruction: "Write natural spoken-language scripts with good rhythm, breath, emphasis, and timing.",
    my: { title: "အသံ Script", subtitle: "ပြောရလွယ်တဲ့ သဘာဝစာသား", welcome: "ဘယ်ဇာတ်လမ်းလဲ?", copy: "ခေါင်းစဉ်၊ ကြာချိန်၊ ပရိသတ်နဲ့ mood ကို ပြောပါ။", placeholder: "စက္ကန့် ၆၀ voiceover ရေးပါ..." },
  },
  code: {
    title: "Code Assistant",
    subtitle: "Build, explain, debug, improve",
    icon: "code-2",
    welcome: "What are you building?",
    copy: "Describe the feature or paste code and an error. Include the language or framework if relevant.",
    placeholder: "Debug this JavaScript...",
    instruction: "You are a senior software engineer. Give correct, secure, maintainable code and concise explanations.",
    my: { title: "Code အကူ", subtitle: "တည်ဆောက်၊ ရှင်းပြ၊ bug ပြင်", welcome: "ဘာတည်ဆောက်နေလဲ?", copy: "Feature ကိုရှင်းပြပါ သို့မဟုတ် code နဲ့ error ကို ထည့်ပါ။", placeholder: "ဒီ JavaScript bug ကိုပြင်ပါ..." },
  },
  summarize: {
    title: "Summarizer",
    subtitle: "Less reading, more understanding",
    icon: "scan-text",
    welcome: "Paste the content to summarize",
    copy: "Choose any long text. I’ll extract the main ideas, decisions, risks, and next actions.",
    placeholder: "Paste an article, report, or notes...",
    instruction: "Summarize the input faithfully. Extract key points, decisions, risks, facts, and action items without inventing details.",
    my: { title: "အကျဉ်းချုပ်", subtitle: "ဖတ်ချိန်နည်း၊ နားလည်မှုများ", welcome: "အကျဉ်းချုပ်မယ့်စာ ထည့်ပါ", copy: "အဓိကအချက်၊ ဆုံးဖြတ်ချက်၊ အန္တရာယ်နဲ့ လုပ်ဆောင်စရာတွေ ထုတ်ပေးမယ်။", placeholder: "ဆောင်းပါး၊ report သို့မဟုတ် note ထည့်ပါ..." },
  },
  ideas: {
    title: "Idea Generator",
    subtitle: "Creative directions with substance",
    icon: "lightbulb",
    welcome: "What needs fresh ideas?",
    copy: "Tell me your goal and constraints. I’ll generate distinct, useful directions—not generic filler.",
    placeholder: "Give me campaign ideas for...",
    instruction: "Generate original, diverse, practical ideas. Explain each idea's angle and a concrete first step.",
    my: { title: "အကြံဉာဏ်စက်", subtitle: "အသုံးဝင်တဲ့ ဖန်တီးမှုလမ်းကြောင်းများ", welcome: "ဘာအတွက် အကြံဉာဏ်လိုလဲ?", copy: "ရည်မှန်းချက်နဲ့ ကန့်သတ်ချက်တွေ ပြောပါ။ ကွဲပြားတဲ့ အကြံတွေ ထုတ်ပေးမယ်။", placeholder: "ဒီ campaign အတွက် အကြံပေးပါ..." },
  },
  world: {
    title: "World Knowledge",
    subtitle: "Multilingual facts with live public sources",
    icon: "globe-2",
    welcome: "What do you want to know?",
    copy: "Ask about people, places, science, history, culture, technology, or current public knowledge.",
    placeholder: "Ask a world knowledge question...",
    instruction: "Answer from the supplied public sources. Cite source numbers inline. If the evidence is incomplete or conflicting, say so clearly. Never invent facts.",
    research: true,
    knowledge: true,
    my: { title: "ကမ္ဘာ့ဗဟုသုတ", subtitle: "ဘာသာစုံ live sources များဖြင့် အချက်အလက်", welcome: "ဘာသိချင်လဲ?", copy: "လူ၊ နေရာ၊ သိပ္ပံ၊ သမိုင်း၊ ယဉ်ကျေးမှုနဲ့ နည်းပညာအကြောင်း မေးပါ။", placeholder: "ကမ္ဘာ့ဗဟုသုတ မေးခွန်းမေးပါ..." },
  },
  daily: {
    title: "Daily Assistant",
    subtitle: "Your practical everyday helper",
    icon: "calendar-check-2",
    welcome: "How can I make today easier?",
    copy: "Plan your day, compare choices, draft messages, organize tasks, and think through problems.",
    placeholder: "Help me plan, decide, write, or organize...",
    instruction: "Be a practical daily assistant. Give concise, realistic steps and clearly state assumptions.",
    my: { title: "နေ့စဉ်အကူ", subtitle: "လက်တွေ့ကျတဲ့ နေ့စဉ်အကူအညီ", welcome: "ဒီနေ့ ဘာကိုလွယ်ကူအောင်လုပ်ပေးရမလဲ?", copy: "နေ့စဉ်အစီအစဉ်၊ ရွေးချယ်မှု၊ message ရေးခြင်းနဲ့ အလုပ်စီစဉ်ခြင်းကို ကူညီပေးမယ်။", placeholder: "အစီအစဉ်ဆွဲ၊ ဆုံးဖြတ်၊ ရေးသား သို့မဟုတ် စီစဉ်ပေးပါ..." },
  },
  planner: {
    title: "Smart Planner",
    subtitle: "Goals into realistic steps",
    icon: "list-checks",
    welcome: "What do you want to achieve?",
    copy: "Share your goal, deadline, available time, and constraints.",
    placeholder: "Plan this goal step by step...",
    instruction: "Create a realistic plan with priorities, milestones, time estimates, risks, and the next three actions.",
    my: { title: "စမတ်အစီအစဉ်", subtitle: "ရည်မှန်းချက်မှ လက်တွေ့အဆင့်များ", welcome: "ဘာအောင်မြင်ချင်လဲ?", copy: "ရည်မှန်းချက်၊ deadline၊ အချိန်နဲ့ ကန့်သတ်ချက်တွေ ပြောပါ။", placeholder: "ဒီရည်မှန်းချက်ကို အဆင့်လိုက်စီစဉ်ပေးပါ..." },
  },
  study: {
    title: "Study Tutor",
    subtitle: "Learn clearly with examples and sources",
    icon: "graduation-cap",
    welcome: "What should we learn?",
    copy: "Choose a topic and your current level. I can teach, quiz, and explain mistakes.",
    placeholder: "Teach me this topic from the beginning...",
    instruction: "Teach step by step at the user's level. Use simple examples, check understanding, and rely on supplied sources for factual claims.",
    knowledge: true,
    academic: true,
    my: { title: "သင်ကြားရေးအကူ", subtitle: "ဥပမာနဲ့ sources များဖြင့် ရှင်းလင်းစွာသင်ယူ", welcome: "ဘာသင်ချင်လဲ?", copy: "အကြောင်းအရာနဲ့ လက်ရှိအဆင့်ကို ပြောပါ။ သင်၊ quiz မေး၊ အမှားရှင်းပေးမယ်။", placeholder: "ဒီအကြောင်းကို အခြေခံကနေ သင်ပေးပါ..." },
  },
  calculator: {
    title: "Quick Calculator",
    subtitle: "Instant arithmetic and clear steps",
    icon: "calculator",
    welcome: "What should I calculate?",
    copy: "Enter arithmetic such as (1250 × 3) + 480 or ask for an explanation.",
    placeholder: "Example: (1250 * 3) + 480",
    instruction: "Explain calculations clearly and check arithmetic carefully.",
    calculator: true,
    my: { title: "အမြန်တွက်စက်", subtitle: "ချက်ချင်းတွက်ပြီး အဆင့်ရှင်းပြ", welcome: "ဘာတွက်ပေးရမလဲ?", copy: "(1250 × 3) + 480 လိုတွက်ချက်မှု ထည့်ပါ။", placeholder: "ဥပမာ: (1250 * 3) + 480" },
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
const chatKeyPrefix = "nova-ai-chat";
const maxStoredMessages = 40;
const languageNames = {
  auto: "the user's language",
  my: "Myanmar (Burmese)",
  en: "English",
  th: "Thai",
  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
  hi: "Hindi",
  es: "Spanish",
  fr: "French",
  de: "German",
  ar: "Arabic",
  ru: "Russian",
};
const wikipediaLanguages = new Set(["my", "en", "th", "zh", "ja", "ko", "hi", "es", "fr", "de", "ar", "ru"]);
const uiCopy = {
  en: {
    heroKicker: "Your creative intelligence",
    heroTitle: "One workspace.<br><em>Every superpower.</em>",
    heroCopy: "Research, write, edit photos, cut videos, and turn rough ideas into finished work—without jumping between ten different apps.",
    startCreating: "Start creating",
    exploreTools: "Explore all tools",
    toolkit: "AI TOOLKIT",
    toolsHeading: "What will you create today?",
    toolsIntro: "Everything you need, gathered into one focused workspace.",
    answerLanguage: "Answer language",
    knowledgeMode: "World knowledge",
    memoryMode: "Chat memory",
    newChat: "New chat",
    searchPlaceholder: "Search AI tools...",
    newProject: "New project",
    navDiscover: "Discover",
    navChat: "AI Chat",
    navResearch: "Deep Research",
    navRecent: "Recent",
    navPhoto: "Photo Editor",
    navVideo: "Video Editor",
    navAudio: "Audio Tools",
    categories: ["All tools", "Daily use", "Creative", "Research", "Writing", "Audio", "Developer"],
    localAiTitle: "Free local AI",
    localAiCopy: "Runs privately on your device. No API key, subscription, or usage bill.",
  },
  my: {
    heroKicker: "သင့်ရဲ့ ဖန်တီးမှုဉာဏ်ရည်",
    heroTitle: "Workspace တစ်ခုတည်း။<br><em>အစွမ်းအားအားလုံး။</em>",
    heroCopy: "ရှာဖွေ၊ စာရေး၊ ဓာတ်ပုံပြင်၊ ဗီဒီယိုဖြတ်ပြီး အကြမ်းအတွေးကို ပြီးပြည့်စုံတဲ့အလုပ်အဖြစ် ပြောင်းပါ။",
    startCreating: "စတင်ဖန်တီးမယ်",
    exploreTools: "Tools အားလုံးကြည့်မယ်",
    toolkit: "AI ကိရိယာစုံ",
    toolsHeading: "ဒီနေ့ ဘာဖန်တီးမလဲ?",
    toolsIntro: "လိုအပ်တဲ့ကိရိယာအားလုံးကို workspace တစ်ခုထဲမှာ စုထားပါတယ်။",
    answerLanguage: "အဖြေဘာသာစကား",
    knowledgeMode: "ကမ္ဘာ့ဗဟုသုတ",
    memoryMode: "Chat memory",
    newChat: "Chat အသစ်",
    searchPlaceholder: "AI tools ရှာပါ...",
    newProject: "အသစ်စမယ်",
    navDiscover: "ရှာဖွေကြည့်ရန်",
    navChat: "AI စကားပြော",
    navResearch: "နက်ရှိုင်းစွာရှာ",
    navRecent: "မကြာသေးမီ",
    navPhoto: "ဓာတ်ပုံပြင်",
    navVideo: "ဗီဒီယိုပြင်",
    navAudio: "အသံကိရိယာ",
    categories: ["Tools အားလုံး", "နေ့စဉ်သုံး", "ဖန်တီးမှု", "ရှာဖွေမှု", "စာရေး", "အသံ", "Developer"],
    localAiTitle: "အခမဲ့ Local AI",
    localAiCopy: "သင့်စက်ထဲမှာသာ အလုပ်လုပ်ပါတယ်။ API key နဲ့ ငွေပေးချေမှု မလိုပါ။",
  },
};

function getUiLanguage() {
  return localStorage.getItem("nova-ui-language") || "en";
}

function getResponseLanguage() {
  return $("#responseLanguageSelect")?.value || localStorage.getItem("nova-response-language") || "my";
}

function localizedTool(config) {
  return getUiLanguage() === "my" && config.my ? { ...config, ...config.my } : config;
}

function applyUiLanguage(language) {
  const copy = uiCopy[language] || uiCopy.en;
  document.documentElement.lang = language;
  $("#heroKicker").textContent = copy.heroKicker;
  $("#heroTitle").innerHTML = copy.heroTitle;
  $("#heroCopy").textContent = copy.heroCopy;
  $("#startCreatingLabel").textContent = copy.startCreating;
  $("#exploreToolsLabel").textContent = copy.exploreTools;
  $("#toolkitEyebrow").textContent = copy.toolkit;
  $("#toolsHeading").textContent = copy.toolsHeading;
  $("#toolsIntro").textContent = copy.toolsIntro;
  $("#answerLanguageLabel").textContent = copy.answerLanguage;
  $("#knowledgeModeLabel").textContent = copy.knowledgeMode;
  $("#memoryModeLabel").textContent = copy.memoryMode;
  $("#newChatLabel").textContent = copy.newChat;
  $("#globalSearch").placeholder = copy.searchPlaceholder;
  $(".primary-small span").textContent = copy.newProject;
  $('[data-view="home"] span').textContent = copy.navDiscover;
  $('[data-open-tool="chat"] span').textContent = copy.navChat;
  $('[data-open-tool="research"] span').textContent = copy.navResearch;
  $('[data-view="recent"] span').textContent = copy.navRecent;
  $('[data-open-tool="photo"] span').textContent = copy.navPhoto;
  $('[data-open-tool="video"] span').textContent = copy.navVideo;
  $('[data-filter-category="audio"] span').textContent = copy.navAudio;
  $$("#categoryTabs button").forEach((button, index) => {
    if (copy.categories[index]) button.textContent = copy.categories[index];
  });
  $(".side-upgrade strong").textContent = copy.localAiTitle;
  $(".side-upgrade p").textContent = copy.localAiCopy;

  $$("[data-tool]").forEach((card) => {
    const config = localizedTool(toolConfig[card.dataset.tool] || {});
    const title = $("strong", card);
    const description = $("small", card);
    if (title && config.title) title.textContent = config.title;
    if (description && config.copy) description.textContent = config.copy;
  });

  if ($("#toolDrawer").classList.contains("open") && toolConfig[currentTool]) {
    refreshOpenToolLanguage();
  }
  renderIcons();
}

function refreshOpenToolLanguage() {
  const config = localizedTool(toolConfig[currentTool] || toolConfig.chat);
  $("#drawerTitle").textContent = config.title;
  $("#drawerSubtitle").textContent = config.subtitle;
  $("#aiPrompt").placeholder = config.placeholder || "";
  const welcomeTitle = $("#welcomeTitle");
  const welcomeCopy = $("#welcomeCopy");
  if (welcomeTitle) welcomeTitle.textContent = config.welcome || "";
  if (welcomeCopy) welcomeCopy.textContent = config.copy || "";
}

function isAppleMobile() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

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

function chatStorageKey(tool = currentTool) {
  return `${chatKeyPrefix}:${tool}`;
}

function getConversationMessages(tool = currentTool) {
  try {
    const value = JSON.parse(localStorage.getItem(chatStorageKey(tool)) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveConversationMessages(tool, messages) {
  localStorage.setItem(chatStorageKey(tool), JSON.stringify(messages.slice(-maxStoredMessages)));
}

function addConversationMessage(tool, message) {
  const messages = getConversationMessages(tool);
  messages.push({
    role: message.role,
    text: String(message.text || ""),
    sources: Array.isArray(message.sources) ? message.sources : [],
    date: message.date || new Date().toISOString(),
  });
  saveConversationMessages(tool, messages);
}

function clearCurrentConversation() {
  localStorage.removeItem(chatStorageKey(currentTool));
  const config = localizedTool(toolConfig[currentTool] || toolConfig.chat);
  renderConversation(config);
  showToast(getUiLanguage() === "my" ? "Chat အသစ် စတင်ပြီးပါပြီ" : "New chat started");
}

function getConversationContext() {
  if ($("#memoryModeSelect")?.value === "off") return "";
  const history = getConversationMessages(currentTool).slice(-10, -1);
  if (!history.length) return "";
  const lines = history.map((message) => {
    const role = message.role === "assistant" ? "Assistant" : "User";
    return `${role}: ${message.text.replace(/\s+/g, " ").trim()}`;
  });
  return `Previous conversation context, saved locally in this browser:
${lines.join("\n")}`.slice(0, 3600);
}

function linkifyEscapedText(value) {
  return value.replace(/(https?:\/\/[^\s<]+)/g, (url) => {
    const cleanUrl = url.replace(/[),.;]+$/g, "");
    const suffix = url.slice(cleanUrl.length);
    return `<a href="${cleanUrl}" target="_blank" rel="noopener noreferrer">${cleanUrl}</a>${suffix}`;
  });
}

function formatAssistantText(value) {
  const text = String(value || "");
  if (!text) return "";
  const pieces = text.split("```");
  return pieces.map((piece, index) => {
    if (index % 2 === 0) return linkifyEscapedText(escapeHtml(piece));
    const lines = piece.replace(/^\n/, "").split("\n");
    const firstLine = lines[0]?.trim() || "";
    const hasLanguageHint = /^[a-z0-9+#.-]{1,24}$/i.test(firstLine);
    const code = hasLanguageHint ? lines.slice(1).join("\n") : piece;
    return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
  }).join("");
}

function renderMessageContent(content, role, text) {
  if (role === "assistant") content.innerHTML = formatAssistantText(text);
  else content.textContent = text;
}

function createMessageElement(role, text, loading = false, sources = []) {
  const message = document.createElement("div");
  message.className = `message ${role}${loading ? " loading" : ""}`;
  message.dataset.rawText = text || "";
  if (role === "assistant") message.innerHTML = `<span><i data-lucide="sparkles"></i></span>`;
  const body = document.createElement("div");
  body.className = "message-body";
  const content = document.createElement("div");
  content.className = "message-content";
  renderMessageContent(content, role, text);
  body.appendChild(content);
  if (role === "assistant" && !loading) body.appendChild(createMessageActions());
  message.appendChild(body);
  appendSources(message, sources);
  return message;
}

function createMessageActions() {
  const actions = document.createElement("div");
  actions.className = "message-actions";
  const copyLabel = getUiLanguage() === "my" ? "Copy" : "Copy";
  const regenerateLabel = getUiLanguage() === "my" ? "ပြန်ဖြေ" : "Regenerate";
  actions.innerHTML = `
    <button type="button" data-message-action="copy"><i data-lucide="copy"></i>${copyLabel}</button>
    <button type="button" data-message-action="regenerate"><i data-lucide="refresh-cw"></i>${regenerateLabel}</button>
  `;
  return actions;
}

function renderConversation(config) {
  const stream = $("#chatStream");
  const messages = getConversationMessages(currentTool);
  stream.innerHTML = "";
  if (!messages.length) {
    stream.innerHTML = `<div class="welcome-message">
      <span><i data-lucide="${config.icon}"></i></span>
      <h3 id="welcomeTitle">${escapeHtml(config.welcome)}</h3>
      <p id="welcomeCopy">${escapeHtml(config.copy)}</p>
    </div>`;
  } else {
    messages.forEach((message) => stream.appendChild(createMessageElement(
      message.role,
      message.text,
      false,
      message.sources || [],
    )));
  }
  stream.scrollTop = stream.scrollHeight;
  renderIcons();
}

function exportCurrentChat() {
  const messages = getConversationMessages(currentTool);
  if (!messages.length) {
    showToast(getUiLanguage() === "my" ? "Export လုပ်ရန် chat မရှိသေးပါ" : "No chat to export", "triangle-alert");
    return;
  }
  const config = localizedTool(toolConfig[currentTool] || toolConfig.chat);
  const body = messages.map((message) => {
    const role = message.role === "assistant" ? "Nova AI" : "You";
    const sources = (message.sources || []).map((source, index) => `  [${index + 1}] ${source.title} — ${source.url}`).join("\n");
    return `${role} (${new Date(message.date).toLocaleString()}):\n${message.text}${sources ? `\nSources:\n${sources}` : ""}`;
  }).join("\n\n---\n\n");
  const blob = new Blob([`${config.title} chat export\n${new Date().toLocaleString()}\n\n${body}`], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `nova-ai-${currentTool}-chat-${Date.now()}.txt`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast(getUiLanguage() === "my" ? "Chat export လုပ်ပြီးပါပြီ" : "Chat exported");
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function regenerateLastResponse() {
  const messages = getConversationMessages(currentTool);
  const lastUserIndex = messages.map((message) => message.role).lastIndexOf("user");
  if (lastUserIndex === -1) {
    showToast(getUiLanguage() === "my" ? "ပြန်ဖြေရန် မေးခွန်းမရှိသေးပါ" : "No prompt to regenerate", "triangle-alert");
    return;
  }
  const prompt = messages[lastUserIndex].text;
  saveConversationMessages(currentTool, messages.slice(0, lastUserIndex));
  renderConversation(localizedTool(toolConfig[currentTool] || toolConfig.chat));
  $("#aiPrompt").value = prompt;
  $("#aiForm").requestSubmit();
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
  const baseConfig = toolConfig[tool] || toolConfig.chat;
  const config = localizedTool(baseConfig);
  currentTool = tool;
  $("#drawerTitle").textContent = config.title;
  $("#drawerSubtitle").textContent = config.subtitle;
  $("#drawerIcon").innerHTML = `<i data-lucide="${config.icon}"></i>`;
  $("#aiWorkspace").classList.toggle("hidden", Boolean(config.workspace));
  $("#photoWorkspace").classList.toggle("hidden", config.workspace !== "photo");
  $("#videoWorkspace").classList.toggle("hidden", config.workspace !== "video");
  $$(".chat-only-action").forEach((button) => button.classList.toggle("hidden", Boolean(config.workspace)));

  if (!config.workspace) {
    $("#aiPrompt").placeholder = config.placeholder;
    const knowledgeEnabled = baseConfig.research || baseConfig.knowledge;
    const modeText = getUiLanguage() === "my"
      ? (knowledgeEnabled ? "Sources ပါ AI" : "အခမဲ့ Local AI")
      : (knowledgeEnabled ? "Source-backed AI" : "Free local AI");
    $("#modeLabel").innerHTML = `<i data-lucide="${knowledgeEnabled ? "library-big" : "cpu"}"></i> ${modeText}`;
    renderConversation(config);
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
  $("#localModelDetail").textContent = isAppleMobile()
    ? "Lightweight iPhone-safe AI is running privately on this device."
    : "Runs privately on this device with no per-message fee.";
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
  $("#apiStatus").lastChild.textContent = isAppleMobile() ? " iPhone safe mode" : " Free local mode";
  if (isAppleMobile()) {
    $("#localModelStatus").textContent = "iPhone-safe AI ready to download";
    $("#localModelDetail").textContent = "Uses a smaller model to avoid Safari memory crashes (about 190 MB).";
    $("#loadModelButton").textContent = "Load Lite AI";
  }
}

function addMessage(role, text, loading = false, { persist = false, sources = [] } = {}) {
  $(".welcome-message", $("#chatStream"))?.remove();
  const message = createMessageElement(role, text, loading, sources);
  $("#chatStream").appendChild(message);
  $("#chatStream").scrollTop = $("#chatStream").scrollHeight;
  if (persist) addConversationMessage(currentTool, { role, text, sources });
  renderIcons();
  return message;
}

async function submitAi(event) {
  event.preventDefault();
  const input = $("#aiPrompt");
  const prompt = input.value.trim();
  if (!prompt) return;
  const config = toolConfig[currentTool] || toolConfig.chat;
  const responseLanguage = getResponseLanguage();
  addMessage("user", prompt, false, { persist: true });
  input.value = "";
  addActivity(currentTool, prompt);

  if (config.calculator) {
    const calculation = calculateExpression(prompt);
    if (calculation) {
      const label = responseLanguage === "my" ? "အဖြေ" : "Result";
      addMessage("assistant", `${label}: ${calculation.expression} = ${calculation.result}`, false, { persist: true });
      return;
    }
  }

  const instantReply = getInstantAssistantReply(prompt, config, responseLanguage);
  if (instantReply) {
    addMessage("assistant", instantReply, false, { persist: true });
    return;
  }

  const knowledgeMode = $("#knowledgeModeSelect").value;
  const shouldSearch = knowledgeMode !== "off"
    && (config.research || config.knowledge || knowledgeMode === "always" || looksLikeKnowledgeQuestion(prompt));
  const loadingText = shouldSearch
    ? (getUiLanguage() === "my" ? "ကမ္ဘာ့ဗဟုသုတ sources များ ရှာနေသည်" : "Searching world knowledge sources")
    : (getUiLanguage() === "my" ? "Local AI ပြင်ဆင်နေသည်" : "Preparing free local AI");
  const loading = addMessage("assistant", loadingText, true);

  try {
    const dateContext = new Intl.DateTimeFormat(responseLanguage === "my" ? "my-MM" : undefined, {
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date());
    const conversationContext = getConversationContext();
    let finalPrompt = `${conversationContext ? `${conversationContext}

` : ""}User's current message: ${prompt}

Current local date and time: ${dateContext}.`;
    let sources = [];
    if (shouldSearch) {
      sources = await collectKnowledgeSources(prompt, responseLanguage, config.academic);
      if (sources.length) {
        finalPrompt = `${finalPrompt}

Use these source excerpts:
${sources.map((source, index) => `[${index + 1}] ${source.title} (${source.provider})
URL: ${source.url}
Excerpt: ${source.excerpt}`).join("\n\n")}

Base factual claims on these excerpts and cite them inline as [1], [2], etc.
If the sources do not support an answer, say that you do not have enough reliable information.`;
      } else {
        finalPrompt = `${finalPrompt}

No public source excerpts were available. Clearly label uncertainty and do not invent facts.`;
      }
    }

    const localAi = await getLocalAiModule();
    const content = $(".message-content", loading);
    const languageInstruction = buildLanguageInstruction(responseLanguage, prompt);
    const text = await localAi.generateLocalText({
      prompt: finalPrompt,
      instruction: `${config.instruction}
${languageInstruction}
Never pretend to know something you cannot support. Correct the user's false premise politely when needed.`,
      temperature: shouldSearch ? 0.2 : 0.65,
      onProgress: (report) => {
        updateModelProgress(report);
        content.textContent = report.text || "Loading free local AI…";
      },
      onToken: (fullText) => {
        loading.classList.remove("loading");
        loading.dataset.rawText = fullText || "";
        renderMessageContent(content, "assistant", fullText || "Thinking privately…");
        $("#chatStream").scrollTop = $("#chatStream").scrollHeight;
      },
    });
    setModelReady();
    const fallbackText = text ? "" : await buildEmptyModelFallback({
      prompt,
      responseLanguage,
      shouldSearch,
      sources,
    });
    const finalAnswer = text || fallbackText;
    loading.dataset.rawText = finalAnswer;
    renderMessageContent(content, "assistant", finalAnswer);
    loading.classList.remove("loading");
    appendSources(loading, sources);
    if (!$(".message-actions", loading)) $(".message-body", loading).appendChild(createMessageActions());
    addConversationMessage(currentTool, { role: "assistant", text: finalAnswer, sources });
    renderIcons();
  } catch (error) {
    $(".message-content", loading).textContent =
      `Free local AI could not run: ${error.message}\n\nPhoto and video tools still work. On mobile, update the browser and make sure the device has enough free storage.`;
    loading.classList.remove("loading");
    setModelError(error.message || "The model could not run.");
  }
  $("#chatStream").scrollTop = $("#chatStream").scrollHeight;
}

function buildLanguageInstruction(language, prompt) {
  if (language === "auto") {
    return "Reply in the same language and writing system used by the user.";
  }
  if (language === "my") {
    return "Always answer in natural Myanmar (Burmese) Unicode. Use clear everyday Burmese, preserve necessary English technical terms in parentheses, and never use Zawgyi encoding.";
  }
  return `Always answer in ${languageNames[language] || "the selected language"}.`;
}

function resolveResponseLanguage(language, prompt) {
  if (language && language !== "auto") return language;
  return /[\u1000-\u109f]/.test(prompt) ? "my" : "en";
}

function isGreetingPrompt(prompt) {
  const text = prompt.trim().toLowerCase();
  return /^(hi|hello|hey|yo|မင်္ဂလာပါ|ဟယ်လို|ဟလို|နေကောင်းလား)[!။.\s]*$/i.test(text);
}

function needsUserTextPrompt(prompt) {
  const text = prompt.trim();
  const lower = text.toLowerCase();
  const asksForMissingText = /(rewrite|translate|summari[sz]e|paraphrase|ပြန်ရေး|ဘာသာပြန်|အကျဉ်းချုပ်|ရှင်းလင်း)/i.test(lower)
    || /(ပြန်ရေး|ဘာသာပြန်|အကျဉ်းချုပ်|ရှင်းလင်း)/.test(text);
  return asksForMissingText && /[:：]\s*$/.test(text);
}

function getInstantAssistantReply(prompt, config, responseLanguage) {
  if (config.research || config.knowledge) return "";
  const language = resolveResponseLanguage(responseLanguage, prompt);
  const isMyanmar = language === "my";
  if (isGreetingPrompt(prompt)) {
    return isMyanmar
      ? "မင်္ဂလာပါ 👋 Nova AI ပါ။ မေးခွန်းမေးချင်တာ၊ စာရေးချင်တာ၊ research လုပ်ချင်တာ၊ photo/video edit လုပ်ချင်တာ—ဘာကူညီပေးရမလဲ?"
      : "Hello 👋 I’m Nova AI. What would you like help with—writing, research, planning, coding, or creative work?";
  }
  if (needsUserTextPrompt(prompt)) {
    return isMyanmar
      ? "ရပါတယ်။ ပြန်ရေး/ဘာသာပြန်/ရှင်းလင်းပေးစေချင်တဲ့ စာသားကို အောက်မှာ paste လုပ်ပေးပါ။ စာသားရတာနဲ့ သဘာဝကျတဲ့ မြန်မာလို ပြန်လုပ်ပေးမယ်။"
      : "Sure — paste the text you want me to rewrite, translate, or summarize, and I’ll clean it up for you.";
  }
  return "";
}

async function buildEmptyModelFallback({ prompt, responseLanguage, shouldSearch, sources }) {
  if (sources.length) return buildSourceFallback(sources, responseLanguage, prompt);

  const language = resolveResponseLanguage(responseLanguage, prompt);
  const isMyanmar = language === "my";
  if (shouldSearch) {
    return isMyanmar
      ? "ဒီမေးခွန်းအတွက် ယုံကြည်စိတ်ချရတဲ့ public source မတွေ့သေးပါ။ မေးခွန်းကို နည်းနည်းပိုတိတိကျကျရေးပေးပါ၊ သို့မဟုတ် World knowledge ကို “Off” လုပ်ပြီး local AI answer အနေနဲ့ ပြန်စမ်းနိုင်ပါတယ်။"
      : "I couldn’t find enough reliable public sources for that. Try making the question more specific, or switch World knowledge to “Off” for a local AI answer.";
  }
  return isMyanmar
    ? "AI model က အဖြေကို အခုချက်ချင်း မထုတ်နိုင်သေးပါ။ ဒါပေမယ့် ကူညီနိုင်ပါတယ်—မေးခွန်းကို နည်းနည်းပိုရှင်းရေးပေးပါ၊ စာသားတစ်ခု paste လုပ်ပါ၊ ဒါမှမဟုတ် New chat နှိပ်ပြီး ပြန်စမ်းပါ။"
    : "The local AI did not produce a useful answer this time. Try rephrasing the question, paste the text you want help with, or start a new chat and try again.";
}

function looksLikeKnowledgeQuestion(prompt) {
  const text = prompt.trim().toLowerCase();
  return /^(who|what|when|where|why|how|which|tell me|explain|define|history|latest|today|news)\b/.test(text)
    || /(ဘယ်သူ|ဘာလဲ|ဘာကြောင့်|ဘယ်မှာ|ဘယ်တော့|ဘယ်လို|ရှင်းပြ|သမိုင်း|ယနေ့|နောက်ဆုံး|သတင်း)/.test(prompt)
    || text.endsWith("?")
    || prompt.endsWith("လဲ")
    || prompt.endsWith("လား");
}

function calculateExpression(input) {
  const myanmarDigits = "၀၁၂၃၄၅၆၇၈၉";
  let expression = input.replace(/[၀-၉]/g, (digit) => String(myanmarDigits.indexOf(digit)));
  expression = expression
    .replace(/[×xX]/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/,/g, "")
    .replace(/^(calculate|တွက်ပါ|တွက်ပေးပါ)\s*[:：]?/i, "")
    .trim();
  if (!expression || expression.length > 120 || !/^[\d\s+\-*/%().]+$/.test(expression)) return null;
  try {
    const result = Function(`"use strict"; return (${expression})`)();
    if (!Number.isFinite(result)) return null;
    return {
      expression,
      result: Number.isInteger(result) ? String(result) : String(Number(result.toFixed(10))),
    };
  } catch {
    return null;
  }
}

async function collectKnowledgeSources(query, responseLanguage = "en", includeAcademic = false) {
  const sources = [];
  const normalizedQuery = query
    .replace(/^(what|who|where|when|why|how|is|are|was|were|tell me about|research|explain)\s+/i, "")
    .replace(/^(ဘယ်သူ|ဘာလဲ|ဘာကြောင့်|ဘယ်မှာ|ဘယ်တော့|ဘယ်လို|ရှင်းပြပါ|ရှာပေးပါ)\s*/i, "")
    .replace(/[?!.,]+$/g, "")
    .trim() || query;

  const detectedLanguage = /[\u1000-\u109f]/.test(query) ? "my" : "en";
  const preferredLanguage = wikipediaLanguages.has(responseLanguage) && responseLanguage !== "auto"
    ? responseLanguage
    : detectedLanguage;
  let englishQuery = normalizedQuery;
  if (preferredLanguage !== "en" || /[^\u0000-\u024f]/.test(normalizedQuery)) {
    englishQuery = await translateKnowledgeQuery(normalizedQuery, preferredLanguage, "en");
  }
  const wikipediaTasks = [fetchWikipediaSources(normalizedQuery, preferredLanguage, 3)];
  if (preferredLanguage !== "en") wikipediaTasks.push(fetchWikipediaSources(englishQuery, "en", 3));
  const tasks = [
    ...wikipediaTasks,
    fetchWikidataSources(normalizedQuery, preferredLanguage),
  ];
  if (preferredLanguage !== "en") tasks.push(fetchWikidataSources(englishQuery, "en"));
  if (includeAcademic) tasks.push(fetchAcademicSources(englishQuery));
  if (/(latest|today|news|ယနေ့|နောက်ဆုံး|သတင်း)/i.test(query)) tasks.push(fetchWikinewsSources(englishQuery));

  const results = await Promise.allSettled(tasks);
  results.forEach((result) => {
    if (result.status === "fulfilled") sources.push(...result.value);
  });

  const seen = new Set();
  return sources.filter((source) => {
    const key = `${source.title}|${source.url}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return Boolean(source.excerpt);
  }).slice(0, 6);
}

async function translateKnowledgeQuery(query, sourceLanguage, targetLanguage) {
  try {
    const url = new URL("https://api.mymemory.translated.net/get");
    url.search = new URLSearchParams({
      q: query.slice(0, 450),
      langpair: `${sourceLanguage}|${targetLanguage}`,
    });
    const response = await fetch(url);
    if (!response.ok) return query;
    const data = await response.json();
    const translated = String(data.responseData?.translatedText || "").trim();
    return translated && !translated.includes("MYMEMORY WARNING") ? translated : query;
  } catch {
    return query;
  }
}

async function buildSourceFallback(sources, responseLanguage, originalPrompt) {
  const topSources = sources.slice(0, 2);
  let summary = topSources.map((source, index) =>
    `[${index + 1}] ${source.title}: ${source.excerpt}`
  ).join("\n\n").slice(0, 850);
  const targetLanguage = responseLanguage === "auto"
    ? (/[\u1000-\u109f]/.test(originalPrompt) ? "my" : "en")
    : responseLanguage;
  if (targetLanguage !== "en") {
    summary = await translateKnowledgeQuery(summary, "en", targetLanguage);
  }
  const prefix = targetLanguage === "my"
    ? "ရရှိထားတဲ့ ယုံကြည်စိတ်ချရသော sources များအရ—"
    : "Based on the reliable sources found—";
  return `${prefix}\n\n${summary}`;
}

async function fetchWikipediaSources(query, language, limit) {
  const base = `https://${language}.wikipedia.org/w/api.php`;
  const searchUrl = new URL(base);
  searchUrl.search = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: query,
    srlimit: String(limit),
    format: "json",
    origin: "*",
  });
  const searchResponse = await fetch(searchUrl);
  if (!searchResponse.ok) return [];
  const searchData = await searchResponse.json();
  const searchItems = searchData.query?.search || [];
  const pageIds = searchItems.map((item) => item.pageid).join("|");
  if (!pageIds) return [];

  const extractUrl = new URL(base);
  extractUrl.search = new URLSearchParams({
    action: "query",
    pageids: pageIds,
    prop: "extracts|info",
    exintro: "1",
    explaintext: "1",
    exsentences: "5",
    inprop: "url",
    format: "json",
    origin: "*",
  });
  const response = await fetch(extractUrl);
  if (!response.ok) return [];
  const data = await response.json();
  const pages = data.query?.pages || {};
  return searchItems.map((result) => pages[result.pageid]).filter((page) => page?.extract).map((page) => ({
    title: page.title,
    url: page.fullurl || `https://${language}.wikipedia.org/?curid=${page.pageid}`,
    excerpt: page.extract.slice(0, 650),
    provider: `${language.toUpperCase()} Wikipedia`,
  }));
}

async function fetchWikidataSources(query, language) {
  const url = new URL("https://www.wikidata.org/w/api.php");
  url.search = new URLSearchParams({
    action: "wbsearchentities",
    search: query,
    language,
    uselang: language,
    type: "item",
    limit: "4",
    format: "json",
    origin: "*",
  });
  const response = await fetch(url);
  if (!response.ok) return [];
  const data = await response.json();
  return (data.search || []).filter((item) => item.description).map((item) => ({
    title: item.label,
    url: item.concepturi || `https://www.wikidata.org/wiki/${item.id}`,
    excerpt: [item.description, ...(item.aliases || []).slice(0, 3)].join(" — ").slice(0, 500),
    provider: "Wikidata",
  }));
}

async function fetchAcademicSources(query) {
  const url = new URL("https://api.crossref.org/works");
  url.search = new URLSearchParams({
    query,
    rows: "3",
    select: "title,author,published,URL,abstract",
  });
  const response = await fetch(url);
  if (!response.ok) return [];
  const data = await response.json();
  return (data.message?.items || []).map((item) => {
      const title = item.title?.[0];
      if (!title || !item.URL) return null;
      const year = item.published?.["date-parts"]?.[0]?.[0];
      const author = item.author?.slice(0, 3).map((person) => [person.given, person.family].filter(Boolean).join(" ")).join(", ");
      const abstract = String(item.abstract || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      return {
        title,
        url: item.URL,
        excerpt: [author, year, abstract].filter(Boolean).join(" — ").slice(0, 600),
        provider: "Crossref",
      };
    }).filter(Boolean);
}

async function fetchWikinewsSources(query) {
  const sources = await fetchWikipediaLikeSources(query, "https://en.wikinews.org/w/api.php", 3);
  return sources.map((source) => ({ ...source, provider: "Wikinews" }));
}

async function fetchWikipediaLikeSources(query, base, limit) {
  const searchUrl = new URL(base);
  searchUrl.search = new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: query,
    srlimit: String(limit),
    format: "json",
    origin: "*",
  });
  const searchResponse = await fetch(searchUrl);
  if (!searchResponse.ok) return [];
  const searchData = await searchResponse.json();
  const items = searchData.query?.search || [];
  return items.map((item) => ({
    title: item.title,
    url: `https://en.wikinews.org/?curid=${item.pageid}`,
    excerpt: String(item.snippet || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 500),
    provider: "Wikinews",
  }));
}

function appendSources(message, sources) {
  if (!sources.length) return;
  const sourceBox = document.createElement("div");
  sourceBox.className = "message-sources";
  const label = document.createElement("strong");
  label.textContent = getUiLanguage() === "my" ? "အချက်အလက်ရင်းမြစ်များ" : "Sources";
  sourceBox.appendChild(label);
  sources.forEach((source, index) => {
    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = `[${index + 1}] ${source.title} — ${source.provider}`;
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
  const initialUiLanguage = getUiLanguage();
  $("#uiLanguageSelect").value = initialUiLanguage;
  $("#responseLanguageSelect").value = localStorage.getItem("nova-response-language") || "my";
  $("#knowledgeModeSelect").value = localStorage.getItem("nova-knowledge-mode") || "auto";
  $("#memoryModeSelect").value = localStorage.getItem("nova-memory-mode") || "on";
  applyUiLanguage(initialUiLanguage);

  $("#uiLanguageSelect").addEventListener("change", (event) => {
    localStorage.setItem("nova-ui-language", event.target.value);
    applyUiLanguage(event.target.value);
  });
  $("#responseLanguageSelect").addEventListener("change", (event) => {
    localStorage.setItem("nova-response-language", event.target.value);
  });
  $("#knowledgeModeSelect").addEventListener("change", (event) => {
    localStorage.setItem("nova-knowledge-mode", event.target.value);
  });
  $("#memoryModeSelect").addEventListener("change", (event) => {
    localStorage.setItem("nova-memory-mode", event.target.value);
  });
  $$("[data-quick-prompt]").forEach((button) => {
    button.addEventListener("click", () => {
      $("#aiPrompt").value = button.dataset.quickPrompt || "";
      $("#aiPrompt").focus();
    });
  });

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
  $("#newChatButton").addEventListener("click", clearCurrentConversation);
  $("#exportChatButton").addEventListener("click", exportCurrentChat);
  $("#chatStream").addEventListener("click", async (event) => {
    const actionButton = event.target.closest("[data-message-action]");
    if (!actionButton) return;
    const action = actionButton.dataset.messageAction;
    const message = actionButton.closest(".message");
    if (action === "copy") {
      try {
        await copyTextToClipboard(message?.dataset.rawText || "");
        showToast(getUiLanguage() === "my" ? "Copy လုပ်ပြီးပါပြီ" : "Copied");
      } catch {
        showToast(getUiLanguage() === "my" ? "Copy မအောင်မြင်ပါ" : "Could not copy", "triangle-alert");
      }
    }
    if (action === "regenerate") regenerateLastResponse();
  });
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

  if (!isAppleMobile() && "serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  renderIcons();
});
