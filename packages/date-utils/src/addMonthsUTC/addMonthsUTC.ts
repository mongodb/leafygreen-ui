import { setUTCMonth } from '../setUTCMonth';

export const addMonthsUTC = (date: Date, months: number): Date => {
  const utcMonth = date.getUTCMonth();
  const newDate = setUTCMonth(date, utcMonth + months);
  return newDate;
};
