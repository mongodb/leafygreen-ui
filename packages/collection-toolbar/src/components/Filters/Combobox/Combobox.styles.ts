import { cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';

export const comboboxClassName = createUniqueClassName(
  'collection-toolbar-combobox',
);

export const getComboboxStyles = ({ className }: { className?: string }) =>
  cx(comboboxClassName, className);
