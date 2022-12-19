import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import { getIndentLevelStyle, sideNavItemSidePadding } from '../SideNav/styles';

export const buttonClassName = createUniqueClassName('side-nav-group-button');

export const listItemStyle = css`
  display: flex;
  flex-direction: column;
  position: relative;

  & ~ & > .${buttonClassName} {
    padding: ${spacing[3]}px ${sideNavItemSidePadding}px ${spacing[2]}px
      ${sideNavItemSidePadding}px;
  }
`;

export const baseStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0;
  margin-bottom: 0;
  padding: ${spacing[3]}px ${spacing[3]}px ${spacing[2]}px;
`;

export const themeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.green.dark2};
  `,
  [Theme.Dark]: css`
    color: ${palette.green.light1};
  `,
};

export const indentedStyle = (indentLevel: number, darkMode: boolean) =>
  cx(
    getIndentLevelStyle(indentLevel, darkMode),
    css`
      padding-top: ${spacing[3]}px;
      padding-bottom: ${spacing[2]}px;
    `,
  );
