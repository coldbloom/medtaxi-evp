/**
 * Форматирует телефонный номер из вида "+79490676701" в "+7 (949) 067-67-01".
 * Если номер не соответствует ожидаемому формату (11 цифр с ведущим "+7"),
 * возвращает исходную строку без изменений.
 */
export function formatPhoneNumber(phone: string): string {
  // Оставляем только цифры
  const digits = phone.replace(/\D/g, "");

  // Ожидаем 11 цифр: 7 + 10 цифр номера
  if (digits.length !== 11 || !digits.startsWith("7")) {
    return phone;
  }

  const country = digits[0];                          // "7"
  const area = digits.slice(1, 4);         // "949"
  const part1 = digits.slice(4, 7);        // "067"
  const part2 = digits.slice(7, 9);        // "67"
  const part3 = digits.slice(9, 11);       // "01"

  return `+${country} (${area}) ${part1}-${part2}-${part3}`;
}