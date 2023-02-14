import { createContext } from 'react';

import { MenuData } from './MenuContext.types';

export const MenuContext = createContext<MenuData>({
  theme: 'light',
  darkMode: false,
});

export default MenuContext;
