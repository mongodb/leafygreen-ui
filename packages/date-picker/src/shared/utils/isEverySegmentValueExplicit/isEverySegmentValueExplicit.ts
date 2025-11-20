import { createExplicitSegmentValidator } from '@leafygreen-ui/input-box';

import { dateSegmentRules } from '../../constants';
import { DateSegment, DateSegmentsState } from '../../types';

/**
 * Returns whether the provided value is an explicit, unique value for a given segment.
 * Contrast this with an ambiguous segment value:
 * Explicit: Day = 5, 02
 * Ambiguous: Day = 2 (could be 20-29)
 */
export const isExplicitSegmentValue = createExplicitSegmentValidator({
  segmentEnum: DateSegment,
  rules: dateSegmentRules,
});

/**
 * Returns whether every segment's value is explicit and unambiguous
 * (see {@link isExplicitSegmentValue})
 */
export const isEverySegmentValueExplicit = (
  segments: DateSegmentsState,
): boolean => {
  return Object.entries(segments).every(([segment, value]) =>
    isExplicitSegmentValue({ segment: segment as DateSegment, value }),
  );
};
