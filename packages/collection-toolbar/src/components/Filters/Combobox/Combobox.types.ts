import { ComboboxProps as LGComboboxProps } from '@leafygreen-ui/combobox';

import { DistributiveOmit } from '../../../shared.types';

export type ComboboxProps<M extends boolean> = DistributiveOmit<
  LGComboboxProps<M>,
  'size' | 'darkMode'
>;
