import { addMilliseconds } from 'date-fns';
import { getTimezoneOffset } from 'date-fns-tz';

import { isValidDate } from '../isValidDate';

/**
 * Returns a date object that _looks like_ the local time
 * for the given time zone when printed in ISO format.
 *
 * e.g. given `date = "2023-12-25T01:00Z"` and `timeZone = "America/Los_Angeles"`,
 * we get a date with the ISO date stamp `"2023-12-24T17:00Z"`,
 * which _looks like_ the LA local time,
 * (though the date object technically incorrect).
 */
export const getSimulatedTZDate = (date: Date, timeZone: string): Date => {
  if (!isValidDate(date)) return date;

  // Milliseconds offset between the given time zone & UTC
  const offsetMs = getTimezoneOffset(timeZone, date);
  if (isNaN(offsetMs)) return date;

  const zonedInUtc = addMilliseconds(date, offsetMs);
  return zonedInUtc;
};
