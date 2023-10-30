import padStart from 'lodash/padStart';

import { DateSegment } from '../../hooks';
import { charsPerSegment } from '../../shared/DateInput/DateInputSegment/constants';
import { isZeroLike } from '../isZeroLike';

export const getValueFormatter =
  (segment: DateSegment) => (val: string | number | undefined) => {
    // If the value is any form of zero, we set it to an empty string
    if (isZeroLike(val)) return '';

    // otherwise, pad the string with 0s, or trim it to n chars

    const padded = padStart(
      Number(val).toString(),
      charsPerSegment[segment],
      '0',
    );
    const trimmed = padded.slice(
      padded.length - charsPerSegment[segment],
      padded.length,
    );

    return trimmed;
  };
