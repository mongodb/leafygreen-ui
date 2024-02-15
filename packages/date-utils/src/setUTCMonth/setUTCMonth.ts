/**
 * Equivalent to `date-fns.setMonth`, but strictly for UTC
 */
export const setUTCMonth = (date: Date, month: number): Date => {
  const newDate = new Date(date);
  newDate.setUTCMonth(month);
  return newDate;
};
