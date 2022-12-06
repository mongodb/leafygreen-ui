import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const baseStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
`;

export const themeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    border-bottom: 1px solid ${palette.gray.light2};
    color: ${palette.green.dark2};

    &:first-of-type {
      border-top: 1px solid ${palette.gray.light2};
    }
  `,
  [Theme.Dark]: css`
    border-bottom: 1px solid ${palette.gray.dark2};
    color: ${palette.green.dark1};

    &:first-of-type {
      border-top: 1px solid ${palette.gray.dark2};
    }
  `,
};

export const activeThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.green.light3};
  `,
  [Theme.Dark]: css`
    color: ${palette.white};
    background-color: ${palette.green.dark3};
  `,
};
