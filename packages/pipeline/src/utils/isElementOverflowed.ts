/**
 * Helper function to check whether a DOM element is overflowed.
 * @param element the element to check
 * @returns boolean true if the element is overflowing, false if not.
 */
export default function isElementOverflowed(element: HTMLElement): boolean {
  return (
    (element && element.scrollHeight > element.clientHeight) ||
    (element && element.scrollWidth > element.clientWidth)
  );
}
