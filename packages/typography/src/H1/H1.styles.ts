import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { Theme } from '@leafygreen-ui/lib';

export const h1Styles = css`
  font-weight: 400;
  font-size: 48px;
  line-height: 62px;
  font-family: ${fontFamilies.serif};
`;

export const h1Color: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.green.dark2};
  `,
  [Theme.Dark]: css`
    color: ${palette.green.light1};
  `,
};
