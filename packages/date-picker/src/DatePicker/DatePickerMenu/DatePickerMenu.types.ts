import { HTMLElementProps } from '@leafygreen-ui/lib';
import { PopoverProps } from '@leafygreen-ui/popover';
import { PortalControlProps } from '@leafygreen-ui/popover';

export type DatePickerMenuProps = PortalControlProps &
  Omit<PopoverProps, 'children'> &
  HTMLElementProps<'div'>;
