import { css } from '@leafygreen-ui/emotion';

export const wizardContainerStyles = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  outline: 1px solid red;
`;

export const stepContentStyles = css`
  flex: 1;
  min-height: 0; /* Allow content to shrink */
`;
