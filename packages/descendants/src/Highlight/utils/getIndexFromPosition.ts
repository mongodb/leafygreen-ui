import { DescendantsList } from '../../Descendants';
import { Position } from '../highlight.types';

/**
 * Converts a {@link Position} value into an absolute index
 */
export const getIndexFromPosition = (
  position: Position,
  descendants: DescendantsList<any>,
): number => {
  switch (position) {
    case 'first':
      return 0;
    case 'last':
      return descendants.length - 1;
    default:
      return 0;
  }
};
