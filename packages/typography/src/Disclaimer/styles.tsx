import { css } from '@leafygreen-ui/emotion';
import { Theme, ThemedStyles } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const disclaimerBaseStyles = css`
  display: block;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.2px;
`;

export const disclaimerTextColor: ThemedStyles = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
};
