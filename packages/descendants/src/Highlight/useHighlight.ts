import { useReducer } from 'react';

import { DescendantsList, isDescendantsSet } from '../Descendants';

import { HighlightReducerFunction } from './reducer/reducer.types';
import type {
  Direction,
  HighlightChangeHandler,
  HighlightHookReturnType,
} from './highlight.types';
import { makeHighlightReducerFunction } from './reducer';

const getInitialHighlight = <T extends HTMLElement>(
  descendants: DescendantsList<T>,
) => (isDescendantsSet(descendants) ? descendants[0] : undefined);

/**
 * Custom hook that handles setting the highlighted descendant index,
 * and fires any `onChange` side effects
 */
export const useHighlight = <T extends HTMLElement>(
  /** An accessor for the updated descendants list */
  getDescendants: () => DescendantsList<T>,
  /** A callback fired when the highlight changes */
  onChange?: HighlightChangeHandler<T>,
): HighlightHookReturnType<T> => {
  // Create a reducer function
  const highlightReducerFunction = makeHighlightReducerFunction(getDescendants);

  // Create the reducer
  const [highlight, dispatch] = useReducer<HighlightReducerFunction<T>>(
    highlightReducerFunction,
    getInitialHighlight(getDescendants()),
  );

  /**
   * Custom dispatch that moves the current highlight
   * in a given direction
   *
   * Fires any side-effects in the `onChange` callback
   */
  const moveHighlight = (direction: Direction) => {
    const updatedHighlight = highlightReducerFunction(highlight, {
      direction,
    });

    onChange?.(updatedHighlight);
    dispatch({ direction });
  };

  /**
   * Custom dispatch that sets the current highlight
   * to a given `index` or `id`.
   *
   * Fires any side-effects in the `onChange` callback
   */
  const setHighlight = (indexOrId: number | string) => {
    const action =
      typeof indexOrId === 'string'
        ? {
            id: indexOrId,
          }
        : {
            index: indexOrId,
          };

    const updatedHighlight = highlightReducerFunction(highlight, action);
    onChange?.(updatedHighlight);
    dispatch(action);
  };

  return {
    highlight,
    moveHighlight,
    setHighlight,
  };
};
