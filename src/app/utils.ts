export function nowAddDays(days: number): Date {
  const now = new Date();

  const date = new Date();
  date.setDate(now.getDate() + days);

  return date;
}

export function nowAddDaysFormatted(days: number): string {
  const date = nowAddDays(days);

  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}
