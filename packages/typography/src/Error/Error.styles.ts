import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';

export const errorMessageStyle = css`
  font-family: ${fontFamilies.default};
  font-weight: normal;
  font-size: inherit;
  line-height: inherit;
`;

export const errorMessageModeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.red.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.red.light1};
  `,
};
