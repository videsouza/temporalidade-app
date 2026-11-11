import { describe, expect, it } from "vitest";

import { formatDocumentCode, normalizeSearchText } from "./search-utils";

describe("search utilities", () => {
  it("formats numeric document codes as x.x.xx.xx.xx", () => {
    expect(formatDocumentCode("53020112")).toBe("5.3.02.01.12");
    expect(formatDocumentCode("5.3-02/01.12")).toBe("5.3.02.01.12");
  });

  it("ignores non-numeric characters and limits the code to eight digits", () => {
    expect(formatDocumentCode("abc123456789")).toBe("1.2.34.56.78");
    expect(formatDocumentCode("---")).toBe("");
  });

  it("normalizes accents and case for sector searches", () => {
    expect(normalizeSearchText("EMEI Ângela de Castro")).toContain("emei angela");
    expect(normalizeSearchText("Informática")).toBe("informatica");
  });
});
