import { createExplicitSegmentValidator } from '@leafygreen-ui/input-box';

import { TimeSegment, TimeSegmentsState } from '../../shared.types';
import { getTimeSegmentRules } from '../getTimeSegmentRules';

export const createExplicitTimeSegmentValidator = (is12HourFormat: boolean) =>
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
  const isExplicitSegmentValue =
    createExplicitTimeSegmentValidator(is12HourFormat);

  return (Object.entries(segments) as Array<[TimeSegment, string]>).every(
    ([segment, value]) => {
      const isExplicit = isExplicitSegmentValue({
        segment: segment,
        value,
        allowZero: segment === TimeSegment.Hour ? !is12HourFormat : true,
      });

      return isExplicit;
    },
  );
};
