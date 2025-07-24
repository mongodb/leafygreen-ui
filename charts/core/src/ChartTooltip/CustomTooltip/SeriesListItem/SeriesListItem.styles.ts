import { css } from '@leafygreen-ui/emotion';
import { fontFamilies, fontWeights, spacing } from '@leafygreen-ui/tokens';

export const containerStyle = css`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${spacing[500]}px;
`;

export const nameStyle = css`
  display: grid;
  grid-template-columns: auto 1fr;
  text-align: left;
  overflow: hidden;
`;

export const valueStyle = css`
  text-align: right;
  font-family: ${fontFamilies.default};
  font-weight: ${fontWeights.semiBold};
`;
