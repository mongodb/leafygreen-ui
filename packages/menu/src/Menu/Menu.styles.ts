import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { popoverCSSProperties } from '@leafygreen-ui/popover';
import { boxShadows, color, spacing } from '@leafygreen-ui/tokens';

import { menuColor } from '../styles';

import { MenuVariant } from './Menu.types';

export interface MenuStyleArgs {
  theme: Theme;
  variant: MenuVariant;
}

export const DEFAULT_MAX_HEIGHT = 344;
export const DEFAULT_WIDTH = 210;
const DEFAULT_MENU_PADDING = spacing[300];
const COMPACT_MENU_PADDING = spacing[150];

export const getMenuStyles = ({ theme, variant }: MenuStyleArgs) => {
  return css`
    width: ${DEFAULT_WIDTH}px;
    max-height: var(${popoverCSSProperties.maxHeight}, ${DEFAULT_MAX_HEIGHT});
    border-radius: ${spacing[300]}px;
    overflow: auto;
    padding: ${variant === MenuVariant.Default
        ? DEFAULT_MENU_PADDING
        : COMPACT_MENU_PADDING}px
      0;

    background-color: ${menuColor[theme].background.default};
    border: 1px solid ${menuColor[theme].border.default};

    /* // Light mode only */
    ${theme === 'light' &&
    css`
      box-shadow: ${boxShadows[Theme.Light][1]};
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
