import { createContext, useContext } from 'react';

interface SyntaxContext {
  highlightLines: Array<number>;
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
