import { HTMLElementProps } from '@leafygreen-ui/lib';
import { PopoverProps } from '@leafygreen-ui/popover';
import { PortalControlProps } from '@leafygreen-ui/popover';

import { DatePickerProps } from '..';

export type DatePickerMenuProps = PortalControlProps &
  Pick<PopoverProps, 'refEl'> &
  Pick<DatePickerProps, 'handleValidation' | 'value'> &
  HTMLElementProps<'div'> & {
    /** Callback fired when a cell is clicked */
    onCellClick: (cellDate: Date) => void;
  };
