import { DateSegment, DateSegmentsState } from '../../types';
import { isValidValueForSegment } from '../isValidValueForSegment';

/**
 * Whether every segment in a {@link DateSegmentsState} object is valid
 */
export const isEverySegmentValid = (segments: DateSegmentsState): boolean => {
  return Object.entries(segments).every(([segment, value]) =>
    isValidValueForSegment(segment as DateSegment, value),
  );
};
