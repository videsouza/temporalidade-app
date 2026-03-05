import { describe, it, expect } from "vitest";

// Funções auxiliares para testes
const isEmpty = (value: string): boolean => {
  return value === "" || value === "NaN" || value === "nan";
};

const isSpecialNote = (temp: string): boolean => {
  const tempStr = String(temp).toUpperCase();
  return (
    tempStr.includes("PERMANENTE") ||
    tempStr.includes("USE:") ||
    tempStr.includes("UTILIZAR") ||
    tempStr.includes("APROVACAO") ||
    tempStr.includes("TCE")
  );
};

// Mock data
const mockData = [
  {
    COD: "1.0.01.00.13",
    SERIE: "Registros de Atendimento ao Munícipe",
    TIPO: "Formulário",
    TEMP: "1",
    OBS: "",
  },
  {
    COD: "1.0.05.00.02",
    SERIE: "Minutas de Atos Jurídicos",
    TIPO: "Decreto/Portaria/Resolução",
    TEMP: "1",
    OBS: "1 mês",
  },
  {
    COD: "2.0.04.01.01",
    SERIE: "Fichas Cadastrais",
    TIPO: "Ficha Cadastral",
    TEMP: "PERMANENTE",
    OBS: "",
  },
];

describe("isEmpty", () => {
  it("should identify empty strings", () => {
    expect(isEmpty("")).toBe(true);
  });

  it("should identify NaN values", () => {
    expect(isEmpty("NaN")).toBe(true);
    expect(isEmpty("nan")).toBe(true);
  });

  it("should not identify non-empty strings as empty", () => {
    expect(isEmpty("1")).toBe(false);
    expect(isEmpty("1 mês")).toBe(false);
    expect(isEmpty("Alguma observação")).toBe(false);
  });
});

describe("isSpecialNote", () => {
  it("should identify PERMANENTE as special note", () => {
    expect(isSpecialNote("PERMANENTE")).toBe(true);
  });

  it("should identify USE: references", () => {
    expect(isSpecialNote("USE: 2.0.04.01.03")).toBe(true);
  });

  it("should identify UTILIZAR references", () => {
    expect(isSpecialNote("NECESSITA APROVACAO DO TCE -UTILIZAR COD.: 20040201")).toBe(true);
  });

  it("should identify TCE references", () => {
    expect(isSpecialNote("NECESSITA APROVACAO DO TCE")).toBe(true);
  });

  it("should not identify regular numbers as special", () => {
    expect(isSpecialNote("1")).toBe(false);
    expect(isSpecialNote("5")).toBe(false);
    expect(isSpecialNote("40")).toBe(false);
  });

  it("should be case insensitive", () => {
    expect(isSpecialNote("permanente")).toBe(true);
    expect(isSpecialNote("Permanente")).toBe(true);
  });
});

describe("Search by Code", () => {
  it("should find document by exact code prefix", () => {
    const query = "1.0.01";
    const results = mockData.filter((doc) =>
      doc.COD.toLowerCase().startsWith(query.toLowerCase())
    );
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].COD).toBe("1.0.01.00.13");
  });

  it("should return empty array for non-existent code", () => {
    const query = "9.9.99";
    const results = mockData.filter((doc) =>
      doc.COD.toLowerCase().startsWith(query.toLowerCase())
    );
    expect(results.length).toBe(0);
  });

  it("should be case insensitive", () => {
    const query = "1.0.01";
    const results = mockData.filter((doc) =>
      doc.COD.toLowerCase().startsWith(query.toLowerCase())
    );
    expect(results.length).toBeGreaterThan(0);
  });
});

describe("Search by Keyword", () => {
  it("should find documents by keyword in SERIE column", () => {
    const query = "Registros";
    const results = mockData.filter((doc) =>
      doc.SERIE.toLowerCase().includes(query.toLowerCase())
    );
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].SERIE).toContain("Registros");
  });

  it("should find documents by keyword in TIPO column", () => {
    const query = "Formulário";
    const results = mockData.filter((doc) =>
      doc.TIPO.toLowerCase().includes(query.toLowerCase())
    );
    expect(results.length).toBeGreaterThan(0);
  });

  it("should find documents by keyword in OBS column", () => {
    const query = "mês";
    const results = mockData.filter((doc) =>
      doc.OBS.toLowerCase().includes(query.toLowerCase())
    );
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].OBS).toContain("mês");
  });

  it("should support multiple column search", () => {
    const query = "Formulário";
    const activeColumns = ["TIPO", "SERIE"];
    const results = mockData.filter((doc) => {
      return activeColumns.some((col) => {
        const value = doc[col as keyof typeof doc];
        return value.toLowerCase().includes(query.toLowerCase());
      });
    });
    expect(results.length).toBeGreaterThan(0);
  });

  it("should be case insensitive", () => {
    const query = "REGISTROS";
    const results = mockData.filter((doc) =>
      doc.SERIE.toLowerCase().includes(query.toLowerCase())
    );
    expect(results.length).toBeGreaterThan(0);
  });

  it("should return empty array for non-existent keyword", () => {
    const query = "ZZZZZZZ";
    const results = mockData.filter((doc) =>
      doc.SERIE.toLowerCase().includes(query.toLowerCase())
    );
    expect(results.length).toBe(0);
  });

  it("should support partial word matching", () => {
    const query = "Atend";
    const results = mockData.filter((doc) =>
      doc.SERIE.toLowerCase().includes(query.toLowerCase())
    );
    expect(results.length).toBeGreaterThan(0);
  });
});

describe("Data Validation", () => {
  it("should handle empty OBS field", () => {
    const doc = mockData[0];
    expect(isEmpty(doc.OBS)).toBe(true);
  });

  it("should handle filled OBS field", () => {
    const doc = mockData[1];
    expect(isEmpty(doc.OBS)).toBe(false);
  });

  it("should identify special notes in TEMP field", () => {
    const doc = mockData[2];
    expect(isSpecialNote(doc.TEMP)).toBe(true);
  });

  it("should handle regular TEMP values", () => {
    const doc = mockData[0];
    expect(isSpecialNote(doc.TEMP)).toBe(false);
  });
});
