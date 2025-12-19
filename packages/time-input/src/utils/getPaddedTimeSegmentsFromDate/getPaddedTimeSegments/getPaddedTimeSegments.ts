import { getValueFormatter } from '@leafygreen-ui/input-box';

import { TimeSegmentsState } from '../../shared.types';

/**
 * Formats the time segments to a string with 2 digits for each segment.
 *
 * @param segments - The time segments to format
 * @returns The formatted time segments
 *
 * @example
 * ```js
 * getFormattedTimeSegments({ hour: '2', minute: '30', second: '0' });
 * // returns: { hour: '02', minute: '30', second: '00' }
 * ```
 */
export const getFormattedTimeSegments = (segments: TimeSegmentsState) => {
  const hour = getValueFormatter({ charsCount: 2, allowZero: true })(
    segments.hour,
  );
  const minute = getValueFormatter({ charsCount: 2, allowZero: true })(
    segments.minute,
  );
  const second = getValueFormatter({ charsCount: 2, allowZero: true })(
    segments.second,
  );
  return { hour, minute, second };
};
