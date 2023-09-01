import { getDay, getDaysInMonth, isFirstDayOfMonth, setDate } from 'date-fns';
import { chunk, fill, range } from 'lodash';
import { getWeekStartByLocale } from 'weekstart';

import { daysPerWeek } from './CalendarGrid.types';

export const getWeeksArray = (
  month: Date,
  locale: string,
): Array<Array<Date | null>> => {
  // If the provided date isn't the first, shift it
  const firstOfMonth = isFirstDayOfMonth(month) ? month : setDate(month, 1);
  // What day of the week do weeks start on for this locale? (Sun = 0)
  const weekStartsOn = getWeekStartByLocale(locale);
  // What day of the week does this month start on? (Sun = 0)
  const startDayOfWeek = getDay(firstOfMonth);
  // How many days in the month
  const daysInMonth = getDaysInMonth(firstOfMonth);
  // Shift the start column based on locale (weekStartsOn)
  const startColumn =
    (daysPerWeek + (startDayOfWeek - weekStartsOn)) % daysPerWeek;

  // Create an array from 1 -> daysInMonth
  const allDays: Array<Date | null> = range(daysInMonth).map(i =>
    setDate(new Date(firstOfMonth), i + 1),
  );
  // splice in enough empty elements so that the first is in the right column
  allDays.splice(0, 0, ...fill(range(startColumn), null));

  // Break the array into chunks of 7
  const weeks = chunk(allDays, daysPerWeek);

  return weeks;
};
