import { type Dispatch, type Reducer, useReducer } from 'react';

import { DescendantsList } from '@leafygreen-ui/descendants';

type Index = number;
type Direction = 'next' | 'prev' | 'first' | 'last';

/** Computes the next index given a direction */
export const getNewIndex = (
  direction: Direction,
  currentIndex: Index,
  totalItems: number,
): number => {
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
};

/**
 * Creates a highlight reducer function
 * with a `descendants` list within the closure
 */
const makeHighlightsReducerFn =
  (descendants: DescendantsList<HTMLElement>) =>
  (index: Index, direction: Direction) => {
    const updatedIndex = getNewIndex(direction, index, descendants.length);
    const itemAtIndex = descendants[updatedIndex];

    // TODO: keep incrementing until we find an enabled item
    if (itemAtIndex?.props?.disabled) {
      return index;
    }

    return updatedIndex;
  };

/**
 * Custom hook that handles setting the highlighted descendant index,
 * and fires any `onChange` side effects
 */
export const useHighlightReducer = (
  descendants: DescendantsList<HTMLElement>,
  onChange?: (newIndex: Index) => void,
): [Index, Dispatch<Direction>] => {
  const highlightReducerFunction = makeHighlightsReducerFn(descendants);

  const [index, dispatch] = useReducer<Reducer<Index, Direction>>(
    highlightReducerFunction,
    0,
  );

  /**
   * Custom dispatch that fires any side-effects when the index changes
   */
  const updateIndex = (direction: Direction) => {
    const nextIndex = highlightReducerFunction(index, direction);
    onChange?.(nextIndex);
    dispatch(direction);
  };

  return [index, updateIndex];
};
