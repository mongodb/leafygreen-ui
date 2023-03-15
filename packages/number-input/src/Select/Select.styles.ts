import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { focusRing } from '@leafygreen-ui/tokens';

export const wrapperBaseStyles = css`
  margin-left: -1px;

  &:hover,
  &:focus-within {
    z-index: 2;
  }
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

export const menuThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus-visible {
      box-shadow: ${focusRing['light'].input};
      border-color: rgba(255, 255, 255, 0);
    }
  `,
  [Theme.Dark]: css`
    &:focus-visible {
      background-color: ${palette.gray.dark4};
      box-shadow: ${focusRing['dark'].input};
      border-color: rgba(255, 255, 255, 0);
    }
  `,
};
