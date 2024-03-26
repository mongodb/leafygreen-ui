import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  margin-bottom: ${spacing[4]}px;
  transition: opacity ${transitionDuration.slower}ms ease-in;
`;

export const labelStyles = css`
  margin-bottom: ${spacing[2]}px;
`;

export const labelThemeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
};
