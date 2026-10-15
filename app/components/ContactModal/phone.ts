/** Keep the existing Russian phone mask, accepting either 7 or 8 as a prefix. */
export function formatPhone(rawValue: string): string {
  let digits = rawValue.replace(/\D/g, "");
  if (digits.startsWith("7") || digits.startsWith("8")) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (!digits) return "+7 ";

  let formatted = `+7 (${digits.slice(0, 3)}`;
  if (digits.length >= 4) formatted += `) ${digits.slice(3, 6)}`;
  if (digits.length >= 7) formatted += `-${digits.slice(6, 8)}`;
  if (digits.length >= 9) formatted += `-${digits.slice(8, 10)}`;
  return formatted;
}
