import { DescendantsList } from '@leafygreen-ui/descendants';
import { isDefined } from '@leafygreen-ui/lib';

import type { Direction, Index } from '../highlight';

import { isDescendantsSet } from './isDescendantsSet';

/**
 * Computes the next index given a direction
 */
// prettier-ignore
function getNewIndex(direction: Direction, currentIndex: number, totalItems: number): number;
// prettier-ignore
function getNewIndex(direction: Direction, currentIndex: undefined, totalItems: number): undefined;
// prettier-ignore
function getNewIndex(direction: Direction, currentIndex: Index, totalItems: number): Index {
  if (!isDefined(currentIndex)) return currentIndex;

  switch (direction) {
    case 'next':
      return (currentIndex + 1) % totalItems;
    case 'prev':
      return (currentIndex - 1 + totalItems) % totalItems;
    case 'last':
      return totalItems - 1;
    case 'first':
    default:
      return 0;
  }
}

/**
 * Finds the index of the subsequent `enabled` descendant element
 */
function getEnabledIndex(
  direction: Direction,
  currentIndex: number,
  descendants: DescendantsList<HTMLElement>,
): Index {
  // If all descendants are disabled, then we skip this step
  if (descendants.every(d => d.props.disabled)) {
    return undefined;
  }

  let updatedIndex = getNewIndex(direction, currentIndex, descendants.length);
  let item = descendants[updatedIndex];

  // If the subsequent item is disabled,
  // keep searching in that direction for an enabled one
  while (item.props.disabled) {
    // If the first/last item is disabled
    // start the search in the forward/backward direction
    const nextDirection: Direction = (() => {
      switch (direction) {
        case 'first':
          return 'next';
        case 'last':
          return 'prev';
        default:
          return direction;
      }
    })();
    updatedIndex = getNewIndex(nextDirection, updatedIndex, descendants.length);
    item = descendants[updatedIndex];
  }

  return updatedIndex;
}

export const getUpdatedIndex = (
  direction: Direction,
  currentIndex: Index,
  descendants: DescendantsList<HTMLElement>,
): Index => {
  // If descendants is not set
  // then we don't mutate the index
  if (!isDescendantsSet(descendants)) {
    return currentIndex;
  }

  const updatedIndex = getEnabledIndex(
    direction,
    currentIndex ?? 0,
    descendants,
  );

  return updatedIndex;
};
