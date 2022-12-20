import { createContext } from 'react';

import { Theme } from '@leafygreen-ui/lib';

interface MenuData {
  theme: Theme;
  darkMode: boolean;
}

export const MenuContext = createContext<MenuData>({
  theme: Theme.Light,
  darkMode: false,
});

export default MenuContext;
