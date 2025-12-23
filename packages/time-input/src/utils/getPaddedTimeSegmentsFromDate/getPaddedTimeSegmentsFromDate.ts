import { DateType, LocaleString } from '@leafygreen-ui/date-utils';

import { TimeSegmentsState } from '../../shared.types';
import { getFormatPartsValues } from '../getFormatPartsValues/getFormatPartsValues';

import { getPaddedTimeSegments } from './getPaddedTimeSegments/getPaddedTimeSegments';

/**
 * Gets the formatted time segments from a date
 *
 * @param date - The date to get the formatted time segments from
 * @param locale - The locale to use
 * @param timeZone - The time zone to use
 * @returns The formatted time segments
 *
 * @example
 * ```js
 * getPaddedTimeSegmentsFromDate(new Date('2025-01-01T12:00:00Z'), 'en-US', 'America/New_York');
 * // returns: { hour: '12', minute: '00', second: '00' }
 * ```
 */
export const getPaddedTimeSegmentsFromDate = (
  date: DateType,
  locale: LocaleString,
  timeZone: string,
): TimeSegmentsState => {
  const { hour, minute, second } = getFormatPartsValues({
    locale,
    timeZone,
    value: date,
  });

  return getPaddedTimeSegments({ hour, minute, second });
};
