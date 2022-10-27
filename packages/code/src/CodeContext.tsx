import { createContext } from 'react';
import { Theme } from '@leafygreen-ui/lib';

interface CodeData {
  theme: Theme;
  darkMode: boolean;
}

export const CodeContext = createContext<CodeData>({
  theme: Theme.Light,
  darkMode: false,
});

export default CodeContext;
