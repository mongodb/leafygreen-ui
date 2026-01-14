import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${spacing[100]}px;
`;

export const getActionStyles = ({ className }: { className?: string }) =>
  cx(baseStyles, className);
