import { inRange } from 'lodash';

import { defaultMax, defaultMin } from '../../constants';
import { DateSegment, DateSegmentValue } from '../../hooks';
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
    return isValidSegmentAndValue;
  }

  const isInRange = inRange(
    Number(value),
    defaultMin[segment],
    defaultMax[segment] + 1,
  );

  return isValidSegmentAndValue && isInRange;
};
