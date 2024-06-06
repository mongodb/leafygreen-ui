import { type Dispatch, type Reducer, useReducer } from 'react';
import { isEqual } from 'lodash';

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
  onChange?: (
    newIndex: Index,
    updatedDescendants: DescendantsList<HTMLElement>,
  ) => void,
): [Index, Dispatch<Direction>] => {
  // Initializes a new reducer function
  const highlightReducerFunction: Reducer<Index, Direction> = (
    _index,
    direction,
  ) => getUpdatedIndex(direction, _index, descendants);

  // Create the reducer
  const [index, dispatch] = useReducer<Reducer<Index, Direction>>(
    highlightReducerFunction,
    getInitialIndex(descendants),
  );

  /**
   * Custom dispatch that fires any side-effects when the index changes
   */
  const updateIndex = (direction: Direction) => {
    const updatedIndex = highlightReducerFunction(index, direction);
    // console.log('\nREDUCER: updateIndex');
    // logDescendants(descendants);

    onChange?.(updatedIndex, descendants);
    dispatch(direction);
  };

  return [index, updateIndex];
};

export const logDescendants = (
  currentDescendants: DescendantsList<HTMLElement>,
  prevDescendants?: DescendantsList<HTMLElement>,
) => {
  // console.log({ currentDescendants, prevDescendants });

  if (currentDescendants && currentDescendants.length > 0) {
    const allExist = currentDescendants.every(d =>
      document.contains(d?.ref?.current),
    );

    console.log(
      allExist ? '✔️ Descendants Exist' : 'Descendant refs are stale 🚫',
    );

    console.log(currentDescendants.map(d => d.id));

    if (prevDescendants && prevDescendants.length > 0) {
      const allEqual =
        currentDescendants.every((d, i) => isEqual(d, prevDescendants?.[i])) &&
        prevDescendants.every((p, i) => isEqual(p, currentDescendants?.[i]));

      !allEqual && console.log('‼️ Descendants have changed');

      if (!allEqual) {
        const allPrevExist = prevDescendants.every(d =>
          document.contains(d.ref.current),
        );

        if (allPrevExist !== allExist)
          console.log(
            allPrevExist
              ? 'Prev. descendants exist in DOM'
              : 'Prev. descendants are stale',
          );
      }
    }
  } else {
    console.log('No descendants registered');
  }

  console.log('');
};
