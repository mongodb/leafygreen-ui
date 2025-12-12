import {
  getSegmentToFocus,
  GetSegmentToFocusProps,
  SegmentRefsType,
} from '../getSegmentToFocus/getSegmentToFocus';

interface FocusAndSelectSegmentProps<SegmentRefs extends SegmentRefsType>
  extends GetSegmentToFocusProps<SegmentRefs> {}

/**
 * Helper function that focuses and selects the appropriate input segment
 * given an event target and segment refs.
 *
 * This is a convenience wrapper around `getSegmentToFocus` that also
 * calls `.focus()` and `.select()` on the returned element.
 *
 * @param target - The target element from the event
 * @param formatParts - The format parts of the date/time
 * @param segmentRefs - The segment refs
 *
 * @example
 * const handleInputClick = (e: MouseEvent) => {
 *   focusAndSelectSegment({
 *     target: e.target,
 *     formatParts,
 *     segmentRefs,
 *   });
 * };
 */
export const focusAndSelectSegment = <SegmentRefs extends SegmentRefsType>({
  target,
  formatParts,
  segmentRefs,
}: FocusAndSelectSegmentProps<SegmentRefs>): void => {
  const segmentToFocus = getSegmentToFocus({
    target,
    formatParts,
    segmentRefs,
  });

  segmentToFocus?.focus();
  segmentToFocus?.select();
};
