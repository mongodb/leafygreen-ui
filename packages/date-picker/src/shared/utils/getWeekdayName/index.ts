import { truncate } from 'lodash';

import { Month } from '../../constants';
import { WeekdayObject } from '../../types';
import { isValidLocale } from '../isValidLocale';

export const getWeekdayName = (
  day: number,
  localeStr?: string,
): WeekdayObject => {
  // Use the default system locale if the provided value is invalid
  localeStr = isValidLocale(localeStr) ? localeStr : 'en-US';
  day = (day % 7) + 1;

  // TODO: format a sample date using `date-fns/format`
  // and unicode date field symbols https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
  return {
    long: new Date(2000, Month.October, day).toLocaleDateString(localeStr, {
      weekday: 'long',
    }),
    abbr: new Date(2000, Month.October, day).toLocaleDateString(localeStr, {
      weekday: 'short',
    }),
    short: truncate(
      new Date(2000, Month.October, day).toLocaleDateString(localeStr, {
        weekday: 'short',
      }),
      { length: 2, omission: '' },
    ),
    narrow: new Date(2000, Month.October, day).toLocaleDateString(localeStr, {
      weekday: 'narrow',
    }),
  };
};
