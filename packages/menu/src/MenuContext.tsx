import { createContext } from 'react';
import { Theme } from '@leafygreen-ui/Lib';

interface MenuData {
  theme: Theme;
}

export const MenuContext = createContext<MenuData>({
  theme: Theme.Light,
});

export default MenuContext;
