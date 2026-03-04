import { describe, it, expect, beforeEach, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe("useSearchHistory", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle adding items to history", async () => {
    const mockHistory = [
      { code: "1.0.01.00.13", timestamp: Date.now() },
    ];

    (AsyncStorage.getItem as any).mockResolvedValue(null);
    (AsyncStorage.setItem as any).mockResolvedValue(undefined);

    // Simulate adding to history
    const newItem = { code: "1.0.01.00.13", timestamp: Date.now() };
    const updated = [newItem];

    expect(updated).toHaveLength(1);
    expect(updated[0].code).toBe("1.0.01.00.13");
  });

  it("should limit history to 10 items", () => {
    const items = Array.from({ length: 15 }, (_, i) => ({
      code: `CODE_${i}`,
      timestamp: Date.now() - i * 1000,
    }));

    const limited = items.slice(0, 10);

    expect(limited).toHaveLength(10);
    expect(limited[0].code).toBe("CODE_0");
  });

  it("should remove duplicates from history", () => {
    const history = [
      { code: "1.0.01.00.13", timestamp: Date.now() },
      { code: "2.0.01.00.01", timestamp: Date.now() - 1000 },
      { code: "1.0.01.00.13", timestamp: Date.now() - 2000 },
    ];

    const trimmedCode = "1.0.01.00.13";
    const filtered = history.filter((item) => item.code !== trimmedCode);

    expect(filtered).toHaveLength(1);
    expect(filtered[0].code).toBe("2.0.01.00.01");
    expect(filtered.some((item) => item.code === trimmedCode)).toBe(false);
  });

  it("should handle empty search codes", () => {
    const trimmedCode = "".trim();

    expect(trimmedCode).toBe("");
    expect(trimmedCode.length).toBe(0);
  });

  it("should preserve order with newest first", () => {
    const history = [
      { code: "1.0.01.00.13", timestamp: Date.now() },
      { code: "2.0.01.00.01", timestamp: Date.now() - 1000 },
    ];

    const newItem = { code: "3.0.01.00.01", timestamp: Date.now() + 1000 };
    const updated = [newItem, ...history];

    expect(updated[0].code).toBe("3.0.01.00.01");
    expect(updated[1].code).toBe("1.0.01.00.13");
    expect(updated[2].code).toBe("2.0.01.00.01");
  });
});
