import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const quickSelectMenuStyles = css`
  padding: ${spacing[4]}px;
  // TODO: Fix the menu vs clear button z-index
`;

export const quickSelectMenuThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.gray.light3};
    border-inline-end: 1px solid ${palette.gray.light2};
  `,
  [Theme.Dark]: css`
    // TODO:
  `,
};
