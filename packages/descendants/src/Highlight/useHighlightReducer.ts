import { type Reducer, useReducer } from 'react';

import { Descendant, DescendantsList, isDescendantsSet } from '../Descendants';

import { makeHighlightReducerFunction } from './utils/makeHighlightReducerFunction';
import type {
  Direction,
  HighlightChangeHandler,
  HighlightReducerReturnType,
  UpdateHighlightAction,
} from './highlight.types';

const getInitialHighlight = (descendants: DescendantsList<HTMLElement>) =>
  isDescendantsSet(descendants) ? descendants[0] : undefined;

/**
 * Custom hook that handles setting the highlighted descendant index,
 * and fires any `onChange` side effects
 */
export const useHighlightReducer = (
  /** An accessor for the updated descendants list */
  getDescendants: () => DescendantsList,
  /** A callback fired when the highlight changes */
  onChange?: HighlightChangeHandler,
): HighlightReducerReturnType => {
  // Create a reducer function
  const highlightReducerFunction = makeHighlightReducerFunction(getDescendants);

  // Create the reducer
  const [highlight, dispatch] = useReducer<
    Reducer<Descendant | undefined, UpdateHighlightAction>
  >(highlightReducerFunction, getInitialHighlight(getDescendants()));

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
