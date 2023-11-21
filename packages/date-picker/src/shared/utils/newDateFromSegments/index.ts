import { DateSegmentsState } from '../../hooks';
import { isValidSegmentName, isValidSegmentValue } from '../isValidSegment';
import { isValidValueForSegment } from '../isValidValueForSegment';

/** Constructs a date object in UTC from day, month, year segments */
export const newDateFromSegments = (
  segments: DateSegmentsState,
): Date | undefined => {
  if (
    segments &&
    Object.entries(segments).every(
      ([key, value]) =>
        isValidSegmentName(key) &&
        isValidSegmentValue(value) &&
        isValidValueForSegment(key, value),
    )
  ) {
    const { day, month, year } = segments;
    return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  }
};
