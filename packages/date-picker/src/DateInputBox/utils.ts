import { useEffect, useState } from 'react';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

import { consoleOnce } from '@leafygreen-ui/lib';

import { isValidLocale } from '../utils/isValidLocale';

import { DateSegmentsState } from './DateInputBox.types';

/**
 * Hook that returns an Intl.DateTimeFormat object for the provided format string
 */
export const useFormatter = (format: string, timeZone?: string) => {
  const [formatter, setFormatter] = useState<Intl.DateTimeFormat | undefined>(
    isValidLocale(format) ? Intl.DateTimeFormat(format) : undefined,
  );

  useEffect(() => {
    if (isValidLocale(format)) {
      setFormatter(Intl.DateTimeFormat(format, { timeZone }));
    } else {
      consoleOnce.error('Invalid dateFormat', format);
    }
  }, [format, timeZone]);

  return formatter;
};

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

/** Constructs a date string from day, month, year segments */
export const constructDateString = ({ day, month, year }: DateSegmentsState) =>
  `${Number(year)}-${Number(month)}-${Number(day)}` + 'T00:00:00';
