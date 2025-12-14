import { DateType, isValidDate } from '@leafygreen-ui/date-utils';

/**
 * Checks if two dates are the same day and time in UTC.
 *
 * @param day1 - The first date to check
 * @param day2 - The second date to check
 * @returns Whether the two dates are the same day and time in UTC
 */
export const isSameUTCDayAndTime = (
  day1?: DateType,
  day2?: DateType,
): boolean => {
  if (!isValidDate(day1) || !isValidDate(day2)) return false;

  return (
    day1.getUTCDate() === day2.getUTCDate() &&
    day1.getUTCMonth() === day2.getUTCMonth() &&
    day1.getUTCFullYear() === day2.getUTCFullYear() &&
    day1.getUTCHours() === day2.getUTCHours() &&
    day1.getUTCMinutes() === day2.getUTCMinutes() &&
    day1.getUTCSeconds() === day2.getUTCSeconds() &&
    day1.getUTCMilliseconds() === day2.getUTCMilliseconds()
  );
};
