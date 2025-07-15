import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, spacing } from '@leafygreen-ui/tokens';

import { menuColor } from '../styles';

import { MenuVariant } from './Menu.types';

export interface MenuStyleArgs {
  theme: Theme;
  variant: MenuVariant;
}

export const getMenuStyles = ({ theme, variant }: MenuStyleArgs) => {
  return css`
    width: 210px;
    border-radius: ${spacing[300]}px;
    overflow: auto;
    padding: ${variant === MenuVariant.Default ? spacing[300] : spacing[150]}px
      0;

    background-color: ${menuColor[theme].background.default};
    border: 1px solid ${menuColor[theme].border.default};

    /* // Light mode only */
    ${theme === 'light' &&
    css`
      box-shadow: 0 2px 4px 1px ${transparentize(0.85, palette.black)};
    `}
  `;
};

export const scrollContainerStyle = css`
  overflow: auto;
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;
  padding: 0px;
`;

// TODO: Remove dark-in-light mode styles
// after https://jira.mongodb.org/browse/LG-3974
export const getDarkInLightModeMenuStyles = () => css`
  box-shadow: unset;
  background-color: ${color.dark.background.primary.default};
  border: 1px solid ${color.dark.border.primary.default};
`;
