import { HTMLElementProps } from '@leafygreen-ui/lib';

import { DateRangeComponentProps } from '../DateRangeComponent';

export interface DateRangeInputProps
  extends Pick<
      DateRangeComponentProps,
      'value' | 'setValue' | 'handleValidation' | 'onChange'
    >,
    Omit<HTMLElementProps<'div'>, 'onChange'> {}
