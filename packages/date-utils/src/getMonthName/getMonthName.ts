import { normalizeLocale } from '../normalizeLocale';
import { MonthObject } from '../types';

/**
 * Returns the month name from a given index and optional locale
 */
export const getMonthName = (
  monthIndex: number,
  locale?: string,
): MonthObject => {
  // Use the default system locale if the provided value is invalid
  locale = normalizeLocale(locale);
  return {
    long: new Date(2020, monthIndex, 15).toLocaleString(locale, {
      month: 'long',
    }),
    short: new Date(2020, monthIndex, 15).toLocaleString(locale, {
      month: 'short',
    }),
  };
};
