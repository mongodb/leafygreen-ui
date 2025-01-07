import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const getBasePanelStyle = css`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: ${spacing[100]}px;
  height: 40px; // 28px (icon) + 2 x 6px (focus shadow). Can't use padding b/c switcher

  z-index: 2; // Above the shadows
  grid-area: panel;

  flex-direction: row;
  border-bottom: 1px solid;
  justify-content: space-between;
  padding-inline: 8px 16px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const basePanelThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.white};
    border-color: ${palette.gray.light2};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark2};
    border-color: ${palette.gray.dark1};
  `,
};

export const sidePanelStyle = css`
  flex-direction: column;
  padding: 6px;
  border-left: solid 1px;
`;

export const sidePanelThemeStyles: Record<Theme, string> = {
  [Theme.Light]: cx(
    sidePanelStyle,
    css`
      border-color: ${palette.gray.light2};
    `,
  ),
  [Theme.Dark]: cx(
    sidePanelStyle,
    css`
      border-color: ${palette.gray.dark2};
    `,
  ),
};

export const panelLeftStyles = css`
  display: flex;
  gap: ${spacing[200]}px;
`;

export const panelIconsStyles = css`
  display: flex;
  gap: ${spacing[100]}px;
`;
