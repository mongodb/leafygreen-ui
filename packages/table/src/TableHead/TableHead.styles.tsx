import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const themeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.black};
    box-shadow: 0 4px ${palette.gray.dark2};
  `,
  [Theme.Light]: css`
    background-color: ${palette.white};
    box-shadow: 0 4px ${palette.gray.light2};
  `,
};

export const getBaseStyles = (isSticky = false, theme: Theme) =>
  cx(
    {
      [css`
        position: sticky;
        z-index: 1;
        top: 0;

        table[data-is-sticky='true'] & {
          color: red;
        }
      `]: isSticky,
    },
    themeStyles[theme],
  );
