import { createContext, useContext } from 'react';

import { LineHighlightingDefinition } from '../types';

interface SyntaxContext {
  highlightLines: LineHighlightingDefinition;
  showLineNumbers?: boolean;
  darkMode: boolean;
  lineNumberStart?: number;
  customKeywords?: { [key: string]: string };
}

export const SyntaxContext = createContext<SyntaxContext>({
  highlightLines: [],
  darkMode: false,
  customKeywords: {},
});

export function useSyntaxContext() {
  return useContext(SyntaxContext);
}
