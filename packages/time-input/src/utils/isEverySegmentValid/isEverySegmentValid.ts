import { isValidValueForSegment } from '@leafygreen-ui/input-box';

import { TimeSegment, TimeSegmentsState } from '../../shared.types';
import { getDefaultMax } from '../getDefaultMax';
import { getDefaultMin } from '../getDefaultMin';

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
  const defaultMinValues = getDefaultMin({ is12HourFormat });
  const defaultMaxValues = getDefaultMax({ is12HourFormat });

  const isEverySegmentValid = (
    Object.entries(segments) as Array<[TimeSegment, string]>
  ).every(([segment, value]) => {
    const isSegmentValid = isValidValueForSegment({
      segment: segment,
      value: value,
      defaultMin: defaultMinValues[segment],
      defaultMax: defaultMaxValues[segment],
      segmentEnum: TimeSegment,
    });

    return isSegmentValid;
  });

  return isEverySegmentValid;
};
