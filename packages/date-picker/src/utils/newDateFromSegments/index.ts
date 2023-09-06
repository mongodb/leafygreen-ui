import { DateSegmentsState } from '../../DateInput';
import { isValidSegment } from '../isValidSegment';

/** Constructs a date object in UTC from day, month, year segments */
export const newDateFromSegments = (
  segments: DateSegmentsState,
): Date | undefined => {
  if (segments && Object.values(segments).every(isValidSegment)) {
    const { day, month, year } = segments;
    return new Date(
      Date.UTC(year as number, (month as number) - 1, day as number),
    );
  }
};
