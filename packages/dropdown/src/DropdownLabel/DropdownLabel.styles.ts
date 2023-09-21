import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontWeights } from '@leafygreen-ui/tokens';

export const groupStyle = css`
  padding: 8px 0;
`;

export const labelStyle = css`
  cursor: default;
  width: 100%;
  padding: 0 12px 2px;
  outline: none;
  overflow-wrap: anywhere;
  font-size: 12px;
  line-height: 16px;
  font-weight: ${fontWeights.bold};
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: ${palette.gray.dark1};
`;
