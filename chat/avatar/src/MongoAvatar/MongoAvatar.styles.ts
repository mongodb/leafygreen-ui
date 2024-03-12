import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const baseStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.green.dark3};
  `,
  [Theme.Light]: css`
    background-color: ${palette.black};
  `,
};

export const logoMarkStyles = css`
  height: 61.5%; // set to percentage to keep it responsive to all sizeOverride values
`;
