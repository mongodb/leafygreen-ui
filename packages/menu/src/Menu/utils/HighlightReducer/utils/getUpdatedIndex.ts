import { DescendantsList } from '@leafygreen-ui/descendants';
import { isDefined } from '@leafygreen-ui/lib';

import type { Direction, Index } from '../highlight';

import { isDescendantsSet } from './isDescendantsSet';

/** Computes the next index given a direction */
export function getNewIndex(
  direction: Direction,
  currentIndex: number,
  totalItems: number,
): number;
export function getNewIndex(
  direction: Direction,
  currentIndex: undefined,
  totalItems: number,
): undefined;
export function getNewIndex(
  direction: Direction,
  currentIndex: Index,
  totalItems: number,
): Index {
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

export const getUpdatedIndex = (
  direction: Direction,
  index: Index,
  descendants: DescendantsList<HTMLElement>,
): Index => {
  // If descendants is not set
  // then we don't mutate the index
  if (!isDescendantsSet(descendants)) {
    return index;
  }

  // If descendants is defined
  // but `index` is not initialized
  // initialize that here
  if (!isDefined(index)) {
    return 0;
  }

  // // TODO: keep incrementing until we find an enabled item
  const updatedIndex = getNewIndex(direction, index, descendants.length);

  return updatedIndex;
};
