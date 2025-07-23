import { getSimulatedTZDate } from '../getSimulatedTZDate';
import { isSameUTCDay } from '../isSameUTCDay';
import { isValidDate } from '../isValidDate';
import { DateType } from '../types';

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
  zoned: DateType,
  utc: DateType,
  timeZone: string,
): boolean => {
  if (!(isValidDate(zoned) && isValidDate(utc))) return false;

  // Get a date object that _looks_ like the zoned date when rendered in ISO format
  const simulatedTZDate = getSimulatedTZDate(zoned, timeZone);

  // We then use this date object to check if it's the same day as the provided utc date
  // e.g. is "2023-12-25T20:00Z" the same day as "2023-12-25T00:00Z"?
  const isSameDay = isSameUTCDay(utc, simulatedTZDate);

  return isSameDay;
};
