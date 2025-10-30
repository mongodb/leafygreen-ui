import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  addOverflowShadow,
  Side,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { tableClassName } from '../Table/Table.styles';

export const themeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.black};
  `,
  [Theme.Light]: css`
    background-color: ${palette.white};
  `,
};

export const getBaseStyles = (isSticky = false, theme: Theme) =>
  cx(
    {
      [css`
        z-index: 1;
        top: 0;
        ${addOverflowShadow({
          side: Side.Bottom,
          theme,
          isInside: false,
        })}
        position: sticky;
        .${tableClassName} & {
          ::after {
            opacity: 0;
            transition: opacity ${transitionDuration.default}ms ease-in-out;
          }
        }

        .${tableClassName}[data-is-sticky='true'] & {
          ::after {
            opacity: 1;
          }
        }
      `]: isSticky,
    },
    themeStyles[theme],
  );
