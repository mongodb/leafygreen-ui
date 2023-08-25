import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const basePanelStyle = css`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: ${spacing[1]}px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const basePanelThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.white};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark2};
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

export const languageSwitcherPanelStyle = css`
  flex-direction: row;
  border-bottom: 1px solid;
  justify-content: space-between;
  padding: 0;
  padding-right: 8px;
  height: 40px; // 28px (icon) + 2 x 6px (focus shadow). Can't use padding b/c switcher
`;

export const languageSwitcherPanelThemeStyles: Record<Theme, string> = {
  [Theme.Light]: cx(
    languageSwitcherPanelStyle,
    css`
      border-color: ${palette.gray.light2};
    `,
  ),
  [Theme.Dark]: cx(
    languageSwitcherPanelStyle,
    css`
      border-color: ${palette.gray.dark1};
    `,
  ),
};
