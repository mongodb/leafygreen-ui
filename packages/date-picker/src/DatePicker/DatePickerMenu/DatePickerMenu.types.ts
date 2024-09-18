import { HTMLElementProps } from '@leafygreen-ui/lib';
import { PopoverProps } from '@leafygreen-ui/popover';

export type DatePickerMenuProps = Omit<
  PopoverProps,
  'children' | 'renderMode' | 'usePortal'
> &
  HTMLElementProps<'div'>;
