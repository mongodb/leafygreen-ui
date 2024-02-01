import { addMilliseconds } from 'date-fns';
import { getTimezoneOffset } from 'date-fns-tz';

import { getISODate } from '../getISODate';
import { isValidDate } from '../isValidDate';
import { DateType } from '../types';

export const getISODateTZ = (date: DateType, timeZone: string) => {
  const offsetMs = getTimezoneOffset(timeZone);

  if (!isValidDate(date) || isNaN(offsetMs)) return getISODate(date);

  // a date object that, when printed in ISO format,
  // _looks like_ the local time for the given time zone.
  // e.g. given date = "2023-12-26T01:00Z" and timeZone = "America/New_York",
  // we get the date "2023-12-25T20:00Z" which _looks like_ the NYC local time (even though the date object technically incorrect)
  const zonedInUtc = addMilliseconds(date, offsetMs);

  return getISODate(zonedInUtc);
};
