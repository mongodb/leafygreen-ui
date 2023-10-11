import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const disabledIconStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark2};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark1};
  `,
};

export const destructiveIconStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.red.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.red.light1};
  `,
};
