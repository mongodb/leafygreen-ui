import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, transitionDuration } from '@leafygreen-ui/tokens';

export const getCopyButtonStyles = ({
  theme,
  copied,
  showPanel,
  className,
}: {
  theme: Theme;
  copied: boolean;
  showPanel: boolean;
  className?: string;
}) =>
  cx(
    css`
      align-self: center;

      &[aria-disabled='false'] {
        color: ${color[theme].icon.primary.default};
      }

      div[role='tooltip'] svg {
        width: 26px;
        height: 26px;
      }

      &,
      & > div > svg {
        transition: all ${transitionDuration.default}ms ease-in-out;
      }
    `,
    {
      [copiedThemeStyle[theme]]: copied,
      [minimalButtonThemeStyle[theme]]: !showPanel,
    },
    className,
  );

export const copiedThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &,
    & > div > svg {
      color: ${palette.white};

      &:focus,
      &:hover {
        color: ${palette.white};
      }
    }

    background-color: ${palette.green.dark1};

    &:focus,
    &:hover {
      background-color: ${palette.green.dark1};
      &:before {
        background-color: ${palette.green.dark1};
      }
    }
  `,
  [Theme.Dark]: css`
    &,
    & > div > svg {
      color: ${palette.gray.dark3};

      &:focus,
      &:hover {
        color: ${palette.gray.dark3};
      }
    }

    background-color: ${palette.green.base};

    &:focus,
    &:hover {
      background-color: ${palette.green.base};

      &:before {
        background-color: ${palette.green.base};
      }
    }
  `,
};

export const getMinimalButtonCopiedStyles = ({
  theme,
}: {
  theme: Theme;
}) => css`
  border-color: ${color[theme].icon.primary.default};
`;

export const minimalButtonThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    border-color: ${palette.gray.base};
  `,
  [Theme.Dark]: css`
    border-color: ${palette.gray.light2};
  `,
};
