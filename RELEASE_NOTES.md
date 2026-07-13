# AuraTime Release Notes 🚀

## [v1.0.2] - 2026-07-13

### 🐛 Bug Fixes
- **CLI Contrast Refresh**: Resolved visibility issues by switching text to black on yellow status banners (`C.bgYellow`) for Yamagandam.
- **PWA Asset Loading**: Corrected relative script paths for core tables and calculator (`../core/` instead of `./core/`), resolving PWA load failures.
- **PWA Path Resolution**: Added automatic trailing-slash redirection from `/pwa` to `/pwa/` in browser client to guarantee assets resolve correctly.
- **Launcher Launch Paths**: Corrected launcher scripts (`auratime_web.bat` and `auratime_web.sh`) to open the web client with a trailing slash.

### ⚡ Improvements
- **PWA Shortcuts Cleaned**: Removed single-key keyboard shortcuts (`R`, `Y`, `G`) from the web PWA to prevent browser typing conflicts, keeping only `Escape` to close active modal dialogs.

### 📚 Documentation
- **Sync Status**: Updated `README.md`, `CODE_DOCUMENTATION.md`, and `DESIGN_PHILOSOPHY.md` to accurately document the new PWA redirection logic, simplified keyboard shortcut model, and updated Node compatibility.

### 🏗️ Infrastructure & Maintenance
- **CI Matrix Modernization**: Excluded deprecated Node 18 from the automated testing matrix in `.github/workflows/ci.yml` and targeted active LTS versions (Node 20 and Node 22) for Vitest 3 compatibility.

## [v1.0.1] - 2026-07-13

### 📚 Documentation
- **Design Philosophy Clarifications**: Added comprehensive details to `DESIGN_PHILOSOPHY.md` justifying the trade-offs of using a fixed 06:00 sunrise baseline (ensuring speed, privacy, offline reliability, and zero dependencies).

## [v1.0.0] - 2026-03-11

### 🚀 New Features
- **Shared Core Logic**: Unified Vedic time calculation engine used by both CLI and PWA.
- **Terminal CLI**: Fully interactive terminal interface with ANSI colors, keyboard navigation, and live minute-by-minute ticking.
- **Progressive Web App (PWA)**: Premium Glassmorphism UI with offline support, light/dark theme toggle, and mobile installation capabilities.
- **Automated Launchers**: Cross-platform `.bat` and `.sh` scripts for one-click startup for both Web and CLI modes.

### ⚡ Improvements
- **Zero Dependencies**: Built with vanilla JS, CSS, and HTML for maximum performance and zero security risks.
- **Premium Aesthetics**: High-end visual design with blurred background orbs and sleek typography.
- **Performance**: Instant load times and extremely low memory footprint.

### 🏗️ Infrastructure & Maintenance
- **Open Source Foundation**: Full suite of documentation including Design Philosophy, Code Documentation, and Contributor Guidelines.
- **GPL v3 Licensing**: Protected open-source status with clear copyright.
- **Cross-Platform Compatibility**: Tested and verified on Windows, Linux, and macOS.
