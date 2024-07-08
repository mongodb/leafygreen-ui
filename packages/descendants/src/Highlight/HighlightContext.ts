import { createContext } from 'react';
import noop from 'lodash/noop';

import { HighlightContextProps } from './highlight.types';

export type HighlightContextType<T extends HTMLElement> = React.Context<
  HighlightContextProps<T>
>;

export const createHighlightContext = <T extends HTMLElement = HTMLElement>(
  displayName?: string,
) => {
  const context = createContext<HighlightContextProps<T>>({
    highlight: undefined,
    setHighlight: noop,
  });
  context.displayName = displayName ?? 'HighlightContext';

  return context;
};
