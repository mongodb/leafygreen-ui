import { charsPerSegment } from '../../constants';
import { DateSegment } from '../../types';

/**
 * Returns the maxLength of a segment
 */
export const getSegmentMaxLength = (segment: DateSegment): number => {
  switch (segment) {
    case DateSegment.Day:
      return charsPerSegment.day;

    case DateSegment.Month:
      return charsPerSegment.month;

    case DateSegment.Year:
      return charsPerSegment.year;
  }
};
