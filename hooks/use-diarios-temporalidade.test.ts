import { describe, it, expect } from "vitest";
import {
  calculateTemporality,
  formatTemporalityDisplay,
  infantilLevels,
  fundamentalSerieOptions,
  fundamentalYearOptions,
  ejaIOptions,
  ejaIIOptions,
} from "./use-diarios-temporalidade";

describe("calculateTemporality", () => {
  it("should calculate temporality for infantil education", () => {
    const result = calculateTemporality("infantil", 5, 2024);
    expect(result.years).toBe(5);
    expect(result.baseYear).toBe(2024);
    expect(result.retentionYear).toBe(2029);
  });

  it("should calculate temporality for fundamental education", () => {
    const result = calculateTemporality("fundamental", 8, 2024);
    expect(result.years).toBe(8);
    expect(result.baseYear).toBe(2024);
    expect(result.retentionYear).toBe(2032);
  });

  it("should calculate temporality for EJA education", () => {
    const result = calculateTemporality("eja", 6, 2024);
    expect(result.years).toBe(6);
    expect(result.baseYear).toBe(2024);
    expect(result.retentionYear).toBe(2030);
  });

  it("should use current year as default", () => {
    const result = calculateTemporality("infantil", 3);
    const currentYear = new Date().getFullYear();
    expect(result.baseYear).toBe(currentYear);
  });
});

describe("formatTemporalityDisplay", () => {
  it("should format infantil level display", () => {
    const display = formatTemporalityDisplay("infantil", "INFANTIL II", 4, 2024);
    expect(display).toContain("INFANTIL II");
    expect(display).toContain("2028");
    expect(display).toContain("4 anos");
  });

  it("should format fundamental serie display", () => {
    const display = formatTemporalityDisplay("fundamental", "5ª série", 5, 2024);
    expect(display).toContain("5ª série");
    expect(display).toContain("2029");
    expect(display).toContain("5 anos");
  });

  it("should format EJA display", () => {
    const display = formatTemporalityDisplay("eja", "Fase I e Fase II", 6, 2024);
    expect(display).toContain("Fase I e Fase II");
    expect(display).toContain("2030");
    expect(display).toContain("6 anos");
  });
});

describe("Infantil Levels Data", () => {
  it("should have correct infantil levels", () => {
    expect(infantilLevels).toHaveLength(9);
    expect(infantilLevels[0]).toEqual({ label: "BI", years: 8 });
    expect(infantilLevels[8]).toEqual({ label: "PRÉ II", years: 2 });
  });

  it("should have all infantil levels with correct years", () => {
    const expectedYears = [8, 7, 6, 5, 4, 3, 3, 2, 2];
    infantilLevels.forEach((level, index) => {
      expect(level.years).toBe(expectedYears[index]);
    });
  });
});

describe("Fundamental Serie Options", () => {
  it("should have correct fundamental serie options", () => {
    expect(fundamentalSerieOptions).toHaveLength(8);
    expect(fundamentalSerieOptions[0]).toEqual({ label: "1ª série", years: 9 });
    expect(fundamentalSerieOptions[7]).toEqual({ label: "8ª série", years: 2 });
  });

  it("should have decreasing years for series", () => {
    const expectedYears = [9, 8, 7, 6, 5, 4, 3, 2];
    fundamentalSerieOptions.forEach((option, index) => {
      expect(option.years).toBe(expectedYears[index]);
    });
  });
});

describe("Fundamental Year Options", () => {
  it("should have correct fundamental year options", () => {
    expect(fundamentalYearOptions).toHaveLength(9);
    expect(fundamentalYearOptions[0]).toEqual({ label: "1º ano", years: 10 });
    expect(fundamentalYearOptions[8]).toEqual({ label: "9º ano", years: 2 });
  });

  it("should have decreasing years for years", () => {
    const expectedYears = [10, 9, 8, 7, 6, 5, 4, 3, 2];
    fundamentalYearOptions.forEach((option, index) => {
      expect(option.years).toBe(expectedYears[index]);
    });
  });
});

describe("EJA I Options", () => {
  it("should have correct EJA I options", () => {
    expect(ejaIOptions).toHaveLength(3);
    expect(ejaIOptions[0]).toEqual({ label: "Fase I e Fase II", years: 6 });
    expect(ejaIOptions[2]).toEqual({ label: "Fase V", years: 4 });
  });

  it("should have correct years for EJA I phases", () => {
    const expectedYears = [6, 5, 4];
    ejaIOptions.forEach((option, index) => {
      expect(option.years).toBe(expectedYears[index]);
    });
  });
});

describe("EJA II Options", () => {
  it("should have correct EJA II options", () => {
    expect(ejaIIOptions).toHaveLength(3);
    expect(ejaIIOptions[0]).toEqual({ label: "Fase I", years: 4 });
    expect(ejaIIOptions[2]).toEqual({ label: "Fase IV", years: 2 });
  });

  it("should have correct years for EJA II phases", () => {
    const expectedYears = [4, 3, 2];
    ejaIIOptions.forEach((option, index) => {
      expect(option.years).toBe(expectedYears[index]);
    });
  });
});

describe("Edge Cases", () => {
  it("should handle year 2025 correctly", () => {
    const result = calculateTemporality("infantil", 8, 2025);
    expect(result.retentionYear).toBe(2033);
  });

  it("should handle maximum years for fundamental", () => {
    const result = calculateTemporality("fundamental", 10, 2024);
    expect(result.retentionYear).toBe(2034);
  });

  it("should handle minimum years for EJA", () => {
    const result = calculateTemporality("eja", 2, 2024);
    expect(result.retentionYear).toBe(2026);
  });
});
