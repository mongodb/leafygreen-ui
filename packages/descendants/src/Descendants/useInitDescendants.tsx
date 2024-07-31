import React, {
  Dispatch,
  PropsWithChildren,
  useCallback,
  useMemo,
} from 'react';

import { useStateRef } from '@leafygreen-ui/hooks';

import { DescendantsProvider } from './DescendantProvider';
import { DescendantsList } from './Descendants.types';
import { DescendantContextType } from './DescendantsContext';
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

  /** A unique context provider for the given `DescendantsContext` */
  Provider: React.ComponentType<PropsWithChildren<{}>>;
}

/**
 * Initializes a {@link DescendantsList}
 */
export const useInitDescendants = <T extends HTMLElement>(
  context: DescendantContextType<T>,
): InitDescendantsReturnObject<T> => {
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

  // Create a new Provider for the given context
  const Provider = useMemo(() => {
    // eslint-disable-next-line react/display-name
    return ({ children }: PropsWithChildren<{}>) => {
      return (
        <DescendantsProvider
          context={context}
          descendants={getDescendants()}
          dispatch={dispatch}
        >
          {children}
        </DescendantsProvider>
      );
    };
  }, [context, dispatch, getDescendants]);

  return {
    descendants,
    dispatch,
    getDescendants,
    Provider,
  };
};
