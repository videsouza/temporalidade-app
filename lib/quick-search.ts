import { normalizeSearchText } from "./search-utils";

export type QuickDocument = {
  COD: string;
  SERIE: string;
  TIPO: string;
  TEMP: string;
  OBS: string;
};

export type QuickSector = {
  codigo: string;
  descricao: string;
};

export function getQuickSearchCounts(
  term: string,
  documents: QuickDocument[],
  sectors: QuickSector[],
) {
  const normalizedTerm = normalizeSearchText(term.trim());
  if (!normalizedTerm) return { documents: 0, sectors: 0 };

  const documentMatches = documents.filter((document) =>
    normalizeSearchText(Object.values(document).join(" ")).includes(normalizedTerm),
  ).length;
  const sectorMatches = sectors.filter((sector) =>
    normalizeSearchText(`${sector.codigo} ${sector.descricao}`).includes(normalizedTerm),
  ).length;

  return { documents: documentMatches, sectors: sectorMatches };
}
