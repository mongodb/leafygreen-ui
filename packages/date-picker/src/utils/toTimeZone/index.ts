import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

/**
 * Converts a date in the client's time zone to
 * @deprecated
 */
export const toTimeZone = (clientDate: Date | string, timeZone: string) => {
  const clientTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const utc = zonedTimeToUtc(clientDate, clientTz);
  const tz = utcToZonedTime(utc, timeZone);
  return tz;
};

/**
 * Converts a date from a given time zone to the client's time zone
 * @deprecated
 */
export const toClientTimeZone = (
  sourceDate: Date | string,
  sourceTimeZone: string,
) => {
  const clientTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const utc = zonedTimeToUtc(sourceDate, sourceTimeZone);
  const client = utcToZonedTime(utc, clientTz);
  return client;
};
