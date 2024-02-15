import inRange from 'lodash/inRange';

import { defaultMax, defaultMin } from '../../constants';
import { DateSegment, DateSegmentValue } from '../../types';
import { isValidSegmentName, isValidSegmentValue } from '../isValidSegment';

/**
 * Returns whether a value is valid for a given segment type
 */
export const isValidValueForSegment = (
  segment: DateSegment,
  value: DateSegmentValue,
): boolean => {
  const isValidSegmentAndValue =
    isValidSegmentValue(value) && isValidSegmentName(segment);

  if (segment === 'year') {
    // allow any 4-digit year value regardless of defined range
    return isValidSegmentAndValue && inRange(Number(value), 1000, 9999 + 1);
  }

  const isInRange = inRange(
    Number(value),
    defaultMin[segment],
    defaultMax[segment] + 1,
  );

  return isValidSegmentAndValue && isInRange;
};
