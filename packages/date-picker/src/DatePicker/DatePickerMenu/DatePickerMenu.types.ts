import { PopoverProps } from '@leafygreen-ui/popover';
import { PortalControlProps } from '@leafygreen-ui/popover';

export type DatePickerMenuProps = PortalControlProps &
  Pick<PopoverProps, 'refEl'> & {
    /** Whether the calendar menu popover is open */
    isOpen: boolean;

    /** The value of the component, provided in UTC time */
    value: Date | null;

    /** The month to display in the calendar grid */
    month: Date;
    // highlight: ;

    /**
     * Callback fired when the date carets are clicked,
     * or when the month/year dropdowns are modified
     */
    onMonthChange: (newMonth: Date) => void;

    /** Callback fired when a cell is clicked */
    onCellClick: (cellDate: Date) => void;
  };
