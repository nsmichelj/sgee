export function calculateProgressBetweenDates(
  startDate: Date | string,
  endDate: Date | string,
  currentDate: Date | string = new Date(),
): number {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const current = new Date(currentDate).getTime();

  if (end <= start) {
    return 0;
  }

  const totalDuration = end - start;
  const elapsedDuration = current - start;

  const progress = (elapsedDuration / totalDuration) * 100;

  return Math.round(Math.min(100, Math.max(0, progress)) * 10) / 10;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("es-VE", {
    dateStyle: "medium",
    timeZone: "America/Caracas",
  }).format(date);
}
