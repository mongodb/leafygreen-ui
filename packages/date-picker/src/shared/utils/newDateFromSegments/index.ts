import { DateSegmentsState } from '../../hooks';
import { isValidSegment } from '../isValidSegment';

/** Constructs a date object in UTC from day, month, year segments */
export const newDateFromSegments = (
  segments: DateSegmentsState,
): Date | undefined => {
  if (segments && Object.values(segments).every(isValidSegment)) {
    const { day, month, year } = segments;
    return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  }
};
