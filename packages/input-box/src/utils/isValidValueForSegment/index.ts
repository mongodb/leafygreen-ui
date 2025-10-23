import inRange from 'lodash/inRange';

import { isValidSegmentName, isValidSegmentValue } from '../isValidSegment';

// TODO: move to generic utils

/**
 * Returns whether a value is valid for a given segment type
 */
export const isValidValueForSegment = <T extends string, V extends string>(
  segment: T,
  value: V,
  defaultMin: Record<T, number>,
  defaultMax: Record<T, number>,
  segmentObj: Readonly<Record<string, T>>,
): boolean => {
  const isValidSegmentAndValue =
    isValidSegmentValue(value) && isValidSegmentName(segmentObj, segment);

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
