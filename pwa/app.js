/**
 * AuraTime — PWA Application Logic
 * Renders status, schedule, and explanation cards using the shared core engine.
 */

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
function updateThemeIcon(theme) {
  if (theme === "light") {
    // Moon icon for switching back to dark
    themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
  } else {
    // Sun icon for switching to light
    themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
  }
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.documentElement.setAttribute("data-theme", "light");
  updateThemeIcon("light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "light") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
      updateThemeIcon("dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      updateThemeIcon("light");
    }
  });
}

// ─── Modal Logic ─────────────────────────────────────────────────
function openModal(key) {
  const period = TIME_TABLES[key];
  if (!period) return;
  const dotClass = DOT_CLASS_MAP[key];
  const cssClass = CSS_CLASS_MAP[key] || "rahu";
  
  modalBody.innerHTML = `
    <div class="modal-title">
      <span class="modal-dot ${dotClass}"></span>
      <span style="color: var(--${cssClass})">${period.name}</span>
    </div>
    <p class="modal-desc">${period.description}</p>
    <p class="modal-warn">${period.warning}</p>
  `;
  modal.classList.add("show");
}

if (modalClose) {
  modalClose.addEventListener("click", () => modal.classList.remove("show"));
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("show");
  });
}

// ─── Main Update Loop ────────────────────────────────────────────
function update() {
  updateClock();
  const status = getTimeStatus();
  renderStatus(status);
  renderSchedule(status);
}

// ─── Keyboard Navigation ─────────────────────────────────────────
const CARD_KEYS = { r: "rahuKalam", y: "yamagandam", g: "gulikaKalam" };

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (CARD_KEYS[key]) {
    openModal(CARD_KEYS[key]);
  } else if (key === "escape") {
    modal.classList.remove("show");
  }
});

// ─── Init ─────────────────────────────────────────────────────────
update();
setInterval(update, 1000);

// ─── Service Worker Registration ──────────────────────────────────
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then(() => console.log("AuraTime SW registered"))
      .catch((err) => console.log("SW registration failed:", err));
  });
}
