import { PopoverProps, PortalControlProps } from '@leafygreen-ui/popover';

import { DateRangePickerProps } from '../DateRangePicker.types';

export type DateRangeMenuProps = PortalControlProps &
  Pick<PopoverProps, 'refEl'> &
  Pick<
    DateRangePickerProps,
    'start' | 'end' | 'showQuickSelection' | 'handleValidation' // TODO: Setter
  > & {};
