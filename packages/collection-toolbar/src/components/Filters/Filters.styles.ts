import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  flex: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: ${spacing[200]}px;
`;

export const getFiltersStyles = ({ className }: { className?: string }) =>
  cx(baseStyles, className);
