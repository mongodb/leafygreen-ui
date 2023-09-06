import { getDay, getDaysInMonth, setDate } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { chunk, fill, range } from 'lodash';
import { getWeekStartByLocale } from 'weekstart';

import { daysPerWeek } from '../../constants';
import { BaseDatePickerProps } from '../../types';

interface GetWeeksArrayOptions
  extends Required<Pick<BaseDatePickerProps, 'dateFormat' | 'timeZone'>> {}

/**
 * Returns a 7x5 (or 7x6) 2D array of Dates for the given month
 */
export const getWeeksArray = (
  /**
   * Month, given in UTC
   */
  month: Date,

  { dateFormat, timeZone }: GetWeeksArrayOptions,
): Array<Array<Date | null>> => {
  // What day of the week do weeks start on for this locale? (Sun = 0)
  const weekStartsOn = getWeekStartByLocale(dateFormat);

  // Convert the given month to the provided timeZone
  const tzMonth = utcToZonedTime(month, timeZone);

  // The first day of the month
  const firstOfMonth = setDate(tzMonth, 1);

  // What day of the week does this month start on? (Sun = 0)
  const startDayOfWeek = getDay(firstOfMonth);

  // How many days in the month?
  const daysInMonth = getDaysInMonth(firstOfMonth);

  // Shift the start column based on locale (weekStartsOn)
  const startColumn =
    (daysPerWeek + (startDayOfWeek - weekStartsOn)) % daysPerWeek;

  // Create an array from 1 -> daysInMonth
  const allDays: Array<Date | null> = range(daysInMonth).map(i => {
    return setDate(firstOfMonth, i + 1);
  });
  // splice in enough empty elements so that the first is in the right column
  allDays.splice(0, 0, ...fill(range(startColumn), null));

  // Break the array into chunks of 7
  const weeks = chunk(allDays, daysPerWeek);

  return weeks;
};
