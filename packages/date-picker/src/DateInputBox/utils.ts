import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { isUndefined } from 'lodash';

import { DateSegmentValue } from '../DateInputSegment';

import { DateSegmentsState } from './DateInputBox.types';

/**
 * Converts a date in the client's time zone to
 */
export const toTimeZone = (clientDate: Date | string, timeZone: string) => {
  const clientTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const utc = zonedTimeToUtc(clientDate, clientTz);
  const tz = utcToZonedTime(utc, timeZone);
  return tz;
};

/** Converts a date from a given time zone to the client's time zone */
export const toClientTimeZone = (
  sourceDate: Date | string,
  sourceTimeZone: string,
) => {
  const clientTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const utc = zonedTimeToUtc(sourceDate, sourceTimeZone);
  const client = utcToZonedTime(utc, clientTz);
  return client;
};

/** Constructs a date object from day, month, year segments */
export const newDateFromSegments = (
  segments: DateSegmentsState,
): Date | undefined => {
  if (segments && Object.values(segments).every(isValidSegment)) {
    const { day, month, year } = segments;
    return new Date(year, month - 1, day, 0, 0, 0);
  }
};

/**
 * Constructs a date string from day, month, year segments
 * @deprecated
 * */
export const constructDateString = (
  segments: DateSegmentsState,
): string | undefined => {
  if (segments && Object.values(segments).every(isValidSegment)) {
    const { day, month, year } = segments;

    return `${year}-${month}-${day}` + 'T00:00:00';
  }
};

export const isValidSegment = (segment?: DateSegmentValue) =>
  !isUndefined(segment) && !isNaN(Number(segment));
