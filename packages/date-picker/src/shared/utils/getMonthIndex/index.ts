import { Months } from '../../constants';

/**
 * Returns the month index of a month name in the current locale
 */
export const getMonthIndex = (monthName: string): number | null => {
  const index = Months.findIndex(({ long, short }) =>
    [long, short].includes(monthName),
  );
  return index >= 0 ? index : null;
};
