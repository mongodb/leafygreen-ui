import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { color, spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { LGIDs } from '../constants';
import { menuItemContainerStyles } from '../MenuItem/MenuItem.styles';

export const subMenuContainerClassName = createUniqueClassName(LGIDs.submenu);
export const subMenuToggleClassName = createUniqueClassName(
  LGIDs.submenu + '-trigger',
);

export const subMenuContainerStyles = css`
  ${menuItemContainerStyles}
  position: relative;
`;

export const submenuToggleStyles = css`
  position: absolute;
  right: ${spacing[300]}px;
  // Ensure the trigger is centered regardless of element height
  top: 50%;
  transform: translateY(-50%);
`;

interface SubmenuListStyleArgs {
  theme: Theme;
  hasGlyph: boolean;
}

export const getSubmenuListStyles = ({
  theme,
  hasGlyph,
}: SubmenuListStyleArgs) => css`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 0;
  height: max-content;
  overflow: hidden;
  transition: max-height ${transitionDuration.default}ms ease-in-out;
  position: relative;
  margin-left: ${hasGlyph ? spacing[900] : spacing[300]}px;
  border-top: 1px solid ${color[theme].border.secondary.default};
`;
