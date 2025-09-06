import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

const baseContainerStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[200]}px ${spacing[300]}px;
`;

export const getContainerStyles = (className?: string) =>
  cx(baseContainerStyles, className);
