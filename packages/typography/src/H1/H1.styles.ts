import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, fontWeights } from '@leafygreen-ui/tokens';

export const h1Styles = css`
  font-weight: ${fontWeights.regular};
  font-size: 48px;
  line-height: 64px;
  font-family: ${fontFamilies.serif};
`;

export const h1Color: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.green.dark2};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
  `,
};
