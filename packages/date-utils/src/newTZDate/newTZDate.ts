import { getTimezoneOffset } from 'date-fns-tz';

/**
 * Creates a new UTC date from a given time zone.
 * This takes the local date created above and converts it to UTC using the `zonedTimeToUtc` helper function.
 *
 * @param year - The year
 * @param month - The month index (0-11)
 * @param date - The day
 * @param hours - The hour in 24 hour format
 * @param minutes - The minute
 * @param seconds - The second
 * @param ms - The millisecond
 * @param timeZone - The time zone
 * @returns The new UTC date
 *
 * @example
 * ```js
 * // February 20, 2026 23:00:00 in America/New_York is February 21, 2026 04:00:00 UTC
 * newTZDate({
 *   timeZone: 'America/New_York',
 *   year: 2026,
 *   month: 1,
 *   date: 20,
 *   hours: 23,
 *   minutes: 0,
 *   seconds: 0,
 * });
 * // returns new Date('2026-02-21T04:00:00Z')
 * ```
 */
export const newTZDate = ({
  timeZone,
  year,
  month,
  date = 1,
  hours = 0,
  minutes = 0,
  seconds = 0,
  ms = 0,
}: {
  timeZone: string;
  year: number;
  month: number;
  date?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  ms?: number;
}): Date => {
  // Create a new date object in the local time zone
  const localDate = new Date(year, month, date, hours, minutes, seconds, ms);
  // Get the offset in milliseconds between the local time zone and UTC. We pass the local date to account for DST.
  const offsetInMs = getTimezoneOffset(timeZone, localDate);
  // Convert the offset in milliseconds to hours
  const offsetInHours = offsetInMs / (60 * 60 * 1000);
  // Convert the hours to UTC by subtracting the offset in hours
  const newHours = (hours ?? 0) - offsetInHours;

  return new Date(Date.UTC(year, month, date, newHours, minutes, seconds, ms));
};
