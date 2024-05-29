import { isDefined } from '@leafygreen-ui/lib';

import type { Direction, Index } from '../highlight';

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
