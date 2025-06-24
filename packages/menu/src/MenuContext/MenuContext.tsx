import { createContext, useContext } from 'react';
import noop from 'lodash/noop';

import { createDescendantsContext } from '@leafygreen-ui/descendants';
import { Theme } from '@leafygreen-ui/lib';

import { HighlightReducerReturnType } from '../HighlightReducer/highlight.types';
import { getLgIds, GetLgIdsReturnType } from '../utils';

export interface MenuContextData extends HighlightReducerReturnType {
  theme: Theme;
  darkMode: boolean;

  /** Whether to render a dark menu in light mode */
  renderDarkMenu?: boolean;

  /**
   * LGIDs for menu components.
   */
  lgIds: GetLgIdsReturnType;
}

/**
 * Used to register and consume Menu descendants
 */
export const MenuDescendantsContext = createDescendantsContext(
  'MenuDescendantsContext',
);

export const MenuContext = createContext<MenuContextData>({
  theme: 'light',
  darkMode: false,
  highlight: undefined,
  moveHighlight: noop,
  setHighlight: noop,
  lgIds: getLgIds(),
});

/**
 * Returns the {@link MenuContextData} for a given menu context
 */
export const useMenuContext = () => useContext(MenuContext);
