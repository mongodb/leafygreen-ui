import { type Reducer, useReducer } from 'react';

import {
  Descendant,
  DescendantsList,
  getDescendantById,
  getDescendantByIndex,
} from '@leafygreen-ui/descendants';

import { getNextFromDirection } from './utils/getNextFromDirection';
import { isDescendantsSet } from './utils/isDescendantsSet';
import type {
  Direction,
  HighlightChangeHandler,
  HighlightReducerFunction,
  HighlightReducerReturnType,
  UpdateHighlightAction,
} from './highlight.types';

const getInitialHighlight = (descendants: DescendantsList<HTMLElement>) =>
  isDescendantsSet(descendants) ? descendants[0] : undefined;

/**
 * Creates a new reducer function for closure for a given `descendants` value
 */
const makeHighlightReducerFunction =
  (getDescendants: () => DescendantsList): HighlightReducerFunction =>
  (currentHighlight, action) => {
    const descendants = getDescendants();

    // If we've received a direction, move the highlight
    if (action.direction) {
      const nextHighlight = getNextFromDirection(
        action.direction,
        currentHighlight,
        descendants,
      );
      return nextHighlight || currentHighlight;
    } else if (action.index) {
      const nextHighlight = getDescendantByIndex(action.index, descendants);
      return nextHighlight;
    } else if (action.id) {
      const nextHighlight = getDescendantById(action.id, descendants);
      return nextHighlight;
    }

    return currentHighlight;
  };

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
