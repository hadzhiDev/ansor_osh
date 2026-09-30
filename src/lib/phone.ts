// Validates Kyrgyz (KG) phone numbers.
// Accepts common formats:
//   +996 700 123 456 / 996700123456  (12 digits, country code 996)
//   0700 123 456      / 0700123456    (10 digits, local with leading 0)
//   700 123 456       / 700123456     (9 digits, without code or 0)
export function isValidKgPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("996")) return true;
  if (digits.length === 10 && digits.startsWith("0")) return true;
  if (digits.length === 9) return true;

  return false;
}

// Normalizes to international digits (996XXXXXXXXX) for wa.me links.
export function normalizeKgPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");

  if (digits.length === 12 && digits.startsWith("996")) return digits;
  if (digits.length === 10 && digits.startsWith("0")) return "996" + digits.slice(1);
  if (digits.length === 9) return "996" + digits;

  return digits;
}
