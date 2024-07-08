import {
  Descendant,
  DescendantsList,
  getDescendantByIndex,
} from '@leafygreen-ui/descendants';

import { Direction, Index } from '../highlight.types';

import { getNextIndex } from './getNextIndex';

/**
 * Finds the index of the subsequent `enabled` descendant element
 */
export function getNextEnabledIndex(
  direction: Direction,
  current: Descendant | undefined,
  descendants: DescendantsList<HTMLElement>,
): Index {
  // If all descendants are disabled, then we skip this step
  if (descendants.every(d => d.props.disabled)) {
    return undefined;
  }

  let updatedIndex = getNextIndex(
    direction,
    current?.index ?? 0,
    descendants.length,
  );
  let item = getDescendantByIndex(updatedIndex, descendants);

  // If the subsequent item is disabled,
  // keep searching in that direction for an enabled one
  while (item?.props.disabled) {
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
    updatedIndex = getNextIndex(
      nextDirection,
      updatedIndex,
      descendants.length,
    );
    item = descendants[updatedIndex];
  }

  return updatedIndex;
}
