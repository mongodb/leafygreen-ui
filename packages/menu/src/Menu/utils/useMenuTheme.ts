import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { color } from '@leafygreen-ui/tokens';

import { MenuTheme } from '../../types';

export const menuBackgroundColors = {
  [MenuTheme.Light]: color.light.background.primary.default,
  [MenuTheme.Dark]: color.dark.background.secondary.default,
  /** The color of a dark menu in light mode */
  [MenuTheme.Hybrid]: color.dark.background.primary.default,
};

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
