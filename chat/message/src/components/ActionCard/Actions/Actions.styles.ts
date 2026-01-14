import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

const baseContainerStyles = css`
  padding: ${spacing[300]}px;
  display: flex;
  width: 100%;
  gap: ${spacing[200]}px;
`;

export const getContainerStyles = (className?: string) =>
  cx(baseContainerStyles, className);

export const buttonStyles = css`
  flex: 1;

  // Override the justify-content property in ButtonContent
  div:nth-child(2) {
    justify-content: center;
  }
`;
