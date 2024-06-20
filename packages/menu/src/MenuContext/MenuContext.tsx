import { createContext, useContext } from 'react';

import { createDescendantsContext } from '@leafygreen-ui/descendants';

import { MenuContextData } from './MenuContext.types';

export const MenuDescendantsContext = createDescendantsContext(
  'MenuDescendantsContext',
);

export const MenuContext = createContext<MenuContextData>({
  theme: 'light',
  darkMode: false,
  highlight: undefined,
});

export const useMenuContext = () => useContext(MenuContext);

export default MenuContext;
