import { HTMLElementProps } from '@leafygreen-ui/lib';

import { DateRangeComponentProps } from '../DateRangeComponent';

/**
 * We pass into the Input specific properties of ComponentProps
 * and any other `div` attributes
 */
export interface DateRangeInputProps
  extends Pick<DateRangeComponentProps, 'onChange'>,
    Omit<HTMLElementProps<'div'>, 'onChange'> {}
