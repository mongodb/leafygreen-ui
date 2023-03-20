import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const copiedThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.white};
    background-color: ${palette.green.dark1};

    &:focus,
    &:hover {
      color: ${palette.white};

      &:before {
        background-color: ${palette.green.dark1};
      }
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark3};
    background-color: ${palette.green.base};

    &:focus,
    &:hover {
      color: ${palette.gray.dark3};

      &:before {
        background-color: ${palette.green.base};
      }
    }
  `,
};

export const copyButtonThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    align-self: center;
    color: ${palette.gray.base};
  `,
  [Theme.Dark]: css`
    align-self: center;
    color: ${palette.gray.light1};
  `,
};
