import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { menuButtonTextClassName } from '@leafygreen-ui/select';
import { focusRing } from '@leafygreen-ui/tokens';

export const wrapperStyles = css`
  position: relative;
`;

export const baseStyles = css`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  .${menuButtonTextClassName} {
    text-transform: uppercase;
  }
`;

export const themeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.gray.light3};

    &:focus-visible,
    &:hover {
      background-color: ${palette.white};
    }

    &:focus {
      box-shadow: inherit;
    }

    &:focus-visible {
      box-shadow: ${focusRing['light'].input};
      border-color: ${palette.white};
    }
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark2};

    &:focus-visible,
    &:hover {
      background-color: ${palette.gray.dark1};
    }

    &:focus {
      box-shadow: inherit;
    }

    &:focus-visible {
      box-shadow: ${focusRing['dark'].input};
      border-color: ${palette.gray.dark4};
    }
  `,
};

export const themeDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &:hover {
      box-shadow: unset;
    }

    &:focus {
      box-shadow: ${focusRing['light'].input};
      border-color: ${palette.white};
    }

    &:focus-visible,
    &:hover {
      background-color: ${palette.gray.light2};
    }
  `,
  [Theme.Dark]: css`
    &:hover {
      box-shadow: unset;
      background-color: ${palette.gray.dark4};
      border-color: ${palette.gray.dark3};
    }

    &:focus {
      background-color: ${palette.gray.dark4};
      box-shadow: ${focusRing['dark'].input};
      border-color: ${palette.gray.dark4};
    }
  `,
};
