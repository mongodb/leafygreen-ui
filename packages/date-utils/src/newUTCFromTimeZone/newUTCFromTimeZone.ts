import { zonedTimeToUtc } from 'date-fns-tz';

/**
 * Creates a new UTC date from a given time zone.
 * This takes the local date created above and converts it to UTC using the `zonedTimeToUtc` helper function.
 *
 * @param year - The year
 * @param month - The month (1-12)
 * @param day - The day
 * @param hour - The hour in 24 hour format
 * @param minute - The minute
 * @param second - The second
 * @param timeZone - The time zone
 * @returns The new UTC date
 *
 * @example
 * ```js
 * // February 20, 2026 11:00:00 PM/23:00:00 in America/New_York is February 21, 2026 04:00:00 UTC
 * newUTCFromTimeZone({ year: '2026', month: '02', day: '20', hour: '11', minute: '00', second: '00', timeZone: 'America/New_York' });
 * // returns new Date('2026-02-21T04:00:00Z')
 * ```
 */
export const newUTCFromTimeZone = ({
  year,
  month,
  day,
  hour,
  minute,
  second,
  timeZone,
}: {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
  timeZone: string;
}) => {
  const newDate = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute),
    Number(second),
  );

  return zonedTimeToUtc(newDate, timeZone);
};
