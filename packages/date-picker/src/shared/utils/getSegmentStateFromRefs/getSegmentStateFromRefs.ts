import { SegmentRefs } from '../../hooks';
import { DateSegmentsState } from '../../types';

export const getSegmentStateFromRefs = (
  refs: SegmentRefs,
): DateSegmentsState => {
  return {
    day: refs.day.current?.value ?? '',
    month: refs.month.current?.value ?? '',
    year: refs.year.current?.value ?? '',
  };
};
