import { HTMLElementProps } from '@leafygreen-ui/lib';

import { DateRangeMenuProps } from '../DateRangeMenu.types';

export interface DateRangeMenuCalendarsProps
  extends Pick<DateRangeMenuProps, 'handleValidation'>,
    HTMLElementProps<'div'> {}
