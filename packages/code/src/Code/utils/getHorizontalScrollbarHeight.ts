/**
 * Get the height of the horizontal scrollbar of an element.
 * @param element The element to get the scrollbar height of.
 * @returns The height of the horizontal scrollbar.
 */
export function getHorizontalScrollbarHeight(element: HTMLElement): number {
  return element.offsetHeight - element.clientHeight;
}
