import range from 'lodash/range';

import { isValidLocale } from '../isValidLocale';

interface MonthObject {
  long: string;
  short: string;
}

export const getLocaleMonths = (locale?: string): Array<MonthObject> => {
  // Use the default system locale if the provided value is invalid
  locale = isValidLocale(locale) ? locale : undefined;

  const { format: shortFormat } = Intl.DateTimeFormat(locale, {
    month: 'short',
  });
  const { format: longFormat } = Intl.DateTimeFormat(locale, { month: 'long' });

  return range(12).map(monthIndex => {
    return {
      short: shortFormat(new Date(2020, monthIndex, 1)),
      long: longFormat(new Date(2020, monthIndex, 1)),
    };
  });
};
