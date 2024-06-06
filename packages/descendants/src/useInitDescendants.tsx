import { Dispatch, useCallback } from 'react';

import { useStateRef } from '@leafygreen-ui/hooks';

import { DescendantsList } from './Descendants.types';
import {
  descendantsReducer,
  DescendantsReducerAction,
} from './DescendantsReducer';

export interface InitDescendantsReturnObject<T extends HTMLElement> {
  descendants: DescendantsList<T>;
  dispatch: Dispatch<DescendantsReducerAction<T>>;
  getDescendants: () => DescendantsList<T>;
}

/**
 * Initializes a {@link DescendantsList}
 */
export const useInitDescendants = <
  T extends HTMLElement,
>(): InitDescendantsReturnObject<T> => {
  const [descendants, setDescendants, getDescendants] = useStateRef<
    DescendantsList<T>
  >([]);

  const dispatch: Dispatch<DescendantsReducerAction<T>> = useCallback(
    action => {
      const { descendants } = descendantsReducer(
        {
          descendants: getDescendants(),
        },
        action,
      );
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
