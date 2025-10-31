import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

const baseContentStyles = css`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  padding: ${spacing[400]}px;
`;

export const getContentStyles = ({ className }: { className?: string }) =>
  cx(baseContentStyles, className);
