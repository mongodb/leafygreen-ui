export const addDaysUTC = (date: Date, daysToAdd: number): Date => {
  const newDate = new Date(date);
  const day = newDate.getUTCDate();
  const newDay = day + daysToAdd;
  newDate.setUTCDate(newDay);
  return newDate;
};
