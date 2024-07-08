import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { LGIDs } from '../constants';
import { menuItemContainerStyles } from '../MenuItem/MenuItem.styles';
import { menuColor } from '../styles';

export const subMenuContainerClassName = createUniqueClassName(LGIDs.submenu);
export const subMenuToggleClassName = createUniqueClassName(
  LGIDs.submenu + '-trigger',
);

export const subMenuContainerStyles = css`
  ${menuItemContainerStyles}
  position: relative;
`;

export const getSubmenuToggleStyles = (theme: Theme) => css`
  position: absolute;
  right: ${spacing[300]}px;
  // Ensure the trigger is centered regardless of element height
  top: 50%;
  transform: translateY(-50%);
  color: ${menuColor[theme].icon.default};

  &:hover {
    color: ${menuColor[theme].icon.hover};
    &:before {
      // the icon button hover circle
      background-color: ${menuColor[theme].background.hover};
    }
  }
`;

export const getSubmenuListStyles = () => css`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 0;
  height: max-content;
  overflow: hidden;
  transition: max-height ${transitionDuration.default}ms ease-in-out;
  position: relative;
`;
