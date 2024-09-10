/** Returns a new date from the provided date and year */
export const setUTCYear = (date: Date, year: number): Date => {
  const newDate = new Date(date);
  newDate.setUTCFullYear(year);
  return newDate;
};
