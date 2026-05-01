import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

const baseStyles = css`
  width: max-content;
  margin-left: ${spacing[500]}px;
`;

export const getPaginationStyles = ({ className }: { className?: string }) =>
  cx(baseStyles, className);
