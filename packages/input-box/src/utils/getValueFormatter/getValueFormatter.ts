import padStart from 'lodash/padStart';

import { isZeroLike } from '@leafygreen-ui/lib';

/**
 * If the value is any form of zero, we set it to an empty string
 * otherwise, pad the string with 0s, or trim it to n chars
 *
 * @param charsPerSegment - the number of characters per segment
 * @param allowZero - whether to allow zero-like values
 * @returns a value formatter function for the provided segment
 *   - @param val - the value to format (string, number, or undefined)
 *
 * @example
 * const formatter = getValueFormatter({ charsPerSegment: 2 });
 * formatter('0'); // ''
 * formatter('1'); // '1'
 * formatter('12'); // '12'
 * formatter('123'); // '23'
 *
 * const formatter = getValueFormatter({ charsPerSegment: 2, allowZero: true });
 * formatter('00'); // '00'
 * formatter('01'); // '01'
 * formatter('12'); // '12'
 * formatter('123'); // '23'
 */
export const getValueFormatter =
  ({
    charsPerSegment,
    allowZero = false,
  }: {
    charsPerSegment: number;
    allowZero?: boolean;
  }) =>
  (val: string | number | undefined) => {
    // If the value is empty, do not format it
    if (val === '') return '';

    // Return empty string for zero-like values when disallowed (e.g., '00')
    if (!allowZero && isZeroLike(val)) return '';

    // otherwise, pad the string with 0s, or trim it to n chars
    const padded = padStart(Number(val).toString(), charsPerSegment, '0');
    const trimmed = padded.slice(
      padded.length - charsPerSegment,
      padded.length,
    );

    return trimmed;
  };
