import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';

export const searchInputClassName = createUniqueClassName('collection-toolbar-search-input');

export const baseStyles = css`
  flex: 1;
`;

export const getSearchInputStyles = ({ className }: { className?: string }) => {
  return cx(searchInputClassName, baseStyles, className);
};
