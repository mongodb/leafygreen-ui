import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const tooltipStyles = css`
  svg {
    width: 26px;
    height: 26px;
  }
`;

export const getCopyButtonStyles = ({
  theme,
  copied,
  hasPanel,
}: {
  theme: Theme;
  copied: boolean;
  hasPanel: boolean;
}) =>
  cx(
    {
      [copiedThemeStyle[theme]]: copied,
      [minimalThemeStyle[theme]]: !hasPanel,
    },
    css`
      align-self: center;
    `,
  );

// export const getCopiedThemeStyles = ({isMininalButton, theme}: {isMininalButton: boolean, theme: Theme}) => cx();

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

export const minimalThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    svg {
      color: ${palette.gray.dark1};
    }
  `,
  [Theme.Dark]: css`
    svg {
      color: ${palette.gray.light1};
    }
  `,
};
