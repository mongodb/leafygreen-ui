import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

// util style
export const flexContainerStyles = css`
  display: flex;
  gap: ${spacing[1]}px;
`;

// used in conjunction with flexContainerStyles
export const baseStyles = css`
  justify-content: space-between;
`;
