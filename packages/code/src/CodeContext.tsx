import { createContext, useContext } from 'react';
import { Theme } from '@leafygreen-ui/lib';

interface CodeData {
  theme: Theme;
  darkMode: boolean;
}

export function useCodeContext() {
  const { theme, darkMode } = useContext(CodeContext);

  return { theme, darkMode };
}

export const CodeContext = createContext<CodeData>({
  theme: Theme.Light,
  darkMode: false,
});

export default CodeContext;
