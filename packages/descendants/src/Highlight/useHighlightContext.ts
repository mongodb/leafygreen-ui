import { useContext } from 'react';

import { HighlightContextType } from './HighlightContext';

export const useHighlightContext = <T extends HTMLElement>(
  ctx: HighlightContextType<T>,
) => {
  const context = useContext(ctx);
  return context;
};
