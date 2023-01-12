import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const baseStyles = css`
  border-spacing: 0;
  border-collapse: separate;
  table-layout: fixed;
  width: 100%;
`;

export const themeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
  `,
  [Theme.Light]: css`
    color: ${palette.gray.dark3};
  `,
};