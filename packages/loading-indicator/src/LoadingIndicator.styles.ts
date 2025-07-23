import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const descriptionThemeColor = {
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
};
