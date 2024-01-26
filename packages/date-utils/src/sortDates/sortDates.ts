import { isBefore, isSameDay } from 'date-fns';

/**
 * Sorts an array of dates.
 * Sorts ascending by default
 *
 * @param dates `Array<Date>`
 * @param direction `'ascending' | 'descending'`
 * @default 'ascending'
 * @returns Sorted `Array<Date>`
 */
export const sortDates = (
  dates: Array<Date>,
  direction: 'ascending' | 'descending' = 'ascending',
): Array<Date> => {
  const dir = direction === 'ascending' ? -1 : 1;
  return dates.sort((a, b) => {
    return isBefore(a, b) ? dir : isSameDay(a, b) ? 0 : -dir;
  });
};
