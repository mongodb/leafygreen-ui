import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import React from 'react';

import { DescendantsList, isDescendantsSet } from '../Descendants';

import {
  AbsoluteSetterArg,
  HighlightReducerFunction,
  RelativeSetterArg,
  UpdateHighlightAction,
} from './reducer/reducer.types';
import { constructAbsoluteReducerAction } from './utils/constructAbsoluteReducerAction';
import {
  HighlightHookReturnType,
  UseHighlightOptions,
} from './highlight.types';
import { HighlightContextType } from './HighlightContext';
import { HighlightProvider } from './HighlightProvider';
import { makeHighlightReducerFunction } from './reducer';

/**
 * Custom hook that handles setting the highlighted descendant index,
 * and fires any `onChange` side effects
 */
export const useHighlight = <T extends HTMLElement>(
  /**
   * The context used to track highlight
   */
  context: HighlightContextType<T>,

  /**
   * An accessor for the updated descendants list
   */
  getDescendants: () => DescendantsList<T>,

  /**
   * Additional options
   */
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

  // Create a ref to track the current value,
  // and accessor in order to access the latest value
  // TODO: Consider consolidating the reducer & ref accessor into a single hook
  const highlightRef = useRef(highlight);

  const getHighlight = () => {
    return highlightRef.current;
  };

  // Fire the `onInit` callback once when the descendants are set
  // Note: we can't use the Reducer's `initializer`
  // since the descendants will not exist when the reducer is first established
  const [isInitialized, setInit] = useState(false);
  const currentDescendants = getDescendants();
  useEffect(() => {
    if (!isInitialized && isDescendantsSet(currentDescendants)) {
      options?.onInit?.(currentDescendants);
      setInit(true);
    }
  }, [currentDescendants, isInitialized, options]);

  /**
   * Custom dispatch that moves the current highlight
   * in a given direction
   *
   * Fires any side-effects in the `onChange` callback
   */
  const setRelativeHighlight = (rel: RelativeSetterArg) => {
    const action: UpdateHighlightAction =
      typeof rel === 'number' ? { delta: rel } : { direction: rel };

    const updatedHighlight = highlightReducerFunction(getHighlight(), action);
    options?.onChange?.(updatedHighlight);
    highlightRef.current = updatedHighlight;
    dispatch(action);
  };

  /**
   * Custom dispatch that sets the current highlight
   * to an absolute `index` or `id`.
   *
   * Fires any side-effects in the `onChange` callback
   */
  const setAbsoluteHighlight = (abs: AbsoluteSetterArg) => {
    const action = constructAbsoluteReducerAction(abs);

    const updatedHighlight = highlightReducerFunction(getHighlight(), action);
    options?.onChange?.(updatedHighlight);
    highlightRef.current = updatedHighlight;
    dispatch(action);
  };

  const Provider: HighlightHookReturnType<T>['Provider'] = useMemo(() => {
    // eslint-disable-next-line react/display-name, react/prop-types
    return ({ children }) => {
      return (
        <HighlightProvider context={context} highlight={getHighlight()}>
          {children}
        </HighlightProvider>
      );
    };
  }, [context]);

  return {
    Provider,
    highlight,
    setRelativeHighlight,
    setAbsoluteHighlight,
  };
};
