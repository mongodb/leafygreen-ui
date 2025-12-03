import defaultsDeep from 'lodash/defaultsDeep';

import { defaultTimeParts } from '../../constants';
import { TimePartKeys, TimeParts } from '../../shared.types';

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
 * getFormattedTimeParts([
 *   { type: 'hour', value: '12' },
 *   { type: 'minute', value: '30' },
 *   { type: 'second', value: '00' },
 * ]);
 * // returns: { hour: '12', minute: '30', second: '00' }
 * ```
 */
export const getFormattedTimeParts = (
  timeParts: Array<Intl.DateTimeFormatPart>,
): TimeParts => {
  const formattedTimeParts: TimeParts = timeParts.reduce((acc, part) => {
    acc[part.type as TimePartKeys] = part.value;
    return acc;
  }, {} as TimeParts);

  const mergedTimeParts: TimeParts = defaultsDeep(
    formattedTimeParts,
    defaultTimeParts,
  );

  return mergedTimeParts;
};
