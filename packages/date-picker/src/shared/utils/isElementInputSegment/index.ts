import { SegmentRefs } from '../../hooks';

/**
 * Returns whether the given element is a segment
 */
export const isElementInputSegment = (
  element: HTMLElement,
  segmentRefs: SegmentRefs,
): element is HTMLInputElement => {
  const segmentsArray = Object.values(segmentRefs).map(
    ref => ref.current,
  ) as Array<HTMLElement | null>;
  const isSegment = segmentsArray.includes(element);

  return isSegment;
};
