import { SupportedLocales } from '@leafygreen-ui/date-utils';
import { getFormatter } from '../getFormatter/getFormatter';

/**
 * Checks if the locale has a day period (AM/PM)
 *
 * @param locale - The locale to check
 * @returns Whether the locale has a day period (AM/PM)
 *
 * @example
 * ```js
 * hasDayPeriod('en-US'); // true
 * hasDayPeriod('en-GB'); // false
 * hasDayPeriod('iso-8601'); // false
 * ```
 */
export const hasDayPeriod = (locale: string) => {
  // If the locale is ISO_8601, return false
  if (locale === SupportedLocales.ISO_8601) return false;

  const formatter = getFormatter({ locale });

  // Format a sample time and check for dayPeriod (AM/PM)
  const parts = formatter?.formatToParts(new Date());
  const hasDayPeriod = parts?.some(part => part.type === 'dayPeriod');

  return hasDayPeriod;
};
