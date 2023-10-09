import { PopoverProps, PortalControlProps } from '@leafygreen-ui/popover';

import { DateRangePickerProps } from '../DateRangePicker.types';

export type DateRangeMenuProps = PortalControlProps &
  Pick<PopoverProps, 'refEl'> &
  Pick<
    DateRangePickerProps,
    'value' | 'onChange' | 'showQuickSelection' | 'handleValidation' // TODO: Setter
  > & {};
