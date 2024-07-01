import { isDefined } from '@leafygreen-ui/lib';

import type { Direction, Index } from '../highlight.types';

/**
 * Computes the next index given a direction
 */
// prettier-ignore
export function getNextIndex(direction: Direction, currentIndex: number, totalItems: number): number;
// prettier-ignore
export function getNextIndex(direction: Direction, currentIndex: undefined, totalItems: number): undefined;
// prettier-ignore
export function getNextIndex(direction: Direction, currentIndex: Index, totalItems: number): Index {
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
