# Contributing to AuraTime ✦

Thank you for your interest in helping improve AuraTime! This is an open-source project designed to be minimal, fast, and beautiful.

## 🐛 Bug Reports

If you find a calculation error or a UI glitch, please open an issue with:
1.  Your **Local Time** and **Day** when the issue occurred.
2.  The **Platform** (CLI or PWA).
3.  A screenshot or terminal log.

## ✨ Feature Suggestions

We value minimalism. Before suggesting a feature, ask yourself: *"Does this help someone check a good/bad time in under 2 seconds?"*
*   **Yes**: Open an issue to discuss.
*   **No**: It might be better as a separate plugin or tool.

## 🛠️ Local Development Setup

AuraTime has zero runtime dependencies, making setup trivial.

1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/krishnakanthb13/good-time-check.git
    cd good-time-check
    ```

2.  **Run the CLI**:
    ```bash
    node cli/interface.js
    ```

3.  **Run the PWA**:
    ```bash
    npx -y serve . -l 3003
    ```
    *Note: We serve from the root so `pwa/index.html` can access the `core/` folder logic.*

## 🚀 Contribution Workflow

1.  **Fork** the repository.
2.  Create a **Feature Branch** (`git checkout -b feature/cool-new-thing`).
3.  **Verify** your changes in both the CLI and PWA.
4.  Commit with **Clear Messages** (`git commit -m "Fix mobile padding in PWA"`).
5.  Push to your fork and submit a **Pull Request**.

## ✅ Pre-Submission Checklist

*   [ ] Does the code work in Node.js (CLI)?
*   [ ] Does the code work in Chrome/Safari/Firefox (PWA)?
*   [ ] Have you updated `CODE_DOCUMENTATION.md` if core logic changed?
*   [ ] Are there any new external dependencies? (We prefer zero dependencies).

---

By contributing, you agree that your code will be licensed under the **GPL v3 License**.
