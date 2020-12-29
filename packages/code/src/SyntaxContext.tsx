import { createContext, useContext } from 'react';

interface SyntaxContext {
  highlightLines: Array<number | [number, number]>;
  showLineNumbers?: boolean;
  darkMode: boolean;
}

export const SyntaxContext = createContext<SyntaxContext>({
  highlightLines: [],
  darkMode: false,
});

export function useSyntaxContext() {
  return useContext(SyntaxContext);
}
