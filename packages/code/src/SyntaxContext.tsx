import { createContext, useContext } from 'react';
import { LineHighlightingDefinition } from './types';

interface SyntaxContext {
  highlightLines: LineHighlightingDefinition;
  showLineNumbers?: boolean;
  darkMode: boolean;
  lineNumberStart: number;
}

export const SyntaxContext = createContext<SyntaxContext>({
  highlightLines: [],
  darkMode: false,
});

export function useSyntaxContext() {
  return useContext(SyntaxContext);
}
