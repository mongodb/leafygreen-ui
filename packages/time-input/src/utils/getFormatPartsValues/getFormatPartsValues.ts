import { DateType, isValidDate } from '@leafygreen-ui/date-utils';

import { TimeParts } from '../../shared.types';
import { getFilteredTimeParts } from '../getFilteredTimeParts/getFilteredTimeParts';
import { getFormattedTimeParts } from '../getFormattedTimeParts/getFormattedTimeParts';
import { getFormatter } from '../getFormatter/getFormatter';

/**
 * Returns the format parts values for the given locale, time zone, and value.
 * @param locale - The locale to get the format parts values for
 * @param timeZone - The time zone to get the format parts values for
 * @param value - The value to get the format parts values for
 * @returns The format parts values
 *
 * @example
 * ```js
 * getFormatPartsValues({
 *   locale: 'en-US',
 *   timeZone: 'America/New_York',
 *   value: new Date('2025-01-01T12:00:00Z'),
 * });
 * // returns: { hour: '12', minute: '00', second: '00', month: '01', day: '01', year: '2025', dayPeriod: 'PM' }
 * ```
 */
export const getFormatPartsValues = ({
  locale,
  timeZone,
  value,
}: {
  locale: string;
  timeZone: string;
  value: DateType | undefined;
}): TimeParts => {
  const isValueValid = isValidDate(value);

  // Get the formatter that returns day, month, year, hour, minute, and second for the given locale and time zone.
  const formatter = getFormatter({
    locale,
    withDate: true,
    withTime: isValueValid, // if the value is not valid then we don't want to return hour, minute, and second but we still want to return day, month, and year.
    options: {
      timeZone,
    },
  });

  // This returns the day, month, year, hour, minute, and second based on the value.
  const timeParts = formatter?.formatToParts(isValueValid ? value : new Date());
  const filteredTimeParts = getFilteredTimeParts({ timeParts });
  // this adds a default value for the day period if it is not present. It's not necessary for 24h format locales but we add it for consistency.
  const formattedTimeParts = getFormattedTimeParts(filteredTimeParts);

  return formattedTimeParts;
};
