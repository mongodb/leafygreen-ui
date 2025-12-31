import { isValidDate } from '../isValidDate';

/**
 * Applies the time from the given date to today's month, day, and year to create a new date in UTC.
 *
 * @param date - The date to apply the time to
 * @returns The date with the time applied to today's month, day, and year in UTC
 *
 * @example
 * ```js
 * Today is February 20, 2026
 * const date = new Date('2026-01-01T04:00:00Z'); // January 1st, 2026 at 4:00:00 AM
 * const newUTCDate = applyTimeToUTCToday({ date });
 * // '2026-02-20T04:00:00Z' // February 20th, 2026 at 4:00:00 AM
 * ```
 */
export const applyTimeToUTCToday = ({ date }: { date: Date | null }) => {
  if (!isValidDate(date)) {
    return null;
  }

  const today = new Date();

  return new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds(),
    ),
  );
};
