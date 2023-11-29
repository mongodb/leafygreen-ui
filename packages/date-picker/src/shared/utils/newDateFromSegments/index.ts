import { DateSegmentsState } from '../../hooks';
import { isValidSegmentName, isValidSegmentValue } from '../isValidSegment';
import { isValidValueForSegment } from '../isValidValueForSegment';
import { newUTC } from '../newUTC';

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
    return newUTC(Number(year), Number(month) - 1, Number(day));
  }
};
