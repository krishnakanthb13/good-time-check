/**
 * AuraTime — PWA Application Logic
 * Renders status, schedule, and explanation cards using the shared core engine.
 */

// ─── Core Guard ────────────────────────────────────────────────
if (typeof getTimeStatus !== "function" || typeof TIME_TABLES === "undefined") {
  document.body.innerHTML = "<h2 style='text-align:center;padding:40px;color:#ef4444'>Failed to load AuraTime core.</h2>";
  throw new Error("AuraTime core modules not loaded");
}

// ─── DOM References ──────────────────────────────────────────────
const clockEl = document.getElementById("clock");
const dayEl = document.getElementById("day");
const statusCard = document.getElementById("statusCard");
const statusIcon = document.getElementById("statusIcon");
const statusLabel = document.getElementById("statusLabel");
const statusDetail = document.getElementById("statusDetail");
const scheduleCards = document.getElementById("scheduleCards");

// Theme & Modal Elements
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const modal = document.getElementById("explanationModal");
const modalClose = document.getElementById("modalClose");
const modalBody = document.getElementById("modalBody");

// ─── Color Map ───────────────────────────────────────────────────
const CSS_CLASS_MAP = {
  rahuKalam: "rahu",
  yamagandam: "yama",
  gulikaKalam: "gulika",
};

const DOT_CLASS_MAP = {
  rahuKalam: "dot-rahu",
  yamagandam: "dot-yama",
  gulikaKalam: "dot-gulika",
};

const STATUS_ICONS = {
  safe: "✓",
  rahuKalam: "⚠",
  yamagandam: "⚠",
  gulikaKalam: "⚠",
};

// ─── Safe localStorage Helpers ──────────────────────────────────
function safeGetItem(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}

function safeSetItem(key, value) {
  try { localStorage.setItem(key, value); } catch { /* storage full or blocked */ }
}

// ─── Render Functions ────────────────────────────────────────────
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  clockEl.textContent = `${h}:${m}:${s}`;
}

function renderStatus(status) {
  dayEl.textContent = status.dayName;

  // Remove previous state classes
  statusCard.classList.remove("safe", "rahu", "yama", "gulika");

  if (status.isSafe) {
    statusCard.classList.add("safe");
    statusIcon.textContent = "✓";
    statusLabel.textContent = "Safe Time";
    statusDetail.textContent =
      "No inauspicious periods are active. This is a favorable time for new beginnings.";
  } else {
    const p = status.activePeriods[0];
    const cssClass = CSS_CLASS_MAP[p.key] || "rahu";
    statusCard.classList.add(cssClass);
    statusIcon.textContent = "⚠";
    statusLabel.textContent = p.name;
    statusDetail.innerHTML = `<strong>${p.start} – ${p.end}</strong><br/>${p.description}<br/><em>${p.warning}</em>`;
  }
}

function renderSchedule(status) {
  scheduleCards.innerHTML = "";
  for (const s of status.todaySchedule) {
    const cssClass = CSS_CLASS_MAP[s.key];
    const dotClass = DOT_CLASS_MAP[s.key];

    const item = document.createElement("div");
    item.className = `schedule-item${s.isActive ? ` active is-${cssClass}` : ""}${s.isPast ? " past" : ""}`;
    item.id = `schedule-${s.key}`;

    item.innerHTML = `
      <span class="schedule-dot ${dotClass}"></span>
      <span class="schedule-name">${s.name}</span>
      <span class="schedule-time">${s.start} – ${s.end}</span>
      ${s.isActive ? '<span class="schedule-badge">NOW</span>' : ""}
    `;

    // Open modal on click
    item.addEventListener("click", () => {
      openModal(s.key);
    });

    scheduleCards.appendChild(item);
  }
}

// ─── Theme Logic ─────────────────────────────────────────────────
function setTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    updateThemeIcon("light");
  } else {
    document.documentElement.removeAttribute("data-theme");
    updateThemeIcon("dark");
  }
  safeSetItem("theme", theme);
}

function updateThemeIcon(theme) {
  if (theme === "light") {
    // Moon icon for switching back to dark
    themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  } else {
    // Sun icon for switching to light
    themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
  }
}

const savedTheme = safeGetItem("theme");
if (savedTheme === "light") {
  setTheme("light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setTheme(currentTheme === "light" ? "dark" : "light");
  });
}

// ─── Modal Logic ─────────────────────────────────────────────────
let lastFocusedElement = null;
const appRoot = document.getElementById("app");

function openModal(key) {
  const period = TIME_TABLES[key];
  if (!period) return;
  const dotClass = DOT_CLASS_MAP[key];
  const cssClass = CSS_CLASS_MAP[key] || "rahu";

  lastFocusedElement = document.activeElement;

  modalBody.innerHTML = `
    <div class="modal-title" id="modalTitle">
      <span class="modal-dot ${dotClass}"></span>
      <span style="color: var(--${cssClass})">${period.name}</span>
    </div>
    <p class="modal-desc">${period.description}</p>
    <p class="modal-warn">${period.warning}</p>
  `;
  modal?.classList.add("show");

  // Mark background as inert to prevent interaction behind dialog
  if (appRoot) appRoot.inert = true;

  // Focus the close button (first focusable element)
  const focusTarget = modal?.querySelector("#modalClose") || modal;
  focusTarget?.focus();
}

function closeModal() {
  modal?.classList.remove("show");
  // Remove inert from background
  if (appRoot) appRoot.inert = false;
  // Restore focus to the element that opened the modal
  if (lastFocusedElement && lastFocusedElement.isConnected) {
    lastFocusedElement.focus();
  }
  lastFocusedElement = null;
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Focus trap: keep Tab cycling within the modal
  modal.addEventListener("keydown", (e) => {
    if (e.key !== "Tab" || !modal.classList.contains("show")) return;
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

// ─── Main Update Loop (drift-corrected) ─────────────────────────
let timerId = null;

function update() {
  updateClock();
  const status = getTimeStatus();
  renderStatus(status);
  renderSchedule(status);
}

function tick() {
  update();
  const delay = 1000 - (Date.now() % 1000);
  timerId = setTimeout(tick, delay);
}

// ─── Visibility Optimization ────────────────────────────────────
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearTimeout(timerId);
    timerId = null;
  } else if (!timerId) {
    tick();
  }
});

// ─── Keyboard Navigation ─────────────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "escape") {
    closeModal();
  }
});

// ─── Error Boundary ─────────────────────────────────────────────
function showErrorFallback() {
  document.getElementById("app").innerHTML = `
    <div style="text-align:center;padding:60px 20px;color:var(--text-primary)">
      <h2 style="margin-bottom:12px">Something went wrong</h2>
      <p style="color:var(--text-muted)">Please refresh the page or try again later.</p>
    </div>
  `;
}
window.addEventListener("error", showErrorFallback);
window.addEventListener("unhandledrejection", showErrorFallback);

// ─── Init ─────────────────────────────────────────────────────────
tick();

// ─── Service Worker Registration ──────────────────────────────────
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swPath = window.location.pathname.includes("/pwa/")
      ? "service-worker.js"
      : "/pwa/service-worker.js";
    navigator.serviceWorker
      .register(swPath)
      .then(() => console.log("AuraTime SW registered"))
      .catch((err) => console.log("SW registration failed:", err));
  });
}
