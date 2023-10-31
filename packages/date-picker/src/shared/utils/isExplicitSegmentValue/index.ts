import { charsPerSegment } from '../../constants';
import { DateSegment, DateSegmentValue } from '../../hooks';
import { isValidValueForSegment } from '../isValidValueForSegment';

/**
 * Returns whether the provided value is an explicit, unique value for a given segment.
 * Contrast this with an ambiguous segment value:
 * Explicit: Day = 5, 02
 * Ambiguous: Day = 2 (could be 20-29)
 */
export const isExplicitSegmentValue = (
  segment: DateSegment,
  value: DateSegmentValue,
): boolean => {
  if (!isValidValueForSegment(segment, value)) return false;

  switch (segment) {
    case DateSegment.Day:
      return value.length === charsPerSegment.day || Number(value) >= 4;

    case DateSegment.Month:
      return value.length === charsPerSegment.month || Number(value) >= 2;

    case DateSegment.Year:
      return value.length === charsPerSegment.year;
  }
};
