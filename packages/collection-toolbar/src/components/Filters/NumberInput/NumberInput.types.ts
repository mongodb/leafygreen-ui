import { AriaLabelProps } from '@leafygreen-ui/a11y';
import { NumberInputProps as LGNumberInputProps } from '@leafygreen-ui/number-input';

export type NumberInputProps = Omit<
  LGNumberInputProps,
  'size' | 'darkMode' | 'aria-label' | 'aria-labelledby'
> &
  AriaLabelProps;
