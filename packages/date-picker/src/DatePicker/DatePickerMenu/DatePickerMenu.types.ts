import { HTMLElementProps } from '@leafygreen-ui/lib';
import { PopoverProps } from '@leafygreen-ui/popover';
import { PortalControlProps } from '@leafygreen-ui/popover';

import { DateType } from '../../types';

export type DatePickerMenuProps = PortalControlProps &
  Pick<PopoverProps, 'refEl'> &
  HTMLElementProps<'div'> & {
    /** The value of the component, provided in UTC time */
    value?: DateType;

    /** Callback fired when a cell is clicked */
    onCellClick: (cellDate: Date) => void;
  };
