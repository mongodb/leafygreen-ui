import React from 'react';

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
  React.ComponentPropsWithRef<'div'>;
