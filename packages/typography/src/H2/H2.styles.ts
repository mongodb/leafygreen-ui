import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { Theme } from '@leafygreen-ui/lib';

export const h2Styles = css`
  font-size: 32px;
  line-height: 40px;
  font-weight: 400;
  font-family: ${fontFamilies.serif};
`;

export const h2Color: Record<Theme, string> = {
    [Theme.Light]: css`
    color: ${palette.green.dark2};
  `,
    [Theme.Dark]: css`
    color: ${palette.green.light1};
  `,
};