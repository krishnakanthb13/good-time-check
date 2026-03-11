#!/usr/bin/env node
/**
 * AuraTime - CLI Interface
 * A terminal-based time checker for Rahu Kalam, Yamagandam, and Gulika Kalam.
 */

const { TIME_TABLES, DAYS } = require("../core/time_tables");
const { getTimeStatus } = require("../core/time_calculator");
const readline = require("readline");

// ─── ANSI Color Helpers ───────────────────────────────────────────
const C = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgMagenta: "\x1b[45m",
};

const colorMap = {
  red: C.red,
  yellow: C.yellow,
  magenta: C.magenta,
  green: C.green,
};

// ─── Display Functions ────────────────────────────────────────────
function clearScreen() {
  process.stdout.write("\x1b[2J\x1b[H");
}

function printBanner() {
  console.log(
    `${C.cyan}${C.bold}
  ╔═══════════════════════════════════════════╗
  ║            ✦  A U R A T I M E  ✦          ║
  ║       Good Time / Bad Time Checker        ║
  ╚═══════════════════════════════════════════╝${C.reset}
`
  );
}

function printStatus(status) {
  console.log(
    `  ${C.dim}Current Time:${C.reset} ${C.bold}${status.currentTime}${C.reset}`
  );
  console.log(
    `  ${C.dim}Today:${C.reset}        ${C.bold}${status.dayName}${C.reset}`
  );
  console.log();

  if (status.isSafe) {
    console.log(
      `  ${C.bgGreen}${C.bold}${C.white}  ✓ SAFE TIME  ${C.reset}`
    );
    console.log();
    console.log(
      `  ${C.green}No Rahu Kalam, Yamagandam, or Gulika Kalam is active.${C.reset}`
    );
    console.log(
      `  ${C.green}This is a favorable time for new beginnings.${C.reset}`
    );
  } else {
    for (const p of status.activePeriods) {
      const c = colorMap[p.color] || C.white;
      const bg =
        p.color === "red"
          ? C.bgRed
          : p.color === "yellow"
          ? C.bgYellow
          : C.bgMagenta;
      console.log(
        `  ${bg}${C.bold}${C.white}  ⚠ ${p.name.toUpperCase()}  ${C.reset}`
      );
      console.log();
      console.log(
        `  ${c}Time Range: ${p.start} – ${p.end}${C.reset}`
      );
      console.log(`  ${c}${p.description}${C.reset}`);
      console.log(`  ${c}${p.warning}${C.reset}`);
      console.log();
    }
  }
}

function printSchedule(status) {
  console.log(
    `\n  ${C.bold}${C.cyan}─── Today's Full Schedule ───${C.reset}\n`
  );
  for (const s of status.todaySchedule) {
    const c = colorMap[s.color] || C.white;
    const marker = s.isActive ? "►" : s.isPast ? "✓" : "○";
    const style = s.isActive ? C.bold : s.isPast ? C.dim : "";
    console.log(
      `  ${style}${c}${marker} ${s.name.padEnd(16)} ${s.start} – ${s.end}${
        s.isActive ? "  ◄ NOW" : ""
      }${C.reset}`
    );
  }
  console.log();
}

function printHelp() {
  console.log(
    `  ${C.dim}────────────────────────────────────────────${C.reset}`
  );
  console.log(`  ${C.bold}Keys:${C.reset}`);
  console.log(`    ${C.cyan}R${C.reset}  Rahu Kalam explanation`);
  console.log(`    ${C.cyan}Y${C.reset}  Yamagandam explanation`);
  console.log(`    ${C.cyan}G${C.reset}  Gulika Kalam explanation`);
  console.log(`    ${C.cyan}S${C.reset}  Today's full schedule`);
  console.log(`    ${C.cyan}↑↓${C.reset} Navigate explanations`);
  console.log(`    ${C.cyan}Q${C.reset}  Quit`);
  console.log(
    `  ${C.dim}────────────────────────────────────────────${C.reset}`
  );
}

function printExplanation(key) {
  const period = TIME_TABLES[key];
  if (!period) return;
  const c = colorMap[period.color] || C.white;
  console.log();
  console.log(`  ${c}${C.bold}━━━ ${period.name} ━━━${C.reset}`);
  console.log();
  console.log(`  ${c}${period.description}${C.reset}`);
  console.log(`  ${c}${period.warning}${C.reset}`);
  console.log();
  console.log(`  ${C.dim}Weekly Schedule:${C.reset}`);
  for (let d = 0; d < 7; d++) {
    const slot = period.schedule[d];
    console.log(`    ${C.dim}${DAYS[d].padEnd(12)}${C.reset} ${slot.start} – ${slot.end}`);
  }
  console.log();
}

// ─── Main ─────────────────────────────────────────────────────────
function main() {
  // Non-interactive mode: just print and exit
  if (process.argv.includes("--once") || process.argv.includes("-1")) {
    const status = getTimeStatus();
    printBanner();
    printStatus(status);
    printSchedule(status);
    return;
  }

  // Interactive mode
  const periodKeys = ["rahuKalam", "yamagandam", "gulikaKalam"];
  let selectedIndex = 0;
  let currentScreen = "main"; // Tracks what to render: "main" or "explain"

  // Hide cursor for smoother redraws
  process.stdout.write("\x1b[?25l");

  function renderCurrentScreen() {
    clearScreen();
    if (currentScreen === "main") {
      const status = getTimeStatus();
      printBanner();
      printStatus(status);
      printSchedule(status);
      printHelp();
    } else if (currentScreen === "explain") {
      printBanner();
      printExplanation(periodKeys[selectedIndex]);
      console.log(
        `  ${C.dim}↑↓ Navigate  |  Press any other key to go back${C.reset}`
      );
    }
  }

  // Initial render and setup 1-minute ticking loop
  renderCurrentScreen();
  setInterval(renderCurrentScreen, 60000);

  // Setup raw input
  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  process.stdin.on("keypress", (str, key) => {
    if (!key) return;

    if (key.name === "q" || (key.ctrl && key.name === "c")) {
      clearScreen();
      process.stdout.write("\x1b[?25h"); // Show cursor again
      console.log(`\n  ${C.cyan}${C.bold}Thank you for using AuraTime! ✦${C.reset}\n`);
      process.exit(0);
    }

    if (key.name === "r") {
      selectedIndex = periodKeys.indexOf("rahuKalam");
      currentScreen = "explain";
      renderCurrentScreen();
      return;
    }
    if (key.name === "y") {
      selectedIndex = periodKeys.indexOf("yamagandam");
      currentScreen = "explain";
      renderCurrentScreen();
      return;
    }
    if (key.name === "g") {
      selectedIndex = periodKeys.indexOf("gulikaKalam");
      currentScreen = "explain";
      renderCurrentScreen();
      return;
    }
    if (key.name === "s") {
      currentScreen = "main";
      renderCurrentScreen();
      return;
    }

    // Arrow navigation for explanations
    if (key.name === "up") {
      selectedIndex = (selectedIndex - 1 + periodKeys.length) % periodKeys.length;
      currentScreen = "explain";
      renderCurrentScreen();
      return;
    }
    if (key.name === "down") {
      selectedIndex = (selectedIndex + 1) % periodKeys.length;
      currentScreen = "explain";
      renderCurrentScreen();
      return;
    }

    // Any other key goes back to main
    currentScreen = "main";
    renderCurrentScreen();
  });

  process.stdin.resume();
}

main();
