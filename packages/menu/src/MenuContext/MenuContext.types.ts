import { Theme } from '@leafygreen-ui/lib';

export interface MenuContextData {
  theme: Theme;
  darkMode: boolean;

  /** The index of the currently highlighted (focused) item */
  highlightIndex?: number;

  /** Whether to a dark menu in light mode */
  renderDarkMenu?: boolean;
}
