import { useReducer } from 'react';

import { Descendant, DescendantsList } from '../Descendants';

import {
  AbsoluteSetterArg,
  HighlightReducerFunction,
  RelativeSetterArg,
  UpdateHighlightAction,
} from './reducer/reducer.types';
import {
  HighlightChangeHandler,
  HighlightHookReturnType,
  Position,
} from './highlight.types';
import { makeHighlightReducerFunction } from './reducer';

interface UseHighlightOptions<T extends HTMLElement> {
  /** A callback fired when the highlight changes */
  onChange?: HighlightChangeHandler<T>;

  /** The initially highlighted descendant */
  initial?: Descendant<T> | undefined;

  /** Filters descendants that are enabled */
  filter?: (d: Descendant<T>) => boolean;
}

/**
 * Custom hook that handles setting the highlighted descendant index,
 * and fires any `onChange` side effects
 */
export const useHighlight = <T extends HTMLElement>(
  /** An accessor for the updated descendants list */
  getDescendants: () => DescendantsList<T>,
  options?: UseHighlightOptions<T>,
): HighlightHookReturnType<T> => {
  // Create a reducer function
  const highlightReducerFunction = makeHighlightReducerFunction(
    getDescendants,
    options,
  );

  // Create the reducer
  const [highlight, dispatch] = useReducer<HighlightReducerFunction<T>>(
    highlightReducerFunction,
    options?.initial,
  );

  /**
   * Custom dispatch that moves the current highlight
   * in a given direction
   *
   * Fires any side-effects in the `onChange` callback
   */
  const moveHighlight = (rel: RelativeSetterArg) => {
    const action: UpdateHighlightAction =
      typeof rel === 'number' ? { delta: rel } : { direction: rel };

    const updatedHighlight = highlightReducerFunction(highlight, action);

    options?.onChange?.(updatedHighlight);
    dispatch(action);
  };

  /**
   * Custom dispatch that sets the current highlight
   * to an absolute `index` or `id`.
   *
   * Fires any side-effects in the `onChange` callback
   */
  const setHighlight = (abs: AbsoluteSetterArg) => {
    const action = constructAbsoluteAction(abs);

    const updatedHighlight = highlightReducerFunction(highlight, action);
    options?.onChange?.(updatedHighlight);
    dispatch(action);
  };

  return {
    highlight,
    moveHighlight,
    setHighlight,
  };
};

function constructAbsoluteAction(
  arg: AbsoluteSetterArg,
): UpdateHighlightAction {
  if (typeof arg === 'number') {
    return {
      index: arg,
    };
  }

  if (typeof arg === 'string') {
    return Object.values(Position).includes(arg as Position)
      ? {
          position: arg as Position,
        }
      : {
          id: arg,
        };
  }

  return {
    value: arg,
  };
}
