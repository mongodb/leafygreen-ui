import { getSimulatedTZDate } from '../getSimulatedTZDate';
import { isSameUTCMonth } from '../isSameUTCMonth';
import { isValidDate } from '../isValidDate';
import { DateType } from '../types';

/**
 * Returns whether the `zonedTime`, in a given `timeZone`,
 * has the same date as the provided UTC date,
 *
 *  * e.g.
 * ```js
 * isSameTZDay(
 *  Date("2023-11-01T01:00Z"), // Nov. 1 UCT, but 11:00 on Oct. 31 in NYC
 *  Date("2023-10-31T00:00Z"), // 00:00 on Oct 31 2023 in UTC
 *  "America/New_York"
 * )
 * // Returns `true`
 */
export const isSameTZMonth = (
  zoned: DateType,
  utc: DateType,
  timeZone: string,
) => {
  if (!(isValidDate(zoned) && isValidDate(utc))) return false;

  // Get a date object that _looks_ like the zoned date when rendered in ISO format
  const simulatedTZDate = getSimulatedTZDate(zoned, timeZone);

  const isSameMonth = isSameUTCMonth(utc, simulatedTZDate);
  return isSameMonth;
};
