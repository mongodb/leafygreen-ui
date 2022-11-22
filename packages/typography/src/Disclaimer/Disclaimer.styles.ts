import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const disclaimerTextColor: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
};

export const disclaimerStyles = css`
  display: block;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.2px;
`;
