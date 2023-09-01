import { transparentize } from 'polished';

import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

const baseStyles = css`
  padding: ${spacing[3]}px;
  padding-top: ${spacing[4]}px;
  border-radius: ${spacing[2] + spacing[1]}px;
  outline: 1px solid;
  outline-offset: -1px;
  box-shadow: 0 4px 7px ${transparentize(0.85, palette.black)};
`;

export const menuStyles: Record<Theme, string> = {
  [Theme.Light]: cx(
    baseStyles,
    css`
      background-color: ${palette.white};
      outline-color: ${palette.gray.light2};
    `,
  ),
  [Theme.Dark]: cx(
    baseStyles,
    css`
      background-color: ${palette.gray.dark3};
      outline-color: ${palette.gray.dark2};
    `,
  ),
};
