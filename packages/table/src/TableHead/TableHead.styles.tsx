import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transitionDuration } from '@leafygreen-ui/tokens';

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

        tr {
          background-color: inherit;
        }

        table & {
          :after {
            content: '';
            position: absolute;
            z-index: -1;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 96%;
            height: 50%;
            box-shadow: 0px 9px 20px 9px rgba(0, 30, 43, 0.2);
            /* box-shadow: 0px 6px 30px 17px rgba(0, 0, 0, 0.3); */
            border-radius: 40%;
            opacity: 0;
            transition: opacity ${transitionDuration.default}ms ease-in-out;
          }
        }

        table[data-is-sticky='true'] & {
          :after {
            opacity: 1;
          }
        }
      `]: isSticky,
    },
    themeStyles[theme],
  );
