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

/**
 * Parse a "HH:MM" time string into total minutes since midnight.
 */
function parseTime(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Format minutes since midnight back to "HH:MM" string.
 */
function formatMinutes(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * Get the current time status.
 * @param {Date} [now] - Optional date override for testing.
 * @returns {Object} Status object with activeperiods, currentTime, dayName, etc.
 */
function getTimeStatus(now) {
  now = now || new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday
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

// Export for both Node.js and browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = { getTimeStatus, parseTime, formatMinutes };
}
