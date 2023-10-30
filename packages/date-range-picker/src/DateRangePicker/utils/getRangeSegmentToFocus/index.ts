import isUndefined from 'lodash/isUndefined';
import last from 'lodash/last';

import { DateSegment, SegmentRefs } from '@leafygreen-ui/date-picker/hooks';
import { DatePickerContextProps } from '@leafygreen-ui/date-picker/shared/DatePickerContext';
import { getFirstEmptySegment } from '@leafygreen-ui/date-picker/utils';

interface GetRangeSegmentToFocusProps {
  target: EventTarget;
  formatParts: DatePickerContextProps['formatParts'];
  segmentRefs: [SegmentRefs, SegmentRefs];
}

/** Returns the range segment to focus on when the input is clicked */
export const getRangeSegmentToFocus = ({
  target,
  formatParts,
  segmentRefs: [startSegmentRefs, endSegmentRefs],
}: GetRangeSegmentToFocusProps): HTMLElement | undefined | null => {
  if (
    isUndefined(target) ||
    isUndefined(formatParts) ||
    isUndefined(startSegmentRefs) ||
    isUndefined(endSegmentRefs)
  ) {
    return;
  }

  const startSegmentsArray = Object.values(startSegmentRefs).map(
    r => r.current,
  );
  const endSegmentsArray = Object.values(endSegmentRefs).map(r => r.current);
  const segmentRefsArray = [...startSegmentsArray, ...endSegmentsArray];

  const isTargetASegment = segmentRefsArray.includes(
    target as HTMLInputElement,
  );

  if (!isTargetASegment) {
    const formatSegments = formatParts.filter(part => part.type !== 'literal');
    const allSegmentsFilled = segmentRefsArray.every(el => el?.value);

    if (allSegmentsFilled) {
      const lastSegmentPart = last(formatSegments) as Intl.DateTimeFormatPart;
      const keyOfLastSegment = lastSegmentPart.type as DateSegment;
      const lastSegmentRef = endSegmentRefs[keyOfLastSegment];
      return lastSegmentRef.current;
    } else {
      const allStartSegmentsFilled = startSegmentsArray.every(el => el?.value);

      if (allStartSegmentsFilled) {
        return getFirstEmptySegment({
          formatParts,
          segmentRefs: endSegmentRefs,
        });
      } else {
        return getFirstEmptySegment({
          formatParts,
          segmentRefs: startSegmentRefs,
        });
      }
    }
  }
};
