import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]}px;
`;

export const customIconStyle = css`
  display: inline-flex;
`;

export const customIconThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.green.dark2};
  `,
  [Theme.Dark]: css`
    color: ${palette.green.dark1};
  `,
};

export const overlineStyle = css`
  color: inherit;
`;
