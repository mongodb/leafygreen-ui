import { createContext } from 'react';

import { createDescendantsContext } from '@leafygreen-ui/descendants';

import { MenuContextData } from './MenuContext.types';

export const MenuDescendantsContext = createDescendantsContext(
  'MenuDescendantsContext',
);

export const MenuContext = createContext<MenuContextData>({
  theme: 'light',
  darkMode: false,
  highlightIndex: undefined,
});

export default MenuContext;
