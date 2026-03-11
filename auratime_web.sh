#!/usr/bin/env bash
# ─── AuraTime Web Launcher (Linux / macOS) ────────────────────────

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo ""
    echo "  [ERROR] Node.js is not installed or not in PATH."
    echo "  Please install Node.js from https://nodejs.org"
    echo ""
    exit 1
fi

echo ""
echo "  Starting AuraTime Web Server..."
echo "  Opening http://localhost:3003/pwa in your default browser..."
echo ""

cd "$SCRIPT_DIR"

# Try to open the browser based on the OS
sleep 1 && (
  if command -v xdg-open &> /dev/null; then
      xdg-open http://localhost:3003/pwa
  elif command -v open &> /dev/null; then
      open http://localhost:3003/pwa
  fi
) &

# Run the server
npx -y serve . -l 3003
