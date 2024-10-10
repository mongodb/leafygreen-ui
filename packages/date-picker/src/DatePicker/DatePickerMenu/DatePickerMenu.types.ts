import { HTMLElementProps } from '@leafygreen-ui/lib';
import { PopoverProps } from '@leafygreen-ui/popover';

export type DatePickerMenuProps = Omit<
  PopoverProps,
  | 'children'
  | 'dismissMode'
  | 'onToggle'
  | 'popoverZIndex'
  | 'portalClassName'
  | 'portalContainer'
  | 'portalRef'
  | 'renderMode'
  | 'scrollContainer'
> &
  HTMLElementProps<'div'>;
