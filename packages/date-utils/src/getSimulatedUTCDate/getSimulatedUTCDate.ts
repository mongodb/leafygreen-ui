import { addMilliseconds } from 'date-fns';
import { getTimezoneOffset } from 'date-fns-tz';

import { isValidDate } from '../isValidDate';

/**
 * The inverse of `getSimulatedTZDate`, returns a date object that _looks like_
 * the UTC representation when printed in the local time zone.
 *
 * e.g. given `date = "2023-12-25T01:00Z"` and `timeZone = "America/Los_Angeles"`,
 * by default using `date.toDateString` (or similar)
 * this would print the locale string:
 * "Sun Dec 24 2023"
 *
 * This function returns a modified, (technically incorrect) date object,
 * such that the function `date.toDateString` (or similar)
 * returns the locale string:
 * `Mon Dec 25 2023`
 */
export const getSimulatedUTCDate = (date: Date, timeZone?: string): Date => {
  timeZone = timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (!isValidDate(date)) return date;

  // Milliseconds offset between the given time zone & UTC
  const offsetMs = getTimezoneOffset(timeZone, date);
  if (isNaN(offsetMs)) return date;

  const simulatedUTC = addMilliseconds(date, -offsetMs);

  return simulatedUTC;
};
