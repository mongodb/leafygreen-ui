export const setUTCDate = (date: Date, update: number) => {
  const newDate = new Date(date);
  newDate.setUTCDate(update);
  return newDate;
};
