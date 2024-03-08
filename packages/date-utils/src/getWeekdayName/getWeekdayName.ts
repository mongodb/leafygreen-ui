import truncate from 'lodash/truncate';

import { Month } from '../constants';
import { normalizeLocale } from '../normalizeLocale';
import { WeekdayObject } from '../types';

export const getWeekdayName = (
  day: number,
  localeStr?: string,
): WeekdayObject => {
  // Use the default system locale if the provided value is invalid
  localeStr = normalizeLocale(localeStr);
  day = (day % 7) + 1;
  const sampleDate = new Date(2000, Month.October, day); // October 1 2000 was a Sunday

  // TODO: format the sample date using `date-fns/format`
  // and unicode date field symbols https://unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
  return {
    long: sampleDate.toLocaleDateString(localeStr, {
      weekday: 'long',
    }),
    abbr: sampleDate.toLocaleDateString(localeStr, {
      weekday: 'short',
    }),
    short: truncate(
      sampleDate.toLocaleDateString(localeStr, {
        weekday: 'short',
      }),
      { length: 2, omission: '' },
    ),
    narrow: sampleDate.toLocaleDateString(localeStr, {
      weekday: 'narrow',
    }),
  };
};
