import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';

import { MenuTheme } from '../../types';

/**
 * Computes the hybrid theme to support dark-in-light-mode menus
 */
export const useMenuTheme = ({
  darkModeProp,
  renderDarkMenu,
}: {
  darkModeProp?: boolean;
  renderDarkMenu?: boolean;
}) => {
  const { theme: baseTheme } = useDarkMode(darkModeProp);

  const theme: MenuTheme = renderDarkMenu
    ? baseTheme === Theme.Light
      ? MenuTheme.Hybrid
      : MenuTheme.Dark
    : (baseTheme as MenuTheme);

  const darkMode = theme !== MenuTheme.Light; //

  return { theme, darkMode };
};

export const getBaseTheme = (menuTheme: MenuTheme): Theme =>
  menuTheme === MenuTheme.Hybrid ? Theme.Dark : menuTheme;
