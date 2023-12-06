import { DateSegmentsState } from '../../types';
import { isValidSegmentName } from '../isValidSegment';
import { isValidValueForSegment } from '../isValidValueForSegment';
import { newUTC } from '../newUTC';

/** Constructs a date object in UTC from day, month, year segments */
export const newDateFromSegments = (
  segments: DateSegmentsState,
): Date | undefined => {
  const isEverySegmentValid = Object.entries(segments).every(
    ([key, value]) =>
      isValidSegmentName(key) && isValidValueForSegment(key, value),
  );

  if (isEverySegmentValid) {
    const { day, month, year } = segments;
    const newDate = newUTC(Number(year), Number(month) - 1, Number(day));
    // If day > daysInMonth, then the month will roll-over
    const isCorrectMonth = newDate.getUTCMonth() === Number(month) - 1;

    if (isCorrectMonth) {
      return newDate;
    }
  }
};
