import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

const baseContainerStyles = css`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: ${spacing[200]}px;
`;

export const getContainerStyles = (className?: string) =>
  cx(baseContainerStyles, className);
