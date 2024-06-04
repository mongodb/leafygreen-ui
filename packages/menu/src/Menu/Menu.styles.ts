import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { color, spacing } from '@leafygreen-ui/tokens';

import { MenuTheme } from '../types';

export const menuBackgroundColors = {
  [MenuTheme.Light]: color.light.background.primary.default,
  [MenuTheme.Dark]: palette.gray.dark3,
  /** The color of a dark menu in light mode */
  [MenuTheme.Hybrid]: color.dark.background.primary.default,
};

interface MenuStyleArgs {
  theme: MenuTheme;
}

export const getMenuStyles = ({ theme }: MenuStyleArgs) => css`
  width: 210px;
  border-radius: ${spacing[300]}px;
  overflow: auto;
  padding: 14px 0; // TODO: spacing
  border: 1px solid;

  background-color: ${menuBackgroundColors[theme]};

  border-color: ${theme === MenuTheme.Light
    ? 'transparent'
    : palette.gray.dark2};

  box-shadow: ${theme === MenuTheme.Light
    ? '0px 2px 4px 1px ' + transparentize(0.85, palette.black)
    : 'none'};
`;

export const scrollContainerStyle = css`
  overflow: auto;
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;
  padding: 0px;
`;
