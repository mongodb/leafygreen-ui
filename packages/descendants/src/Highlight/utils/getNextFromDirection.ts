import {
  Descendant,
  DescendantsList,
  getDescendantByIndex,
} from '@leafygreen-ui/descendants';
import { isDefined } from '@leafygreen-ui/lib';

import { Direction } from '../highlight.types';

import { getNextEnabledIndex } from './getNextEnabled';
import { isDescendantsSet } from './isDescendantsSet';

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

  const updatedIndex = getNextEnabledIndex(direction, current, descendants);

  if (isDefined(updatedIndex)) {
    const nextDescendant = getDescendantByIndex(updatedIndex, descendants);

    return nextDescendant;
  }

  return current;
};
