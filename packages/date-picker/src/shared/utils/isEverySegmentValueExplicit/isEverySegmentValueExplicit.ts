import { DateSegment, DateSegmentsState } from '../../types';
import { isExplicitSegmentValue } from '../isExplicitSegmentValue';

/**
 * Returns whether every segment's value is explicit and unambiguous
 * (see {@link isExplicitSegmentValue})
 */
export const isEverySegmentValueExplicit = (
  segments: DateSegmentsState,
): boolean => {
  return Object.entries(segments).every(([segment, value]) =>
    isExplicitSegmentValue(segment as DateSegment, value),
  );
};
