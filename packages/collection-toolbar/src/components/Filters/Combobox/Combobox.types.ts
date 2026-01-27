import { ComboboxProps as LGComboboxProps } from '@leafygreen-ui/combobox';

export type ComboboxProps<M extends boolean> = Omit<LGComboboxProps<M>, 'size'>;
