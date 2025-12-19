import defaultsDeep from 'lodash/defaultsDeep';

import { defaultDateTimeParts } from '../../../constants';
import { DateTimePartKeys, DateTimeParts } from '../../../shared.types';

/**
 * Returns the formatted time parts.
 *
 * This merges the formatted time parts with the default time parts. E.g., when the component is uncontrolled, and the value is undefined, we set empty defaults for the hour, minute, and second.
 *
 * @param timeParts - The time parts to get the formatted and merged time parts for
 * @returns The formatted and merged time parts
 *
 * @example
 * ```js
 * getFormattedDateTimeParts([
 *   { type: 'day', value: '12' },
 *   { type: 'month', value: '01' },
 *   { type: 'year', value: '2025' },
 * ]);
 * // returns: {
 *  // day: '12',
 *  // month: '01',
 *  // year: '2025',
 *  // hour: '',
 *  // minute: '',
 *  // second: '',
 *  // dayPeriod: 'AM'
 * // }
 * ```
 */
export const getFormattedDateTimeParts = (
  dateTimeParts: Array<Intl.DateTimeFormatPart>,
): DateTimeParts => {
  const formattedDateTimeParts: DateTimeParts = dateTimeParts.reduce(
    (acc, part) => {
      acc[part.type as DateTimePartKeys] = part.value;
      return acc;
    },
    {} as DateTimeParts,
  );

  const mergedTimeParts: DateTimeParts = defaultsDeep(
    formattedDateTimeParts,
    defaultDateTimeParts,
  );

  return mergedTimeParts;
};
