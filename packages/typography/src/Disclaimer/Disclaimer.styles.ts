import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color } from '@leafygreen-ui/tokens';

export const disclaimerTextColor: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${color.light.text.secondary.default};
  `,
  [Theme.Dark]: css`
    color: ${color.dark.text.secondary.default};
  `,
};

export const disclaimerStyles = css`
  display: block;
  font-size: 11px;
  line-height: 16px;
  letter-spacing: 0.2px;
`;
