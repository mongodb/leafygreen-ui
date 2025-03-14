import { css } from '@leafygreen-ui/emotion';
import { fontFamilies, fontWeights } from '@leafygreen-ui/tokens';

export const containerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const nameStyle = css`
  text-align: left;
`;

export const valueStyle = css`
  text-align: right;
  font-family: ${fontFamilies.default};
  font-weight: ${fontWeights.bold};
`;
