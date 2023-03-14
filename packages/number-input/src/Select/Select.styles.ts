import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const wrapperBaseStyles = css`
  margin-left: -1px;
`;

export const baseStyles = css`
  button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export const themeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    button {
      &,
      &:focus-visible,
      &:hover {
        background-color: ${palette.gray.light2};
      }
    }
  `,
  [Theme.Dark]: css`
    button {
      &,
      &:focus-visible,
      &:hover {
        background-color: ${palette.gray.dark2};
      }
    }
  `,
};
