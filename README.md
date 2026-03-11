# ✦ AuraTime

**Good Time / Bad Time Checker**

A lightweight, cross-platform utility that instantly tells you whether the current time falls within traditionally inauspicious Vedic time periods — **Rahu Kalam**, **Yamagandam**, or **Gulika Kalam**.

Works as both a **Terminal CLI** and a **Progressive Web App (PWA)**.

---

## Features

- ⚡ **Instant results** — Know within 2 seconds of launching
- 🎨 **Color-coded status** — Green (Safe), Red (Rahu), Yellow (Yama), Purple (Gulika)
- ⌨️ **Keyboard navigation** — Press R, Y, G for explanations, arrow keys to browse
- 📱 **PWA with offline support** — Install on your phone, works without internet
- 🖥️ **Cross-platform** — Windows (.bat), Linux (.sh), macOS (.sh)
- 🕐 **24-hour time format** — Clean, unambiguous display
- 📖 **Educational** — Two-line explanations for each time period

---

## Quick Start

### CLI (Terminal)

**Windows:**
```
auratime.bat
```

**Linux / macOS:**
```bash
chmod +x auratime.sh
./auratime.sh
```

**Via npm:**
```bash
npm start          # Interactive mode
npm run check      # One-shot mode (print & exit)
```

### PWA (Browser)

**Windows:**
```
auratime_web.bat
```

**Linux / macOS:**
```bash
chmod +x auratime_web.sh
./auratime_web.sh
```

**Via npm manually:**
```bash
npm run serve
```
Then manually open [http://localhost:3000/pwa](http://localhost:3000/pwa) in your browser.

---

## CLI Controls

| Key | Action |
|-----|--------|
| `R` | View Rahu Kalam explanation |
| `Y` | View Yamagandam explanation |
| `G` | View Gulika Kalam explanation |
| `S` | Return to main schedule view |
| `↑↓` | Navigate between explanations |
| `Q` | Quit |

---

## Time Periods

| Period | Meaning |
|--------|---------|
| **Rahu Kalam** | Ruled by shadow planet Rahu. Avoid starting new ventures. |
| **Yamagandam** | Governed by Yama (deity of death/justice). Avoid auspicious activities. |
| **Gulika Kalam** | Linked to Saturn's sub-planet Gulika. Tasks may face obstacles. |

> **Note:** Timings are based on a standard 06:00 sunrise / 18:00 sunset assumption. For precise calculations based on your location's actual sunrise, consult a local Panchang.

---

## Project Structure

```
good-time-check/
├── core/
│   ├── time_tables.js      # Time period data for all 7 days
│   └── time_calculator.js   # Shared calculation engine
├── cli/
│   └── interface.js          # Terminal interface with ANSI colors
├── pwa/
│   ├── index.html            # PWA shell
│   ├── style.css             # Dark-mode glassmorphism design
│   ├── app.js                # PWA application logic
│   ├── service-worker.js     # Offline caching
│   └── manifest.json         # PWA manifest
├── auratime.bat              # Windows launcher
├── auratime.sh               # Linux/macOS launcher
├── package.json
└── README.md
```

---

## Requirements

- **Node.js** (v14 or later) — for the CLI
- A modern browser — for the PWA
- No other dependencies required

---

## License

MIT
