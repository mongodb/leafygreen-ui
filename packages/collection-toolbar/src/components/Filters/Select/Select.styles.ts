import { cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';

export const selectClassName = createUniqueClassName(
  'collection-toolbar-select',
);

export const getSelectStyles = ({ className }: { className?: string }) =>
  cx(selectClassName, className);
