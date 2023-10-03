import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { focusRing, transitionDuration } from '@leafygreen-ui/tokens';

export const themeColor: Record<
  Theme,
  {
    iconBackgroundColor: string;
    iconBackgroundHoverColor: string;
  }
> = {
  [Theme.Dark]: {
    iconBackgroundColor: palette.gray.light1,
    iconBackgroundHoverColor: palette.gray.light2,
  },
  [Theme.Light]: {
    iconBackgroundColor: palette.gray.dark1,
    iconBackgroundHoverColor: palette.gray.dark2,
  },
};

export const iconBaseStyles = css`
  display: flex;
  cursor: pointer;
  transition: all ${transitionDuration.default}ms ease-in-out;
`;

export const iconThemeStyles = (theme: Theme) => css`
  color: ${themeColor[theme].iconBackgroundColor};

  &:hover {
    color: ${themeColor[theme].iconBackgroundHoverColor};
  }

  &:focus-visible {
    box-shadow: ${focusRing[theme].default};
    outline: none;
    border-radius: 50%;
  }
`;
