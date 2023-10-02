import { css } from '@leafygreen-ui/emotion';
import { fontWeights, spacing } from '@leafygreen-ui/tokens';

export const optionGroupStyle = css`
  padding: ${spacing[2]}px 0;
`;

export const optionGroupLabelStyle = css`
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
`;
