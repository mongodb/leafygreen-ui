import React from 'react';

import { DarkModeProps, HTMLElementProps, LgIdProps } from '@leafygreen-ui/lib';

export interface DrawerProps
  extends Omit<HTMLElementProps<'div'>, 'title'>,
    DarkModeProps,
    LgIdProps {
  /**
   * Determines if the Drawer is open or closed
   * @defaultValue false
   */
  open?: boolean;

  /**
   * Event handler called on close button click. If provided, a close button will be rendered in the Drawer header.
   */
  onClose?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Title of the Drawer
   */
  title: React.ReactNode;
}
