import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';
import { ComboboxProps as LGComboboxProps } from '@leafygreen-ui/combobox';

export type ComboboxProps<M extends boolean> = Omit<
  LGComboboxProps<M>,
  'size' | 'darkMode'
> &
  AriaLabelPropsWithLabel;
