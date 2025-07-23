import { isSameTZDay } from '../isSameTZDay';

/**
 * Returns whether a given date object is the same as today in a given time zone
 *
 * E.g.
 * The client is in NYC;
 * It's 10pm on Dec. 25th, 2023 (`"2023-12-26T00:00Z"`)
 *
 * ```js
 * isTodayTz("2023-12-25", "America/New_York") //true
 * isTodayTz("2023-12-25", "Pacific/Honolulu") //true
 * isTodayTz("2023-12-25", "Europe/London") // false
 * isTodayTz("2023-12-25", "Pacific/Auckland") // false
 * ```
 */
export const isTodayTZ = (utcDay: Date, timeZone: string) => {
  const clientNow = new Date(Date.now());
  return isSameTZDay(clientNow, utcDay, timeZone);
};
