import { describe, it, expect } from "vitest";

// Replicar a função para testes
const isSpecialNote = (temp: string | number): boolean => {
  const tempStr = String(temp).toUpperCase();
  return (
    tempStr.includes("PERMANENTE") ||
    tempStr.includes("USE:") ||
    tempStr.includes("UTILIZAR") ||
    tempStr.includes("APROVACAO") ||
    tempStr.includes("TCE")
  );
};

describe("isSpecialNote", () => {
  it("should identify PERMANENTE as special note", () => {
    expect(isSpecialNote("PERMANENTE")).toBe(true);
    expect(isSpecialNote("permanente")).toBe(true);
  });

  it("should identify USE: references as special note", () => {
    expect(isSpecialNote("USE: 2.0.04.01.03")).toBe(true);
  });

  it("should identify UTILIZAR references as special note", () => {
    expect(isSpecialNote("NECESSITA APROVACAO DO TCE -UTILIZAR COD.: 20040201")).toBe(true);
  });

  it("should identify TCE references as special note", () => {
    expect(isSpecialNote("NECESSITA APROVACAO DO TCE")).toBe(true);
  });

  it("should identify APROVACAO as special note", () => {
    expect(isSpecialNote("NECESSITA APROVACAO")).toBe(true);
  });

  it("should not identify regular numbers as special note", () => {
    expect(isSpecialNote("1")).toBe(false);
    expect(isSpecialNote("5")).toBe(false);
    expect(isSpecialNote("40")).toBe(false);
  });

  it("should not identify regular text as special note", () => {
    expect(isSpecialNote("Nao especificado")).toBe(false);
  });

  it("should be case insensitive", () => {
    expect(isSpecialNote("permanente")).toBe(true);
    expect(isSpecialNote("Permanente")).toBe(true);
    expect(isSpecialNote("PERMANENTE")).toBe(true);
  });
});
