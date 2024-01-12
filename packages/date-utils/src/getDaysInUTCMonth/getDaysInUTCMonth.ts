/**
 * Returns the number of days in a given UTC month
 */
export const getDaysInUTCMonth = (date: Date): number => {
  const year = date.getUTCFullYear();
  const monthIndex = date.getUTCMonth();
  const lastDayOfMonth = new Date(date);
  lastDayOfMonth.setUTCFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setUTCHours(0, 0, 0, 0);
  return lastDayOfMonth.getUTCDate();
};
