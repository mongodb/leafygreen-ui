import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const baseStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark2};
  `,
  [Theme.Light]: css`
    background-color: ${palette.gray.base};
  `,
};

export const iconStyles = css`
  width: 53.8%;
  height: 53.8%;
`;
