const root = document.documentElement;
const body = document.body;
const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("siteNav");
const themeToggle = document.getElementById("themeToggle");
const themeToggleLabel = themeToggle.querySelector(".theme-toggle-label");
const scrollProgress = document.getElementById("scrollProgress");
const copyEmailButton = document.getElementById("copyEmail");
const downloadToast = document.getElementById("downloadToast");
const showcaseTabs = document.getElementById("showcaseTabs");
const showcaseGrid = document.getElementById("showcaseGrid");
const showcaseCount = document.getElementById("showcaseCount");
const showcaseDialog = document.getElementById("showcaseDialog");
const showcaseDialogClose = document.getElementById("showcaseDialogClose");
const showcaseDialogPrev = document.getElementById("showcaseDialogPrev");
const showcaseDialogNext = document.getElementById("showcaseDialogNext");
const showcaseDialogImage = document.getElementById("showcaseDialogImage");
const showcaseDialogTitle = document.getElementById("showcaseDialogTitle");
const showcaseDialogCategory = document.getElementById("showcaseDialogCategory");
const email = "thazinmgmghtwe142@gmail.com";
let downloadToastTimer;
let showcaseItems = [];
let visibleShowcaseItems = [];
let activeShowcaseFilter = "all";
let activeShowcaseIndex = 0;

function setMenu(open) {
  body.classList.toggle("nav-open", open);
  header.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
}

menuToggle.addEventListener("click", () => setMenu(!body.classList.contains("nav-open")));

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

function updateScrollState() {
  header.classList.toggle("scrolled", window.scrollY > 24);
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0;
  scrollProgress.style.transform = `scaleX(${progress})`;
}

window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

function setTheme(theme) {
  root.dataset.theme = theme;
  themeToggleLabel.textContent = theme === "dark" ? "Dark" : "Light";
  themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
  localStorage.setItem("thazin-theme", theme);
}

const savedTheme = localStorage.getItem("thazin-theme");
if (savedTheme === "light" || savedTheme === "dark") {
  setTheme(savedTheme);
} else {
  setTheme("dark");
}

themeToggle.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".site-nav a[href^='#']").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55%", threshold: 0 }
);

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

function renderShowcaseTabs(categories) {
  const allCount = showcaseItems.length;
  const tabs = [{ id: "all", label: "All Work", count: allCount }, ...categories];
  const buttons = tabs.map((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "showcase-tab";
    button.dataset.filter = category.id;
    button.setAttribute("aria-pressed", String(category.id === activeShowcaseFilter));
    button.innerHTML = `<span></span><strong></strong>`;
    button.querySelector("span").textContent = category.label;
    button.querySelector("strong").textContent = String(category.count);
    button.addEventListener("click", () => {
      activeShowcaseFilter = category.id;
      renderShowcase();
    });
    return button;
  });
  showcaseTabs.replaceChildren(...buttons);
}

function createShowcaseCard(item, index) {
  const card = document.createElement("button");
  const image = document.createElement("img");
  const meta = document.createElement("span");
  const title = document.createElement("strong");

  card.type = "button";
  card.className = `showcase-card reveal ${item.orientation}`;
  card.setAttribute("aria-label", `${item.title}, ${item.categoryLabel}`);
  card.addEventListener("click", () => openShowcaseDialog(index));

  image.src = item.thumb;
  image.alt = item.title;
  image.loading = "lazy";
  image.width = item.width;
  image.height = item.height;

  meta.textContent = item.categoryLabel;
  title.textContent = item.title;
  card.append(image, meta, title);
  revealObserver.observe(card);
  return card;
}

function renderShowcase() {
  if (!showcaseGrid || !showcaseTabs) return;

  visibleShowcaseItems = activeShowcaseFilter === "all"
    ? showcaseItems
    : showcaseItems.filter((item) => item.category === activeShowcaseFilter);

  showcaseTabs.querySelectorAll(".showcase-tab").forEach((button) => {
    const active = button.dataset.filter === activeShowcaseFilter;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  const cards = visibleShowcaseItems.map((item, index) => createShowcaseCard(item, index));
  showcaseGrid.replaceChildren(...cards);
  showcaseCount.textContent = `${visibleShowcaseItems.length} showcase item${visibleShowcaseItems.length === 1 ? "" : "s"}`;
}

function renderShowcaseDialog(index) {
  const lastIndex = visibleShowcaseItems.length - 1;
  activeShowcaseIndex = Math.max(0, Math.min(index, lastIndex));
  const item = visibleShowcaseItems[activeShowcaseIndex];
  if (!item) return;

  showcaseDialogImage.src = item.full;
  showcaseDialogImage.alt = item.title;
  showcaseDialogTitle.textContent = item.title;
  showcaseDialogCategory.textContent = item.categoryLabel;
  showcaseDialogPrev.disabled = activeShowcaseIndex === 0;
  showcaseDialogNext.disabled = activeShowcaseIndex === lastIndex;
}

function openShowcaseDialog(index) {
  renderShowcaseDialog(index);
  showcaseDialog.showModal();
  body.style.overflow = "hidden";
}

function closeShowcaseDialog() {
  showcaseDialog.close();
  body.style.overflow = "";
  showcaseDialogImage.removeAttribute("src");
}

function initializeShowcase(data) {
  showcaseItems = data.items || [];
  renderShowcaseTabs(data.categories || []);
  renderShowcase();
  if (window.location.hash === "#showcase") {
    window.requestAnimationFrame(() => {
      document.getElementById("showcase")?.scrollIntoView();
    });
  }
}

if (showcaseGrid && showcaseTabs) {
  if (window.designShowcaseData) {
    initializeShowcase(window.designShowcaseData);
  } else {
    fetch("assets/design-showcase/showcase.json")
      .then((response) => {
        if (!response.ok) throw new Error("Showcase manifest unavailable");
        return response.json();
      })
      .then(initializeShowcase)
      .catch(() => {
        showcaseCount.textContent = "Showcase unavailable";
        const message = document.createElement("p");
        message.className = "showcase-empty";
        message.textContent = "Design showcase assets could not be loaded.";
        showcaseGrid.replaceChildren(message);
      });
  }

  showcaseDialogClose.addEventListener("click", closeShowcaseDialog);
  showcaseDialogPrev.addEventListener("click", () => renderShowcaseDialog(activeShowcaseIndex - 1));
  showcaseDialogNext.addEventListener("click", () => renderShowcaseDialog(activeShowcaseIndex + 1));
  showcaseDialog.addEventListener("click", (event) => {
    if (event.target === showcaseDialog) closeShowcaseDialog();
  });
  showcaseDialog.addEventListener("cancel", () => {
    body.style.overflow = "";
    showcaseDialogImage.removeAttribute("src");
  });
  showcaseDialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      renderShowcaseDialog(activeShowcaseIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      renderShowcaseDialog(activeShowcaseIndex + 1);
    }
  });
}

copyEmailButton.addEventListener("click", async () => {
  const status = copyEmailButton.querySelector("strong");
  try {
    await navigator.clipboard.writeText(email);
    status.textContent = "Copied";
  } catch {
    window.location.href = `mailto:${email}`;
  }

  window.setTimeout(() => {
    status.textContent = "Ready";
  }, 1800);
});

document.querySelectorAll("[data-cv-download]").forEach((link) => {
  link.addEventListener("click", () => {
    window.clearTimeout(downloadToastTimer);
    downloadToast.classList.add("visible");
    downloadToastTimer = window.setTimeout(() => {
      downloadToast.classList.remove("visible");
    }, 3200);
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

if ("serviceWorker" in navigator && window.location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}
