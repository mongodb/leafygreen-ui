import { SegmentRefs } from '../../hooks';

// TODO: git mv to input box utils and then export this in DatePickerInput

/**
 * Returns whether the given element is a segment
 */
// export const isElementInputSegment = (
//   element: HTMLElement,
//   segmentRefs: SegmentRefs,
// ): element is HTMLInputElement => {
//   const segmentsArray = Object.values(segmentRefs).map(
//     ref => ref.current,
//   ) as Array<HTMLElement | null>;
//   const isSegment = segmentsArray.includes(element);

//   return isSegment;
// };

/**
 * Returns whether the given element is a segment
 */
export const isElementInputSegment = <
  T extends Record<string, React.RefObject<HTMLInputElement>>,
>(
  element: HTMLElement,
  segmentRefs: T,
): element is HTMLInputElement => {
  const segmentsArray = Object.values(segmentRefs).map(
    ref => ref.current,
  ) as Array<HTMLElement | null>;
  const isSegment = segmentsArray.includes(element);
  return isSegment;
};
