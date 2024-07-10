import { Dispatch, useCallback } from 'react';

import { useStateRef } from '@leafygreen-ui/hooks';

import { DescendantsList } from './Descendants.types';
import {
  descendantsReducer,
  DescendantsReducerAction,
} from './DescendantsReducer';

export interface InitDescendantsReturnObject<T extends HTMLElement> {
  /** The descendants list in the current render */
  descendants: DescendantsList<T>;

  /** A setter function for the descendants state */
  dispatch: Dispatch<DescendantsReducerAction<T>>;

  /** Accessor function for the most up-to-date descendants list */
  getDescendants: () => DescendantsList<T>;
}

/**
 * Initializes a {@link DescendantsList}
 */
export const useInitDescendants = <
  T extends HTMLElement,
>(): InitDescendantsReturnObject<T> => {
  // We avoid using `useReducer` here, since we need to internally keep track
  // of the `descendants`, and provide a means to access the updated list
  // to avoid accessing a stale descendants list

  const [descendants, setDescendants, getDescendants] = useStateRef<
    DescendantsList<T>
  >([]);

  const dispatch: Dispatch<DescendantsReducerAction<T>> = useCallback(
    action => {
      const descendants = descendantsReducer(getDescendants(), action);
      setDescendants(descendants);
    },
    [getDescendants, setDescendants],
  );

  return {
    descendants,
    dispatch,
    getDescendants,
  };
};
