import padStart from 'lodash/padStart';

/**
 * Returns the month name from a given index and optional locale
 */
export const getMonthName = (monthIndex: number, locale = 'default') => {
  const str = `2023-${padStart((monthIndex + 1).toString(), 2, '0')}-15`;
  const month = new Date(str);
  return {
    long: month.toLocaleString(locale, { month: 'long' }),
    short: month.toLocaleString(locale, { month: 'short' }),
  };
};
