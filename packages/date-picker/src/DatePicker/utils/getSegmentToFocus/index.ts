import isUndefined from 'lodash/isUndefined';
import last from 'lodash/last';

import { DatePickerContextProps } from '../../../DatePickerContext';
import { DateSegment } from '../../../hooks/useDateSegments';
import { SegmentRefs } from '../../../hooks/useSegmentRefs';

interface FocusRelevantSegmentArgs {
  target: EventTarget;
  formatParts: DatePickerContextProps['formatParts'];
  segmentRefs: SegmentRefs; //| Array<SegmentRefs>;
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
}: FocusRelevantSegmentArgs): HTMLElement | undefined | null => {
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
      const emptySegmentKeys = formatSegments
        .map(p => p.type)
        .filter(type => {
          const element = segmentRefs[type as DateSegment];
          return !element?.current?.value;
        });
      const firstEmptySegmentKey = emptySegmentKeys[0] as DateSegment;
      const firstEmptySegmentRef = segmentRefs[firstEmptySegmentKey];
      return firstEmptySegmentRef.current;
    }
  }

  // otherwise, we clicked a specific segment,
  // so we focus on that segment (default behavior)
  return target as HTMLInputElement;
};
