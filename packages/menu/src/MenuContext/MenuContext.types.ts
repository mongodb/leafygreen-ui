import { Theme } from '@leafygreen-ui/lib';

export interface MenuContextData {
  theme: Theme;
  darkMode: boolean;
  highlightIndex?: number;
}
