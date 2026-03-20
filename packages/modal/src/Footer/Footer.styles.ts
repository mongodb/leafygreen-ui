import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const footerStyle = css`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: right;
  padding: ${spacing[600]}px ${spacing[900]}px ${spacing[900]}px;
`;
