import { useEffect, useReducer, useState } from 'react';

import { DescendantsList, isDescendantsSet } from '../Descendants';

import {
  AbsoluteSetterArg,
  HighlightReducerFunction,
  RelativeSetterArg,
  UpdateHighlightAction,
} from './reducer/reducer.types';
import {
  HighlightHookReturnType,
  Position,
  UseHighlightOptions,
} from './highlight.types';
import { makeHighlightReducerFunction } from './reducer';

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
    undefined,
  );

  // Fire the `onInit` callback once when the descendants are set
  // Note: we can't use the Reducer's `initializer`
  // since the descendants will likely not exist when the reducer is established
  const [isInitialized, setInit] = useState(false);
  useEffect(() => {
    if (!isInitialized && isDescendantsSet(getDescendants())) {
      options?.onInit?.(getDescendants());
      setInit(true);
    }
  }, [getDescendants, isInitialized, options]);

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
