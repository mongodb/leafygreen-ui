import { AriaLabelProps } from '@leafygreen-ui/a11y';
import {
  DropdownWidthBasis as LGDropdownWidthBasis,
  SelectProps as LGSelectProps,
} from '@leafygreen-ui/select';

export type SelectProps = Omit<
  LGSelectProps,
  'size' | 'darkMode' | 'aria-label' | 'aria-labelledby' | 'ref'
> &
  AriaLabelProps;

export const DropdownWidthBasis = LGDropdownWidthBasis;
