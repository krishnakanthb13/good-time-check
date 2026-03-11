# AuraTime Design Philosophy

"Minimalism is the ultimate sophistication." — Leonardo da Vinci

AuraTime was built to solve a specific problem: finding "good" and "bad" times in Vedic astrology should be instant, beautiful, and distraction-free.

## 🎯 The Problem

Existing Vedic time tools are often:
1.  **Cluttered**: Overloaded with thousands of astrological data points that are overwhelming for daily use.
2.  **Slow**: Ad-supported mobile apps or heavy websites with long loading times.
3.  **Platform Locked**: Limited to either mobile or web, with inconsistent logic.

## 💡 The Solution

AuraTime focuses **exclusively** on the "Big Three" daily periods: **Rahu Kalam**, **Yamagandam**, and **Gulika Kalam**. By stripping away everything else, we provide a tool that takes 1 second to use.

## 🎨 Design Principles

### 1. Unified Logic (Universal Engine)
The same code that powers the command-line interface also powers the web app. This ensures that a user checking their terminal sees the exact same timing as a user checking their phone.

### 2. Premium Aesthetics
*   **CLI**: Uses high-intensity ANSI colors and Unicode symbols (✦, ⚠, ✓) to create a dashboard feel in the terminal.
*   **PWA**: Implements modern Glassmorphism, blurred background orbs, and vibrant gradients to make the experience feel high-end and calm.

### 3. Keyboard-First UX
Speed is a feature. In the CLI, single-key shortcuts (R, Y, G, S, Q) allow instant navigation. In the PWA, these same shortcuts provide accessibility and power-user efficiency.

### 4. Privacy & Offline-First
AuraTime requires no internet connection after the initial load. There are no trackers, no cookies, and no analytics. It is a pure utility.

## ⚖️ Trade-offs & Constraints

*   **Fixed Sunrise**: AuraTime currently uses the standard 06:00 AM sunrise baseline. While local sunrise varies slightly, the standard baseline is widely used for calculation in modern contexts and keeps the app zero-dependency.
*   **Zero Dependencies**: We deliberately avoided frameworks like React or Tailwind to ensure the app stays under 100KB and remains maintainable decades from now.

## 👤 Target Audience

*   **Developers & Power Users**: Who want to check status from their terminal while working.
*   **Vedic Practitioners**: Who need a simple, respectful, and aesthetically pleasing mobile app for daily planning.
*   **Minimalists**: Who appreciate software that does one thing perfectly.
