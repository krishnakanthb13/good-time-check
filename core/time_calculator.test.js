import { describe, it, expect } from "vitest";
import { parseTime, formatMinutes, getTimeStatus } from "./time_calculator.js";
import { TIME_TABLES, DAYS } from "./time_tables.js";

// ─── parseTime ───────────────────────────────────────────────────
describe("parseTime", () => {
  it("parses valid times", () => {
    expect(parseTime("00:00")).toBe(0);
    expect(parseTime("06:00")).toBe(360);
    expect(parseTime("12:30")).toBe(750);
    expect(parseTime("23:59")).toBe(1439);
  });

  it("rejects missing colon", () => {
    expect(() => parseTime("abc")).toThrow("Invalid time format");
  });

  it("rejects non-numeric values", () => {
    expect(() => parseTime("ab:cd")).toThrow("Invalid time value");
  });

  it("rejects out-of-range hours", () => {
    expect(() => parseTime("25:00")).toThrow("Time out of range");
  });

  it("rejects out-of-range minutes", () => {
    expect(() => parseTime("12:60")).toThrow("Time out of range");
  });

  it("rejects negative values", () => {
    expect(() => parseTime("-1:00")).toThrow("Time out of range");
  });
});

// ─── formatMinutes ───────────────────────────────────────────────
describe("formatMinutes", () => {
  it("formats midnight", () => {
    expect(formatMinutes(0)).toBe("00:00");
  });

  it("formats normal times", () => {
    expect(formatMinutes(360)).toBe("06:00");
    expect(formatMinutes(750)).toBe("12:30");
    expect(formatMinutes(1439)).toBe("23:59");
  });

  it("wraps values beyond 1440", () => {
    expect(formatMinutes(1440)).toBe("00:00");
    expect(formatMinutes(1500)).toBe("01:00");
  });

  it("handles negative values", () => {
    expect(formatMinutes(-1)).toBe("23:59");
    expect(formatMinutes(-60)).toBe("23:00");
  });
});

// ─── getTimeStatus ───────────────────────────────────────────────
describe("getTimeStatus", () => {
  it("returns valid status for a known date", () => {
    // Monday 2025-01-06 at 08:00 — should be in Rahu Kalam (07:30-09:00)
    const now = new Date(2025, 0, 6, 8, 0);
    const status = getTimeStatus(now);
    expect(status.dayName).toBe("Monday");
    expect(status.currentTime).toBe("08:00");
    expect(status.isSafe).toBe(false);
    expect(status.activePeriods.some((p) => p.key === "rahuKalam")).toBe(true);
  });

  it("returns safe for time outside all periods", () => {
    // Monday 2025-01-06 at 06:00 — before any period
    const now = new Date(2025, 0, 6, 6, 0);
    const status = getTimeStatus(now);
    expect(status.isSafe).toBe(true);
    expect(status.activePeriods).toHaveLength(0);
  });

  it("handles invalid Date gracefully", () => {
    const status = getTimeStatus(new Date("invalid"));
    // Falls back to current time — just verify it returns a valid structure
    expect(status.currentTime).toMatch(/^\d{2}:\d{2}$/);
    expect(status.todaySchedule).toHaveLength(3);
  });

  it("defaults to current time when no argument", () => {
    const status = getTimeStatus();
    expect(status.currentTime).toMatch(/^\d{2}:\d{2}$/);
    expect(status.todaySchedule).toHaveLength(3);
  });

  it("todaySchedule has all 3 periods", () => {
    const status = getTimeStatus();
    expect(status.todaySchedule).toHaveLength(3);
    for (const s of status.todaySchedule) {
      expect(s).toHaveProperty("name");
      expect(s).toHaveProperty("start");
      expect(s).toHaveProperty("end");
      expect(s).toHaveProperty("isActive");
      expect(s).toHaveProperty("isPast");
    }
  });
});

// ─── Boundary edge cases ─────────────────────────────────────────
describe("getTimeStatus boundaries", () => {
  it("exactly at period start is active", () => {
    // Monday 2025-01-06 at 07:30 — exact start of Rahu Kalam
    const now = new Date(2025, 0, 6, 7, 30);
    const status = getTimeStatus(now);
    expect(status.isSafe).toBe(false);
    expect(status.activePeriods.some((p) => p.key === "rahuKalam")).toBe(true);
  });

  it("one minute before period end is active", () => {
    // Monday 2025-01-06 at 08:59 — one min before Rahu Kalam ends
    const now = new Date(2025, 0, 6, 8, 59);
    const status = getTimeStatus(now);
    expect(status.isSafe).toBe(false);
    expect(status.activePeriods.some((p) => p.key === "rahuKalam")).toBe(true);
  });

  it("exactly at period end is safe", () => {
    // Monday 2025-01-06 at 09:00 — exact end of Rahu Kalam
    const now = new Date(2025, 0, 6, 9, 0);
    const status = getTimeStatus(now);
    expect(status.isSafe).toBe(true);
  });

  it("23:59 is safe", () => {
    const now = new Date(2025, 0, 6, 23, 59);
    const status = getTimeStatus(now);
    expect(status.currentTime).toBe("23:59");
    expect(status.isSafe).toBe(true);
  });

  it("00:00 is safe", () => {
    // Sunday 2025-01-05 at midnight
    const now = new Date(2025, 0, 5, 0, 0);
    const status = getTimeStatus(now);
    expect(status.currentTime).toBe("00:00");
    expect(status.isSafe).toBe(true);
  });

  it("every weekday has valid schedule", () => {
    for (let day = 0; day < 7; day++) {
      // Use a known Sunday (2025-01-05) and offset
      const now = new Date(2025, 0, 5 + day, 12, 0);
      const status = getTimeStatus(now);
      expect(status.todaySchedule).toHaveLength(3);
      expect(status.dayName).toBe(["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][day]);
    }
  });
});

// ─── Data integrity ──────────────────────────────────────────────
describe("TIME_TABLES integrity", () => {
  it("each period has required fields", () => {
    const required = ["name", "color", "description", "warning", "schedule"];
    for (const [key, period] of Object.entries(TIME_TABLES)) {
      for (const field of required) {
        expect(period).toHaveProperty(field);
      }
    }
  });
  it("has exactly 3 periods", () => {
    expect(Object.keys(TIME_TABLES)).toHaveLength(3);
  });

  it("each period has 7 schedule days", () => {
    for (const [key, period] of Object.entries(TIME_TABLES)) {
      expect(Object.keys(period.schedule)).toHaveLength(7);
    }
  });

  it("each day has start before end", () => {
    for (const [key, period] of Object.entries(TIME_TABLES)) {
      for (let d = 0; d < 7; d++) {
        const slot = period.schedule[d];
        const start = parseTime(slot.start);
        const end = parseTime(slot.end);
        expect(start).toBeLessThan(end);
      }
    }
  });

  it("DAYS has 7 entries", () => {
    expect(DAYS).toHaveLength(7);
  });

  it("TIME_TABLES is frozen", () => {
    expect(Object.isFrozen(TIME_TABLES)).toBe(true);
  });

  it("schedule objects are frozen", () => {
    for (const period of Object.values(TIME_TABLES)) {
      expect(Object.isFrozen(period.schedule)).toBe(true);
    }
  });
});
