import { DateType, LocaleString } from '@leafygreen-ui/date-utils';
import { getFormatPartsValues } from '../getFormatPartsValues';
import { hasDayPeriod } from '../hasDayPeriod';

/**
 * Formats a date to a time string in the given locale and time zone
 * @param date - The date to format
 * @param locale - The locale to format the date to
 * @param timeZone - The time zone to format the date to
 * @returns The formatted time string in the given locale and time zone
 *
 * @example
 * ```js
 * const formattedTimeString = getFormattedTimeString({
 *   date: new Date('2026-02-20T12:30:00Z'),
 *   locale: 'en-US',
 *   timeZone: 'America/New_York',
 * });
 * // '7:30:00 AM'
 */
export const getFormattedTimeString = ({
  date,
  locale,
  timeZone,
}: {
  date: DateType;
  locale: LocaleString;
  timeZone: string;
}) => {
  const { hour, minute, second, dayPeriod } = getFormatPartsValues({
    locale,
    timeZone,
    value: date,
  });

  if (hasDayPeriod(locale)) {
    return `${hour}:${minute}:${second} ${dayPeriod}`;
  }

  return `${hour}:${minute}:${second}`;
};
