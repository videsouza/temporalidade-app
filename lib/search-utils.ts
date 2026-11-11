export function formatDocumentCode(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const groups = [digits.slice(0, 1), digits.slice(1, 2), digits.slice(2, 4), digits.slice(4, 6), digits.slice(6, 8)];
  return groups.filter(Boolean).join(".");
}

export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}
