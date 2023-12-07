import omit from 'lodash/omit';

import { FormFieldState } from '@leafygreen-ui/form-field';

export const DatePickerState = omit(FormFieldState, 'Valid');
export type DatePickerState =
  (typeof DatePickerState)[keyof typeof DatePickerState];

export type DateType = Date | null;
export type DateRangeType = [DateType, DateType];

export interface MonthObject {
  long: string;
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

export const AutoComplete = {
  Off: 'off',
  On: 'on',
  Bday: 'bday',
} as const;

export type AutoComplete = (typeof AutoComplete)[keyof typeof AutoComplete];
