import { describe, expect, it } from "vitest";

import { getQuickSearchCounts } from "./quick-search";

describe("quick search", () => {
  it("counts matches across document and sector databases", () => {
    const counts = getQuickSearchCounts(
      "biblioteca",
      [
        { COD: "1", SERIE: "Biblioteca", TIPO: "Acervo", TEMP: "5", OBS: "" },
        { COD: "2", SERIE: "Arquivo", TIPO: "Ofício", TEMP: "2", OBS: "" },
      ],
      [
        { codigo: "10", descricao: "Biblioteca Central" },
        { codigo: "11", descricao: "Escola Municipal" },
      ],
    );

    expect(counts).toEqual({ documents: 1, sectors: 1 });
  });

  it("returns zero counts for an empty term", () => {
    expect(getQuickSearchCounts("  ", [], [])).toEqual({ documents: 0, sectors: 0 });
  });
});
