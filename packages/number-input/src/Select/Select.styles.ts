import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { menuButtonTextClassName } from '@leafygreen-ui/select';
import { focusRing } from '@leafygreen-ui/tokens';

export const wrapperBaseStyles = css`
  margin-left: -1px;

  &:hover,
  &:focus-within {
    z-index: 2;
  }
`;

export const customMenuButtonWrapperStyles = css`
  position: relative;
`;

export const menuBaseStyles = css`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;

  .${menuButtonTextClassName} {
    text-transform: uppercase;
  }
`;

export const menuThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &,
    &:focus-visible,
    &:hover {
      background-color: ${palette.gray.light2};
    }

    &:focus {
      box-shadow: inherit;
    }

    &:focus-visible {
      box-shadow: ${focusRing['light'].input};
      border-color: rgba(255, 255, 255, 0);
    }
  `,
  [Theme.Dark]: css`
    &,
    &:focus-visible,
    &:hover {
      background-color: ${palette.gray.dark2};
    }

    &:focus {
      box-shadow: inherit;
    }

    &:focus-visible {
      background-color: ${palette.gray.dark4};
      box-shadow: ${focusRing['dark'].input};
      border-color: rgba(255, 255, 255, 0);
    }
  `,
};

export const selectDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    button {
      background-color: ${palette.gray.light2};
      border-color: ${palette.gray.light1};
    }
  `,
  [Theme.Dark]: css`
    button {
      background-color: ${palette.gray.dark4};
      border-color: ${palette.gray.dark3};
    }
  `,
};

export const selectStyles = css`
  > div {
    display: flex;
  }
`;
