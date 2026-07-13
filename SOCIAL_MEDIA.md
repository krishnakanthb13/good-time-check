# AuraTime Social Media Announcements 📢

## [v1.0.2] - LinkedIn

✦ AuraTime v1.0.2 is live! ✦

Vedic time tracking meets modern accessibility and stability updates. In this release, I focused on visual refactoring, routing robustification, and CI modernization.

Here's what’s new in v1.0.2:
- 🎨 CLI Contrast Boost: Upgraded Yamagandam yellow status banners to high-contrast black text, ensuring perfect legibility on all terminals.
- ⚙️ PWA Routing Repairs: Resolved static host relative path failures with a custom trailing-slash redirect mechanism for /pwa, guaranteeing assets load cleanly on every server.
- 📱 Simplified UX: Polished keyboard controls on the Web app to avoid typing conflicts, preserving the standard Escape shortcut for modal closing.
- 🏗️ Modernized CI pipeline: Excluded Node 18 EOL environments from GitHub workflows, targeting active LTS releases (Node 20 & 22) for seamless Vitest 3 compatibility.

AuraTime remains 100% offline-first, private, and zero-dependency.

Check out the update on GitHub: https://github.com/krishnakanthb13/good-time-check

#OpenSource #VedicAstrology #Accessibility #WebDev #Productivity #GitHub #PWA #CLI

---

## [v1.0.2] - Reddit (r/webdev, r/javascript, r/opensource)

Title: AuraTime v1.0.2 Released - Improving PWA Routing Robustness, CLI Accessibility, and Upgrading CI Environments

Hey everyone! I just released v1.0.2 of AuraTime, my zero-dependency open-source Vedic time tracker (Rahu/Yama/Gulika Kalam checker).

Here is a quick look at the technical challenges resolved in this update:
- Trailing Slash Routing: PWA static assets sometimes failed to resolve due to missing trailing slashes on subfolder roots (e.g. `/pwa` instead of `/pwa/`). I resolved this by adding an immediate JS redirect in the head of index.html to guarantee correct parent-relative path resolution (`../core/` assets).
- Terminal Contrast: Fixed a visibility issue where yellow status banners utilized white text, rendering them unreadable. The CLI now dynamically swaps background and foreground combinations for optimal readability.
- CI Workflow Modernization: Upgraded testing matrix to target Node 20 and Node 22, solving compatibility constraints with Vitest 3 on deprecated Node 18 environments.

Check out the repository and codebase here: https://github.com/krishnakanthb13/good-time-check

Feedback on these routing and CLI accessibility fixes is highly appreciated!

---

## [v1.0.2] - X (Twitter)

AuraTime v1.0.2 is out! 🚀

Enjoy a cleaner, more accessible CLI dashboard and robust PWA launching:
🎨 Contrast refresh for yellow terminal banners
⚙️ Trailing-slash redirection fixes for PWA static hosts
🏗️ CI modernized for Node 20 & 22

GitHub: https://github.com/krishnakanthb13/good-time-check

#OpenSource #PWA #CLI ✦

---

## [v1.0.0] - LinkedIn

**✦ Announcing AuraTime: Vedic Astrology meets Modern Minimalism ✦**

I’m excited to share AuraTime, an open-source tool designed to simplify how we track auspicious and inauspicious time periods. ⏱️✨

Most tools for checking Rahu Kalam, Yamagandam, and Gulika Kalam are cluttered and slow. AuraTime fixes this with a "two-second rule": results should be instant and beautiful.

🚀 **Key Highlights:**
- 🖥️ **Terminal CLI**: Interactive, color-coded, and keyboard-driven for power users.
- 📱 **PWA**: A premium, glassmorphic web app that installs on your phone and works offline.
- ⚙️ **Shared Engine**: Consistent logic across all interfaces.
- 🔒 **Privacy-First**: Zero dependencies, zero trackers, 100% offline.

Whether you're a developer checking your terminal or a practitioner on the go, AuraTime provides the clarity you need.

Check it out on GitHub: https://github.com/krishnakanthb13/good-time-check

#OpenSource #VedicAstrology #Productivity #Minimalism #WebDev #CLI #PWA

---

## [v1.0.0] - Reddit (r/programming, r/webdev, r/astrology)

**Title: [Showoff Saturday] AuraTime - A zero-dependency, open-source Vedic time checker with CLI and PWA interfaces**

Hey everyone! I just released AuraTime, a tool I built to solve a personal frustration with cluttered astrology apps.

AuraTime tracks the "Big Three" inauspicious Vedic periods (Rahu Kalam, Yamagandam, and Gulika Kalam). The goal was absolute simplicity and speed.

**Technical Stack:**
- **Vanilla Everything**: No React, no Tailwind, no external runtime libs.
- **Shared Core**: The calculation logic is isolated in a `core/` module used by both the Node.js CLI and the Browser-based PWA.
- **Glassmorphism**: Leveraged advanced CSS filters and gradients for a premium UI feel in the PWA.
- **ANSI Power**: Used high-intensity ANSI sequences for a customized terminal dashboard experience.

**Why GPL v3?** I believe tools like this should remain free and community-driven forever.

**GitHub**: https://github.com/krishnakanthb13/good-time-check

I'd love to hear your thoughts on the "Shared Logic" approach or the UI design!

---

## [v1.0.0] - X (Twitter)

✦ Announcing AuraTime v1.0.0! 🚀

Vedic astrology time tracking, reimagined for minimalists.

✅ Sleek Terminal CLI
✅ 📱 Premium PWA (Offline-first!)
✅ ⚡ Zero dependencies
✅ 🔒 100% Private

Check your Rahu Kalam in < 2 seconds.

GitHub: https://github.com/krishnakanthb13/good-time-check

#OpenSource #Vedic #PWA ✦
