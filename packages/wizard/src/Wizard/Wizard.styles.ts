import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const wizardContainerStyles = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing[600]}px;
`;

export const stepContentStyles = css`
  flex: 1;
  min-height: 0; /* Allow content to shrink */
`;
