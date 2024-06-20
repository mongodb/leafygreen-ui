import { Descendant } from '@leafygreen-ui/descendants';
import { Theme } from '@leafygreen-ui/lib';

import { HighlightReducerReturnType } from '../HighlightReducer/highlight.types';

export interface MenuContextData {
  theme: Theme;
  darkMode: boolean;

  /** The index of the currently highlighted (focused) item */
  // highlightIndex?: number;
  highlight?: Descendant;

  setHighlight?: HighlightReducerReturnType['setHighlight'];

  /** Whether to a dark menu in light mode */
  renderDarkMenu?: boolean;
}
