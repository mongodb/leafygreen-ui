import {
  DropdownWidthBasis as LGDropdownWidthBasis,
  SelectProps as LGSelectProps,
} from '@leafygreen-ui/select';

import { DistributiveOmit } from '../../../shared.types';

export type SelectProps = DistributiveOmit<LGSelectProps, 'size' | 'darkMode'>;

export const DropdownWidthBasis = LGDropdownWidthBasis;
