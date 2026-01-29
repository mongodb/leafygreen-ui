import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing[200]}px;
  padding: ${spacing[200]}px ${spacing[600]}px;
`;

export const collapsibleContentStyles = css`
  flex: 100%;
  display: grid;
  gap: ${spacing[200]}px;
`;

export const getCollectionToolbarStyles = ({
  className,
}: {
  className?: string;
}) => cx(baseStyles, className);
