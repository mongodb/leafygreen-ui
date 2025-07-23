import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, fontWeights } from '@leafygreen-ui/tokens';

export const h2Styles = css`
  font-size: 32px;
  line-height: 40px;
  font-weight: ${fontWeights.regular};
  font-family: ${fontFamilies.serif};
`;

export const h2Color: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.green.dark2};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
  `,
};
