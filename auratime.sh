#!/usr/bin/env bash
# ─── AuraTime Launcher (Linux / macOS) ────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo ""
    echo "  [ERROR] Node.js is not installed or not in PATH."
    echo "  Please install Node.js from https://nodejs.org"
    echo ""
    exit 1
fi

# Run the CLI
node "$SCRIPT_DIR/cli/interface.js" "$@"
