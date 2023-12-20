import { InvalidDate } from './InvalidDate';
export type DateType = Date | InvalidDate | null;
export type DateRangeType = [DateType, DateType];

export type LocaleString = 'iso8601' | string;

export interface MonthObject {
  /** The localized long-form month name (e.g. December, July) */
  long: string;
  /** A localized short-form month name (e.g. Dec, Jul) */
  short: string;
}

/**
 * Object representing the abbreviations of a given weekday.
 * Abbreviation formats defined in Unicode: https://www.unicode.org/reports/tr35/tr35-67/tr35-dates.html#dfst-weekday
 */
export interface WeekdayObject {
  /** The long-form weekday name (e.g. Tuesday)*/
  long: string;
  /** An abbreviated weekday name (e.g. Tue) */
  abbr: string;
  /** A shorter weekday name (e.g. Tu)*/
  short?: string;
  /** The shortest weekday name (e.g. T) */
  narrow: string;
}
