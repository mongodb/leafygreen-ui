/**
 * Returns whether the given element is a segment
 * @param element - The element to check
 * @param segmentObj - The segment object
 * @returns Whether the element is a segment
 * @example
 * // In the segmentRefs object, the key is the segment name and the value is the ref object
 * const segmentRefs = {
 *   day: { current: document.querySelector('input[data-segment="day"]') },
 *   month: { current: document.querySelector('input[data-segment="month"]') },
 *   year: { current: document.querySelector('input[data-segment="year"]') },
 * };
 * isElementInputSegment(document.querySelector('input[data-segment="day"]'), segmentRefs); // true
 * isElementInputSegment(document.querySelector('input[data-segment="month"]'), segmentRefs); // true
 * isElementInputSegment(document.querySelector('input[data-segment="year"]'), segmentRefs); // true
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
