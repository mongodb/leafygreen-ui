import { DescendantsList } from '../Descendants.types';

import { isElementPreceding } from './isElementPreceding';

/**
 * Finds the index of the registered descendant _immediately preceding_ the search element in the DOM,
 * and returns _one after_ that index.
 * (The element _after_ the element _before_ our search element, is our search element)
 *
 * e.g.:
 *
 * ```tsx
 * <div>A</div>
 * <div>B</div>
 * <span />
 * <div>C</div>
 * <div>D</div>

 * descendants = [<A>, <B>, <D>]
 *
 * findDOMIndex(<C>, descendants) // 2 (since <B> is the closest _tracked_ DOM node preceding <C>)
 * ```
 *
 * @internal
 */
export function findDOMIndex<T extends HTMLElement>(
  element: T,
  items: DescendantsList<T>,
): number {
  if (!element) return -1;
  if (items.length === 0) return 0;

  // Loop through items (backwards for performance),
  // and check whether the element is before or after the current item

  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];
    const currElem = item.element;
    if (!item) continue;

    if (currElem === element) return i;

    const isCurrentElementBeforeSearchElement = isElementPreceding(
      currElem,
      element,
    );

    if (isCurrentElementBeforeSearchElement) {
      return i + 1;
    }
  }

  return 0;
}
