import { HTMLElementProps } from '@leafygreen-ui/lib';
import { PopoverProps, PortalControlProps } from '@leafygreen-ui/popover';

import { DateRangeComponentProps } from '../DateRangeComponent';

/**
 * Pass into the menu specific properties of ComponentProps
 * and any other `div` attributes
 */
export type DateRangeMenuProps = PortalControlProps &
  Pick<PopoverProps, 'refEl'> &
  Pick<
    DateRangeComponentProps,
    'showQuickSelection' | 'handleValidation' | 'onCancel' | 'onClear'
  > &
  HTMLElementProps<'div'> & {};
