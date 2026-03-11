/**
 * AuraTime - Core Time Tables
 * Standard Rahu Kalam, Yamagandam, and Gulika Kalam timings.
 * Based on standard 06:00 sunrise / 18:00 sunset assumption.
 * All times in 24-hour format.
 */

const TIME_TABLES = {
  rahuKalam: {
    name: "Rahu Kalam",
    color: "red",
    colorCode: "\x1b[31m",
    hexColor: "#ef4444",
    description: "A time period ruled by the shadow planet Rahu.",
    warning: "Traditionally avoided for starting new ventures or important activities.",
    schedule: {
      0: { start: "16:30", end: "18:00" }, // Sunday
      1: { start: "07:30", end: "09:00" }, // Monday
      2: { start: "15:00", end: "16:30" }, // Tuesday
      3: { start: "12:00", end: "13:30" }, // Wednesday
      4: { start: "13:30", end: "15:00" }, // Thursday
      5: { start: "10:30", end: "12:00" }, // Friday
      6: { start: "09:00", end: "10:30" }, // Saturday
    },
  },
  yamagandam: {
    name: "Yamagandam",
    color: "yellow",
    colorCode: "\x1b[33m",
    hexColor: "#eab308",
    description: "Governed by Yama, the deity of death and justice.",
    warning: "Considered inappropriate for auspicious or life-changing activities.",
    schedule: {
      0: { start: "12:00", end: "13:30" }, // Sunday
      1: { start: "10:30", end: "12:00" }, // Monday
      2: { start: "09:00", end: "10:30" }, // Tuesday
      3: { start: "07:30", end: "09:00" }, // Wednesday
      4: { start: "06:00", end: "07:30" }, // Thursday
      5: { start: "15:00", end: "16:30" }, // Friday
      6: { start: "13:30", end: "15:00" }, // Saturday
    },
  },
  gulikaKalam: {
    name: "Gulika Kalam",
    color: "magenta",
    colorCode: "\x1b[35m",
    hexColor: "#a855f7",
    description: "Associated with Gulika, an upagraha (sub-planet) linked to Saturn.",
    warning: "Tasks begun during this period are believed to face obstacles or need repeating.",
    schedule: {
      0: { start: "15:00", end: "16:30" }, // Sunday
      1: { start: "13:30", end: "15:00" }, // Monday
      2: { start: "12:00", end: "13:30" }, // Tuesday
      3: { start: "10:30", end: "12:00" }, // Wednesday
      4: { start: "09:00", end: "10:30" }, // Thursday
      5: { start: "07:30", end: "09:00" }, // Friday
      6: { start: "06:00", end: "07:30" }, // Saturday
    },
  },
};

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Export for both Node.js and browser
if (typeof module !== "undefined" && module.exports) {
  module.exports = { TIME_TABLES, DAYS };
}
