import { isDefined } from '@leafygreen-ui/lib';

import {
  Descendant,
  DescendantsList,
  getDescendantByIndex,
  isDescendantsSet,
} from '../../Descendants';
import { Direction } from '../highlight.types';

import { getNextEnabledIndex } from './getNextEnabled';

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
