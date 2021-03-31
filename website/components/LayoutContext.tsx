import { createContext, useContext } from 'react';

export const LayoutContext = createContext<HTMLDivElement | null>(null);

export function useBodyContainerRef() {
  const element = useContext(LayoutContext);

  return element;
}
