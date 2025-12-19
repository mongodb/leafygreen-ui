import { DateType, isValidDate, LocaleString } from '@leafygreen-ui/date-utils';

import { DateTimeParts } from '../../shared.types';
import { getFormatter } from '../getFormatter/getFormatter';

import { getFormattedDateTimeParts } from './getFormattedDateTimeParts/getFormattedDateTimeParts';

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
  locale: LocaleString;
  timeZone: string;
  value: DateType | undefined;
}): DateTimeParts => {
  const isValueValid = isValidDate(value);

  // Get the formatter that returns day, month, year, hour, minute, and second for the given locale and time zone.
  const formatter = getFormatter({
    locale,
    options: {
      timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      // if the value is not valid then we don't want to return hour, minute, and second but we still want to return day, month, and year.
      ...(isValueValid
        ? {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          }
        : {}),
    },
  });

  // This returns the day, month, year, hour, minute, and second based on the value.
  const dateTimeParts = formatter?.formatToParts(
    isValueValid ? value : new Date(),
  );

  const filteredDateTimeParts =
    dateTimeParts?.filter(part => part.type !== 'literal') ?? [];

  // this adds a default value for the day period if it is not present. It's not necessary for 24h format locales but we add it for consistency.
  const formattedDateTimeParts = getFormattedDateTimeParts(
    filteredDateTimeParts,
  );

  return formattedDateTimeParts;
};
