import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { spacing } from '@leafygreen-ui/tokens';

export const filtersClassName = createUniqueClassName('filters');

export const baseStyles = css`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  gap: ${spacing[200]}px;
`;

export const getFiltersStyles = ({ className }: { className?: string }) =>
  cx(filtersClassName, baseStyles, className);
