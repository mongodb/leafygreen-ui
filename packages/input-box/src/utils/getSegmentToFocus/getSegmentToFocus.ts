import isUndefined from 'lodash/isUndefined';
import last from 'lodash/last';

import { getFirstEmptySegment } from '../getFirstEmptySegment/getFirstEmptySegment';

export type SegmentRefsType = Record<string, React.RefObject<HTMLInputElement>>;

interface GetSegmentToFocusProps<SegmentRefs extends SegmentRefsType> {
  target: EventTarget;
  formatParts: Array<Intl.DateTimeFormatPart>;
  segmentRefs: SegmentRefs;
}

/**
 * Helper function that focuses the appropriate input segment
 * given an event target and segment refs.
 *
 * 1) if the target was a segment, focus that segment
 * 2) otherwise, if all segments are filled, focus the last one
 * 3) but, if some segments are empty, focus the first empty one
 *
 * @param target - The target element
 * @param formatParts - The format parts of the date
 * @param segmentRefs - The segment refs
 * @returns The segment to focus
 * @example
 * const target = document.querySelector('input[data-segment="day"]');
 * const formatParts = [
 *   { type: 'year', value: '' },
 *   { type: 'month', value: '' },
 *   { type: 'day', value: '' },
 * ];
 * const segmentRefs = {
 *   year: { current: yearRef },
 *   month: { current: monthRef },
 *   day: { current: dayRef },
 * };
 * getSegmentToFocus({ target, formatParts, segmentRefs }); // yearRef.current
 */
export const getSegmentToFocus = <SegmentRefs extends SegmentRefsType>({
  target,
  formatParts,
  segmentRefs,
}: GetSegmentToFocusProps<SegmentRefs>):
  | HTMLInputElement
  | undefined
  | null => {
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
      const keyOfLastSegment = lastSegmentPart.type as keyof SegmentRefs; // this should be one of the keys of the segmentRefs
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
