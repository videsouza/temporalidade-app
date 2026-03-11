/**
 * Hook para gerenciar cálculo de temporalidade para Diários de Classe (5.3.02.01.12)
 */

export type EducationType = "infantil" | "fundamental" | "eja";
export type FundamentalOrganization = "serie" | "ano";
export type EJALevel = "eja1" | "eja2";

// Educação Infantil - Agrupados por temporalidade
export const infantilLevels = [
  { label: "BI", years: 8 },
  { label: "BII", years: 7 },
  { label: "BIII", years: 6 },
  { label: "INFANTIL I", years: 5 },
  { label: "INFANTIL II", years: 4 },
  { label: "INFANTIL III e PRÉ I", years: 3 },
  { label: "INFANTIL IV e PRÉ II", years: 2 },
];

// Ensino Fundamental - Série
export const fundamentalSerieOptions = [
  { label: "1ª série", years: 9 },
  { label: "2ª série", years: 8 },
  { label: "3ª série", years: 7 },
  { label: "4ª série", years: 6 },
  { label: "5ª série", years: 5 },
  { label: "6ª série", years: 4 },
  { label: "7ª série", years: 3 },
  { label: "8ª série", years: 2 },
];

// Ensino Fundamental - Ano
export const fundamentalYearOptions = [
  { label: "1º ano", years: 10 },
  { label: "2º ano", years: 9 },
  { label: "3º ano", years: 8 },
  { label: "4º ano", years: 7 },
  { label: "5º ano", years: 6 },
  { label: "6º ano", years: 5 },
  { label: "7º ano", years: 4 },
  { label: "8º ano", years: 3 },
  { label: "9º ano", years: 2 },
];

// EJA I
export const ejaIOptions = [
  { label: "Fase I e Fase II", years: 6 },
  { label: "Fase III e Fase IV", years: 5 },
  { label: "Fase V", years: 4 },
];

// EJA II
export const ejaIIOptions = [
  { label: "Fase I", years: 4 },
  { label: "Fase II e Fase III", years: 3 },
  { label: "Fase IV", years: 2 },
];

/**
 * Calcula a temporalidade baseado no tipo de educação e nível/série/fase
 */
export function calculateTemporality(
  educationType: EducationType,
  selectedYears: number,
  currentYear?: number
): {
  years: number;
  baseYear: number;
  retentionYear: number;
  description: string;
} {
  const base = currentYear || new Date().getFullYear();
  const retentionYear = base + selectedYears;

  let description = "";
  if (educationType === "infantil") {
    description = `Reter até ${selectedYears} anos após o ano letivo do diário`;
  } else if (educationType === "fundamental") {
    description = `Reter até ${selectedYears} anos após o ano letivo do diário`;
  } else if (educationType === "eja") {
    description = `Reter até ${selectedYears} anos após o ano letivo do diário`;
  }

  return {
    years: selectedYears,
    baseYear: base,
    retentionYear,
    description,
  };
}

/**
 * Formata a descrição de temporalidade para exibição
 */
export function formatTemporalityDisplay(
  educationType: EducationType,
  levelLabel: string,
  years: number,
  baseYear: number
): string {
  const retentionYear = baseYear + years;
  return `${levelLabel}: Reter até ${retentionYear} (${years} anos após o ano letivo)`;
}
