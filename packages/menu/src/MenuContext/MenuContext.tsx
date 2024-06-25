import { createContext, useContext } from 'react';

import { createDescendantsContext } from '@leafygreen-ui/descendants';
import { Descendant } from '@leafygreen-ui/descendants';
import { Theme } from '@leafygreen-ui/lib';

import { HighlightReducerReturnType } from '../HighlightReducer/highlight.types';

export interface MenuContextData {
  theme: Theme;
  darkMode: boolean;

  /** The index of the currently highlighted (focused) item */
  highlight?: Descendant;

  /** Sets the current highlight by index or id */
  setHighlight?: HighlightReducerReturnType['setHighlight'];

  /** Whether to render a dark menu in light mode */
  renderDarkMenu?: boolean;
}

export const MenuDescendantsContext = createDescendantsContext(
  'MenuDescendantsContext',
);

export const MenuContext = createContext<MenuContextData>({
  theme: 'light',
  darkMode: false,
  highlight: undefined,
});

export const useMenuContext = () => useContext(MenuContext);
