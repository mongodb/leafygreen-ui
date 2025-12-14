import { createExplicitSegmentValidator } from '@leafygreen-ui/input-box';

import { getTimeSegmentRules } from '../../constants';
import { TimeSegment, TimeSegmentsState } from '../../shared.types';

export const isExplicitSegmentValue = (is12HourFormat: boolean) =>
  createExplicitSegmentValidator({
    segmentEnum: TimeSegment,
    rules: getTimeSegmentRules({ is12HourFormat }),
  });

/**
 * Returns whether every segment's value is explicit and unambiguous.
 * (see {@link isExplicitSegmentValue})
 */
export const isEverySegmentValueExplicit = ({
  segments,
  is12HourFormat,
}: {
  segments: TimeSegmentsState;
  is12HourFormat: boolean;
}): boolean => {
  return Object.entries(segments).every(([segment, value]) => {
    const isExplicit = isExplicitSegmentValue(is12HourFormat)({
      segment: segment as TimeSegment,
      value,
      allowZero: segment === TimeSegment.Hour ? !is12HourFormat : true,
    });

    return isExplicit;
  });
};
