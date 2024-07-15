import { createContext } from 'react';

import { HighlightContextProps } from './highlight.types';

export type HighlightContextType<T extends HTMLElement> = React.Context<
  HighlightContextProps<T>
>;

export const createHighlightContext = <T extends HTMLElement = HTMLElement>(
  displayName?: string,
): HighlightContextType<T> => {
  const context = createContext<HighlightContextProps<T>>({
    highlight: undefined,
  });
  context.displayName = displayName ?? 'HighlightContext';

  return context;
};
