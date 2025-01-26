import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, spacing } from '@leafygreen-ui/tokens';

export const getBasePanelStyle = ({
  hasTitle,
  theme,
  className,
}: {
  hasTitle: boolean;
  theme: Theme;
  className?: string;
}) =>
  cx(
    css`
      display: flex;
      align-items: center;
      flex-shrink: 0;
      flex-direction: row;
      justify-content: space-between;
      gap: ${spacing[100]}px;

      z-index: 2; // Above the shadows
      grid-area: panel;

      border-bottom: 1px solid;
      padding-inline: ${spacing[400]}px ${spacing[200]}px;
      height: 36px;

      svg {
        width: 16px;
        height: 16px;
      }
    `,
    {
      [css`
        justify-content: flex-end;
      `]: !hasTitle,
    },
    basePanelThemeStyle[theme],
    className,
  );

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

export const panelLeftStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[200]}px;
`;

export const panelIconsStyles = css`
  display: flex;
  gap: ${spacing[100]}px;
`;

export const getPanelTitleStyles = (theme: Theme) => css`
  color: ${color[theme].text.secondary.default};
`;
