import { addMilliseconds } from 'date-fns';
import { getTimezoneOffset } from 'date-fns-tz';

import { isSameUTCDay } from '../isSameUTCDay';

/**
 *
 * Returns whether the `zonedTime`, in a given `timeZone`,
 * has the same date as the provided UTC date
 *
 * e.g.
 * ```js
 * isSameTZDay(
 *  Date("2023-12-26T01:00Z"), // 11:00 on Dec. 25 in NYC
 *  Date("2023-12-25T00:00Z"), // 00:00 on Dec. 25 2023 in UTC
 *  "America/New_York"
 * )
 * // Returns true
 * ```
 *
 * @param zoned A Date object presumed to be in `timeZone`
 * @param utc A UTC Date object
 * @param timeZone An IANA timeZone string
 */
export const isSameTZDay = (
  zoned: Date,
  utc: Date,
  timeZone: string,
): boolean => {
  // Milliseconds offset between the given time zone & UTC
  const offsetMs = getTimezoneOffset(timeZone, zoned);
  if (isNaN(offsetMs)) return false;

  // a date object that, when printed in ISO format,
  // _looks like_ the local time for the given time zone.
  // e.g. given zoned = "2023-12-26T01:00Z" and timeZone = "America/New_York",
  // we get the date "2023-12-25T20:00Z" which _looks like_ the NYC local time (even though the date object technically incorrect)
  const zonedInUtc = addMilliseconds(zoned, offsetMs);

  // We then use this date object to check if it's the same day as the provided utc date
  // e.g. is "2023-12-25T20:00Z" the same day as "2023-12-25T00:00Z"?
  const isSameDay = isSameUTCDay(utc, zonedInUtc);

  return isSameDay;
};
