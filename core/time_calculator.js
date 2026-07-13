/**
 * AuraTime - Core Time Calculator
 * Shared logic for checking current time against inauspicious periods.
 */

// Support both Node.js and Browser environments safely
const T_TABLES = (typeof module !== "undefined" && module.exports)
  ? require("./time_tables").TIME_TABLES
  : TIME_TABLES;

const T_DAYS = (typeof module !== "undefined" && module.exports)
  ? require("./time_tables").DAYS
  : DAYS;

// Validate that core modules loaded successfully
if (!T_TABLES || !T_DAYS) {
  throw new Error("AuraTime core modules failed to load");
}

/**
 * Parse a "HH:MM" time string into total minutes since midnight.
 */
function parseTime(timeStr) {
  const parts = timeStr.split(":");
  if (parts.length !== 2) throw new Error(`Invalid time format: "${timeStr}"`);
  const h = Number(parts[0]);
  const m = Number(parts[1]);
  if (Number.isNaN(h) || Number.isNaN(m)) {
    throw new Error(`Invalid time value: "${timeStr}"`);
  }
  if (h < 0 || h > 23 || m < 0 || m > 59) {
    throw new Error(`Time out of range: "${timeStr}"`);
  }
  return h * 60 + m;
}

/**
 * Format minutes since midnight back to "HH:MM" string.
 */
function formatMinutes(totalMinutes) {
  const clamped = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(clamped / 60);
  const m = clamped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * Get the current time status.
 * @param {Date} [now] - Optional date override for testing.
 * @returns {Object} Status object with activeperiods, currentTime, dayName, etc.
 */
function getTimeStatus(now) {
  now = now || new Date();
  if (!(now instanceof Date) || isNaN(now.getTime())) {
    now = new Date();
  }
  const dayOfWeek = now.getDay(); // 0 = Sunday
  if (dayOfWeek < 0 || dayOfWeek > 6) {
    return { currentTime: "--:--", dayOfWeek: 0, dayName: "Unknown", activePeriods: [], isSafe: true, todaySchedule: [] };
  }
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const currentTimeStr = formatMinutes(currentMinutes);
  const dayName = T_DAYS[dayOfWeek];

  const activePeriods = [];

  for (const [key, period] of Object.entries(T_TABLES)) {
    const slot = period.schedule[dayOfWeek];
    const startMin = parseTime(slot.start);
    const endMin = parseTime(slot.end);

    if (currentMinutes >= startMin && currentMinutes < endMin) {
      activePeriods.push({
        key,
        name: period.name,
        color: period.color,
        colorCode: period.colorCode,
        hexColor: period.hexColor,
        description: period.description,
        warning: period.warning,
        start: slot.start,
        end: slot.end,
      });
    }
  }

  // Build today's full schedule
  const todaySchedule = Object.entries(T_TABLES).map(([key, period]) => {
    const slot = period.schedule[dayOfWeek];
    const startMin = parseTime(slot.start);
    const endMin = parseTime(slot.end);
    return {
      key,
      name: period.name,
      color: period.color,
      colorCode: period.colorCode,
      hexColor: period.hexColor,
      description: period.description,
      warning: period.warning,
      start: slot.start,
      end: slot.end,
      isActive: currentMinutes >= startMin && currentMinutes < endMin,
      isPast: currentMinutes >= endMin,
    };
  });

  return {
    currentTime: currentTimeStr,
    dayOfWeek,
    dayName,
    activePeriods,
    isSafe: activePeriods.length === 0,
    todaySchedule,
  };
}

// Validate schedule integrity on load (fail fast on corrupt data)
const REQUIRED_FIELDS = ["name", "color", "description", "warning", "schedule"];
for (const [key, period] of Object.entries(T_TABLES)) {
  for (const field of REQUIRED_FIELDS) {
    if (!period[field]) {
      throw new Error(`AuraTime: "${key}" missing required field "${field}"`);
    }
  }
  if (Object.keys(period.schedule).length !== 7) {
    throw new Error(`AuraTime: "${key}" schedule missing entries for all 7 days`);
  }
  for (let d = 0; d < 7; d++) {
    const slot = period.schedule[d];
    if (!slot || !slot.start || !slot.end) continue;
    const s = parseTime(slot.start);
    const e = parseTime(slot.end);
    if (s >= e) {
      throw new Error(`AuraTime: "${key}" day ${d} start(${slot.start}) >= end(${slot.end})`);
    }
  }
}

// Export for both Node.js and browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = { getTimeStatus, parseTime, formatMinutes };
}
