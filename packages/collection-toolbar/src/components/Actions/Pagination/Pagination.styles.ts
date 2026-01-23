import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';

export const paginationClassName = createUniqueClassName('pagination');

const baseStyles = css`
  margin-left: ${spacing[500]}px;
`;

export const getPaginationStyles = ({ className }: { className?: string }) =>
  cx(paginationClassName, baseStyles, className);
