import { isValidValueForSegment } from '@leafygreen-ui/input-box';

import { getDefaultMax, getDefaultMin } from '../../constants';
import { TimeSegment } from '../../shared.types';
import { TimeSegmentsState } from '../../shared.types';

/**
 * Checks if every segment is valid
 *
 * @param segments - The segments to check
 * @param is12HourFormat - Whether the time is in 12 hour format
 * @returns Whether every segment is valid
 */
export const isEverySegmentValid = ({
  segments,
  is12HourFormat,
}: {
  segments: TimeSegmentsState;
  is12HourFormat: boolean;
}) => {
  const isEverySegmentValid = Object.entries(segments).every(
    ([segment, value]) => {
      const isSegmentValid = isValidValueForSegment({
        segment: segment as TimeSegment,
        value: value as string,
        defaultMin: getDefaultMin({ is12HourFormat })[segment as TimeSegment],
        defaultMax: getDefaultMax({ is12HourFormat })[segment as TimeSegment],
        segmentEnum: TimeSegment,
      });

      return isSegmentValid;
    },
  );

  return isEverySegmentValid;
};
