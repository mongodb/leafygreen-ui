import React, { Dispatch, PropsWithChildren, useMemo } from 'react';

import { DescendantsList } from './Descendants.types';
import { DescendantContextType } from './DescendantsContext';
import { DescendantsReducerAction } from './DescendantsReducer';

export interface DescendantsProviderProps<T extends HTMLElement> {
  context: DescendantContextType<T>;
  descendants: DescendantsList<T>;
  dispatch: Dispatch<DescendantsReducerAction<T>>;
}

/**
 * The provider for descendants context values.
 *
 * Receives a specific context value as `context`
 * in order to have multiple nested descendant contexts
 *
 * Also receives a `descendants` list in order to ensure the outer parent
 * has access to the descendants object
 */
export const DescendantsProvider = <T extends HTMLElement>({
  context,
  children,
  descendants,
  dispatch,
}: PropsWithChildren<DescendantsProviderProps<T>>) => {
  const Provider = context.Provider;

  const providerValue = useMemo(
    () => ({
      descendants,
      dispatch,
    }),
    [descendants, dispatch],
  );

  return <Provider value={providerValue}>{children}</Provider>;
};
