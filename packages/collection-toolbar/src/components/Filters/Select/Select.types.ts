import {
  DropdownWidthBasis as LGDropdownWidthBasis,
  SelectProps as LGSelectProps,
} from '@leafygreen-ui/select';

export type SelectProps = Omit<LGSelectProps, 'size' | 'darkMode'>;
export const DropdownWidthBasis = LGDropdownWidthBasis;
