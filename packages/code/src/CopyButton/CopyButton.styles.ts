import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color } from '@leafygreen-ui/tokens';

export const tooltipStyles = css`
  svg {
    width: 26px;
    height: 26px;
  }
`;

export const getCopyButtonStyles = ({
  theme,
  copied,
}: {
  theme: Theme;
  copied: boolean;
}) =>
  cx(
    {
      [copiedThemeStyle[theme]]: copied,
    },
    css`
      align-self: center;
      color: ${color[theme].icon.primary.default};
    `,
  );

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
