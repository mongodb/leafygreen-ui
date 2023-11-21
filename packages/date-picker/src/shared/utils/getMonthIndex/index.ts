import { MonthsArray } from '../../constants';

/** Returns the index of an English month name */
export const getMonthIndex = (monthName: string): number | null => {
  const index = MonthsArray.indexOf(monthName);
  return index >= 0 ? index : null;
};
