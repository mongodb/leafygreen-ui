import { DateSegmentsState } from '../..//types';
import { isEverySegmentFilled } from '../isEverySegmentFilled';
import { isEverySegmentValid } from '../isEverySegmentValid';
import { newDateFromSegments } from '../newDateFromSegments';

/**
 * Returns whether the provided {@link DateSegmentsState} forms a valid date
 */
export const doSegmentsFormValidDate = (
  segments: DateSegmentsState,
): boolean => {
  const areAllFilled = isEverySegmentFilled(segments);
  const areAllValid = isEverySegmentValid(segments);

  if (areAllFilled && areAllValid) {
    const utcDate = newDateFromSegments(segments);
    return !!utcDate;
  }

  return false;
};
