import { createContext } from 'react';

import { createDescendantsContext } from '@leafygreen-ui/descendants';

import { MenuData } from './MenuContext.types';

export const MenuDescendantsContext = createDescendantsContext(
  'MenuDescendantsContext',
);

export const MenuContext = createContext<MenuData>({
  theme: 'light',
  darkMode: false,
});

export default MenuContext;
