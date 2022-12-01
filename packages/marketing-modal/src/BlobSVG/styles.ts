import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const blobBaseStyles = css`
  position: absolute;
  z-index: -1;
`;

export const blobThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.purple.light3};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark3};
  `,
};
