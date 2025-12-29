import defaultsDeep from 'lodash/defaultsDeep';

import { defaultDateTimeParts } from '../../../constants';
import {
  DateTimePartKeys,
  DateTimePartKeysWithoutDayPeriod,
  DateTimeParts,
  DayPeriod,
} from '../../../shared.types';

/**
 * Returns the formatted date time parts.
 *
 * This merges the formatted date time parts with the default date time parts. E.g., when the component is uncontrolled, and the value is undefined, we set empty defaults for the hour, minute, and second.
 *
 * @param dateTimeParts - The date time parts to get the formatted and merged date time parts for
 * @returns The formatted and merged date time parts
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
  const formattedDateTimeParts = dateTimeParts.reduce((acc, part) => {
    if (part.type === 'dayPeriod') {
      acc.dayPeriod = part.value as DayPeriod;
    } else if (part.type in DateTimePartKeys) {
      acc[part.type as DateTimePartKeysWithoutDayPeriod] = part.value;
    }

    return acc;
  }, {} as DateTimeParts);

  const mergedTimeParts: DateTimeParts = defaultsDeep(
    formattedDateTimeParts,
    defaultDateTimeParts,
  );

  return mergedTimeParts;
};
