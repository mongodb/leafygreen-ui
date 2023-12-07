import { getLocaleMonths } from '../getLocaleMonths';

/**
 * Returns the month index of a month name in the current locale
 */
export const getMonthIndex = (
  monthName: string,
  locale?: string,
): number | null => {
  const index = getLocaleMonths(locale).findIndex(({ long, short }) =>
    [long, short].includes(monthName),
  );
  return index >= 0 ? index : null;
};
