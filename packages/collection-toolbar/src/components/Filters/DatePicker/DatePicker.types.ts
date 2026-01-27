import { AriaLabelProps } from '@leafygreen-ui/a11y';
import { DatePickerProps as LGDatePickerProps } from '@leafygreen-ui/date-picker';

export type DatePickerProps = Omit<
  LGDatePickerProps,
  'size' | 'darkMode' | 'aria-label' | 'aria-labelledby'
> &
  AriaLabelProps;
