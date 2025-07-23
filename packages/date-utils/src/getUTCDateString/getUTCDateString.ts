import { getSimulatedUTCDate } from '../getSimulatedUTCDate';
import { isValidLocale } from '../isValidLocale';

interface GetUTCDateStringOptions {
  locale?: string;
}

/**
 * Returns a localized date string for the UTC representation of a date, regardless of system time zone
 *
 * e.g.
 * ```
 * getUTCDateString(
 *  Date("2023-12-25T01:00:00Z"),
 *  { locale: 'en-US' }
 * ) // "Monday, December 25, 2023"
 * ```
 */
export const getUTCDateString = (
  date: Date,
  options?: GetUTCDateStringOptions,
): string => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const dateInTZ = getSimulatedUTCDate(date, timeZone);

  const locale = isValidLocale(options?.locale)
    ? options?.locale
    : Intl.DateTimeFormat().resolvedOptions().locale;

  const utcDateString = dateInTZ.toLocaleDateString(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return utcDateString;
};
