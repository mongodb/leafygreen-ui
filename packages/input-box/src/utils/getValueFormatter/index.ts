import padStart from 'lodash/padStart';

import { isZeroLike } from '@leafygreen-ui/lib';

/**
 * If the value is any form of zero, we set it to an empty string
 * otherwise, pad the string with 0s, or trim it to n chars
 *
 * @param charsPerSegment - the number of characters per segment
 * @param val - the value to format
 * @returns a value formatter function for the provided segment
 *
 * @example
 * const charsPerSegment = {
 *   day: 2,
 *   month: 2,
 *   year: 4,
 * };
 * const formatter = getValueFormatter(charsPerSegment['day']);
 * formatter('0'); // ''
 * formatter('1'); // '01'
 * formatter('12'); // '12'
 * formatter('123'); // '23'
 */
export const getValueFormatter =
  (charsPerSegment: number) => (val: string | number | undefined) => {
    // If the value is any form of zero, we set it to an empty string
    if (isZeroLike(val)) return '';

    // otherwise, pad the string with 0s, or trim it to n chars

    const padded = padStart(Number(val).toString(), charsPerSegment, '0');
    const trimmed = padded.slice(
      padded.length - charsPerSegment,
      padded.length,
    );

    return trimmed;
  };
