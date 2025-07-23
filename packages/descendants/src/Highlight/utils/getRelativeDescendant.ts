// import { isDefined } from '@leafygreen-ui/lib';

import {
  Descendant,
  DescendantsList,
  getDescendantByIndex,
  isDescendantsSet,
} from '../../Descendants';

/**
 * Returns the `Descendant` object that is `delta` elements away from the `current` Descendant.
 *
 * e.g. `getRelativeDescendant(1, ...)` will return the _next_ Descendant in the list
 */
export const getRelativeDescendant = <T extends HTMLElement>(
  delta: number,
  current: Descendant<T> | undefined,
  descendants: DescendantsList<T>,
  filter?: (d: Descendant<T>) => boolean,
): Descendant<T> | undefined => {
  // If descendants is not set then we don't mutate the index
  if (!isDescendantsSet(descendants)) {
    return current;
  }

  if (delta === 0) return current;

  // If there is no current descendant,
  // then we set current to be the first index
  current = current ?? descendants[0];
  const currentIndex = current.index;

  let nextIndex = getRelativeIndex(delta, currentIndex, descendants.length);
  let nextDescendant = getDescendantByIndex(nextIndex, descendants);

  // Get the first descendant that matches the rules passed in
  while (nextDescendant && filter && !filter(nextDescendant)) {
    const dir = delta / Math.abs(delta); // 1 or -1
    nextIndex = getRelativeIndex(dir, nextIndex, descendants.length);
    nextDescendant = getDescendantByIndex(nextIndex, descendants);
  }

  return nextDescendant;
};

/**
 * Returns the `index` of the element in the list that is `delta` away from the `currentIndex`,
 * including wrapping
 *
 * e.g. `getRelativeIndex(1, 3, 6)` will return `4`.
 * e.g. `getRelativeIndex(1, 3, 4)` will return `0`, since the indexes will wrap around to 0 after hitting `totalItems`
 */
export function getRelativeIndex(
  delta: number,
  currentIndex: number,
  totalItems: number,
): number {
  if (delta > 0) {
    return (currentIndex + delta) % totalItems;
  } else if (delta < 0) {
    return (currentIndex + delta + totalItems) % totalItems;
  } else return 0;
}
