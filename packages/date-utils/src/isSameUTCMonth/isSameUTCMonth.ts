import { isValidDate } from '../isValidDate';
import { DateType } from '../types';

/**
 * Returns whether 2 Dates are the same Month in UTC.
 *
 * Compare to `date-fns.isSameDay`, which uses local time
 */
export const isSameUTCMonth = (day1?: DateType, day2?: DateType): boolean => {
  if (!isValidDate(day1) || !isValidDate(day2)) return false;

  return (
    day1.getUTCMonth() === day2.getUTCMonth() &&
    day1.getUTCFullYear() === day2.getUTCFullYear()
  );
};
