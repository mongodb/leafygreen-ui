import React, { PropsWithChildren, useMemo } from 'react';

import { HighlightContextProps } from './highlight.types';
import { HighlightContextType } from './HighlightContext';

export interface HighlightProviderProps<T extends HTMLElement>
  extends HighlightContextProps<T> {
  context: HighlightContextType<T>;
}

export const HighlightProvider = <T extends HTMLElement>({
  context,
  children,
  highlight,
}: PropsWithChildren<HighlightProviderProps<T>>) => {
  const Provider = context.Provider;

  const providerValue = useMemo(
    () => ({
      highlight,
    }),
    [highlight],
  );

  return <Provider value={providerValue}>{children}</Provider>;
};
