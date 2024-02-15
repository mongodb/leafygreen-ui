import { SegmentRefs } from '../../hooks';
import { DateSegmentsState } from '../../types';

/**
 * Returns a {@link DateSegmentsState} object given a {@link SegmentRefs} Ref object
 */
export const getSegmentStateFromRefs = (
  refs: SegmentRefs,
): DateSegmentsState => {
  return {
    day: refs.day.current?.value ?? '',
    month: refs.month.current?.value ?? '',
    year: refs.year.current?.value ?? '',
  };
};
