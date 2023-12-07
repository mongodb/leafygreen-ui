import { Month } from '../../constants';
import { WeekdayObject } from '../../types';
import { isValidLocale } from '../isValidLocale';

export const getWeekdayName = (day: number, locale?: string): WeekdayObject => {
  // Use the default system locale if the provided value is invalid
  locale = isValidLocale(locale) ? locale : undefined;

  day = (day % 7) + 1;
  return {
    long: new Date(2000, Month.October, day).toLocaleString(locale, {
      weekday: 'long',
    }),
    short: new Date(2000, Month.October, day).toLocaleString(locale, {
      weekday: 'short',
    }),
    narrow: new Date(2000, Month.October, day).toLocaleString(locale, {
      weekday: 'narrow',
    }),
  };
};
