import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { menuItemContainerStyles } from '../MenuItem/MenuItem.styles';
import { menuColor } from '../styles';
import { getLgIds } from '../utils';

const TRANSITION_DURATION = transitionDuration.default;

const lgIds = getLgIds();

export const subMenuContainerClassName = createUniqueClassName(lgIds.submenu);
export const subMenuToggleClassName = createUniqueClassName(
  lgIds.submenu + '-trigger',
);

export const subMenuContainerStyles = css`
  ${menuItemContainerStyles}
  position: relative;
`;

const getBaseSubmenuToggleStyles = (theme: Theme) => css`
  position: absolute;
  right: ${spacing[300]}px;
  // Ensure the trigger is centered regardless of element height
  top: 50%;
  translate: 0 -50%;
  rotate: 0deg;
  color: ${menuColor[theme].icon.default};
  transition: rotate ${TRANSITION_DURATION}ms ease-in-out;

  &:hover {
    color: ${menuColor[theme].icon.hover};
    &:before {
      // the icon button hover circle
      background-color: ${menuColor[theme].background.hover};
    }
  }
`;

const submenuToggleExpandedStyle = css`
  rotate: 180deg;
`;

export const getSubmenuToggleStyles = (theme: Theme, open: boolean) =>
  cx(subMenuToggleClassName, getBaseSubmenuToggleStyles(theme), {
    [submenuToggleExpandedStyle]: open,
  });

export const getSubmenuListStyles = () => css`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 0;
  height: max-content;
  overflow: hidden;
  transition: max-height ${TRANSITION_DURATION}ms ease-in-out;
  position: relative;
`;
