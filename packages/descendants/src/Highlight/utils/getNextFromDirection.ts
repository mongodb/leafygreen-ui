import {
  Descendant,
  DescendantsList,
  isDescendantsSet,
} from '../../Descendants';
import { Direction } from '../highlight.types';

import { getRelativeDescendant } from './getRelativeDescendant';

export const getNextFromDirection = (
  direction: Direction,
  current: Descendant | undefined,
  descendants: DescendantsList,
): Descendant | undefined => {
  // If descendants is not set
  // then we don't mutate the index
  if (!isDescendantsSet(descendants)) {
    return current;
  }

  current = current ?? descendants[0];
  const currIndex = current.index;

  const delta: number = (() => {
    switch (direction) {
      case 'next':
        return 1;
      case 'prev':
        return -1;
      case 'last':
        return descendants.length - currIndex;
      case 'first':
        return -currIndex;
      default:
        return 0;
    }
  })();
  const nextDescendant = getRelativeDescendant(delta, current, descendants);

  return nextDescendant;
};
