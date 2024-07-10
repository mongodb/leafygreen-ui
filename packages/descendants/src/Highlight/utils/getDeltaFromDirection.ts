import { Direction } from '../highlight.types';

/**
 * Returns the relative distance (delta) from the current index
 * in the desired direction
 */
export const getDeltaFromDirection = (
  direction: Direction,
  currentIndex: number,
  totalItems: number,
) => {
  switch (direction) {
    case 'next':
      return 1;
    case 'prev':
      return -1;
    case 'last':
      return totalItems - currentIndex;
    case 'first':
      return -currentIndex;
    default:
      return 0;
  }
};
