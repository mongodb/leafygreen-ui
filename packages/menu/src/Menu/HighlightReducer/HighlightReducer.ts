import { type Dispatch, type Reducer, useReducer } from 'react';

import { DescendantsList } from '@leafygreen-ui/descendants';

import { getUpdatedIndex } from './utils/getUpdatedIndex';
import { isDescendantsSet } from './utils/isDescendantsSet';
import type { Direction, Index } from './highlight';

const getInitialIndex = (descendants: DescendantsList<HTMLElement>) =>
  isDescendantsSet(descendants) ? 0 : undefined;

/**
 * Custom hook that handles setting the highlighted descendant index,
 * and fires any `onChange` side effects
 */
export const useHighlightReducer = (
  descendants: DescendantsList<HTMLElement>,
  onChange?: (newIndex: Index) => void,
): [Index, Dispatch<Direction>] => {
  // Initializes a new reducer function
  const highlightReducerFunction: Reducer<Index, Direction> = (
    _index,
    direction,
  ) => getUpdatedIndex(direction, _index, descendants);
  const [index, dispatch] = useReducer<Reducer<Index, Direction>>(
    highlightReducerFunction,
    getInitialIndex(descendants),
  );

  /**
   * Custom dispatch that fires any side-effects when the index changes
   */
  const updateIndex = (direction: Direction) => {
    const updatedIndex = highlightReducerFunction(index, direction);
    onChange?.(updatedIndex);
    dispatch(direction);
  };

  return [index, updateIndex];
};
