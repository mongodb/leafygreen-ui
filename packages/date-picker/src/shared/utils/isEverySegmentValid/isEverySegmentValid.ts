import inRange from 'lodash/inRange';

import { isValidValueForSegment } from '@leafygreen-ui/input-box';

import { defaultMax, defaultMin } from '../../constants';
import { DateSegment, DateSegmentsState, DateSegmentValue } from '../../types';

/**
 * Whether every segment in a {@link DateSegmentsState} object is valid
 */
export const isEverySegmentValid = (segments: DateSegmentsState): boolean => {
  return Object.entries(segments).every(([segment, value]) =>
    isValidValueForSegment({
      segment: segment as DateSegment,
      value: value as DateSegmentValue,
      defaultMin: defaultMin[segment as DateSegment],
      defaultMax: defaultMax[segment as DateSegment],
      segmentEnum: DateSegment,
      customValidation:
        // allow any 4-digit year value regardless of defined min/max ranges
        segment === DateSegment.Year
          ? (value: DateSegmentValue) => inRange(Number(value), 1000, 9999 + 1)
          : undefined,
    }),
  );
};
