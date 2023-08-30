import { DateSegmentsState } from '../../DateInputBox';
import { isValidSegment } from '../isValidSegment';

/** Constructs a date object from day, month, year segments */
export const newDateFromSegments = (
  segments: DateSegmentsState,
): Date | undefined => {
  if (segments && Object.values(segments).every(isValidSegment)) {
    const { day, month, year } = segments;
    return new Date(
      year as number,
      (month as number) - 1,
      day as number,
      0,
      0,
      0,
    );
  }
};
