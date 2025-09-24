import { css } from '@leafygreen-ui/emotion';

export const wizardContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const stepContentStyles = css`
  flex: 1;
  min-height: 0; /* Allow content to shrink */
`;
