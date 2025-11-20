import isUndefined from 'lodash/isUndefined';
import last from 'lodash/last';

import { SharedDatePickerContextProps } from '../../../shared/context';
import { SegmentRefs } from '../../../shared/hooks';
import { DateSegment } from '../../../shared/types';
import { getFirstEmptySegment } from '../../../shared/utils';

interface GetSegmentToFocusProps {
  target: EventTarget;
  formatParts: SharedDatePickerContextProps['formatParts'];
  segmentRefs: SegmentRefs;
}

/**
 * Helper function that focuses the appropriate input segment
 * given an event target and segment refs.
 *
 * 1) if the target was a segment, focus that segment
 * 2) otherwise, if all segments are filled, focus the last one
 * 3) but, if some segments are empty, focus the first empty one
 */
export const getSegmentToFocus = ({
  target,
  formatParts,
  segmentRefs,
}: GetSegmentToFocusProps): HTMLInputElement | undefined | null => {
  if (
    isUndefined(target) ||
    isUndefined(formatParts) ||
    isUndefined(segmentRefs)
  ) {
    return;
  }

  const segmentRefsArray = Object.values(segmentRefs).map(r => r.current);

  const isTargetASegment = segmentRefsArray.includes(
    target as HTMLInputElement,
  );

  // If we didn't explicitly click on an input segment...
  if (!isTargetASegment) {
    const allSegmentsFilled = segmentRefsArray.every(el => el?.value);
    // filter out the literals from the format parts
    const formatSegments = formatParts.filter(part => part.type !== 'literal');

    // Check which segments are filled,
    if (allSegmentsFilled) {
      // if all are filled, focus the last one,
      const lastSegmentPart = last(formatSegments) as Intl.DateTimeFormatPart;
      const keyOfLastSegment = lastSegmentPart.type as DateSegment;
      const lastSegmentRef = segmentRefs[keyOfLastSegment];
      return lastSegmentRef.current;
    } else {
      // if 1+ are empty, focus the first empty one
      return getFirstEmptySegment({
        formatParts,
        segmentRefs,
      });
    }
  }

  // otherwise, we clicked a specific segment,
  // so we focus on that segment (default behavior)
  return target as HTMLInputElement;
};
