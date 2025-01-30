import React from 'react';

import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface DrawerProps
  extends Omit<HTMLElementProps<'div'>, 'title'>,
    DarkModeProps {
  /**
   * Determines if the Drawer is open or closed
   * @defaultValue false
   */
  open?: boolean;

  /**
   * Callback to change the open state of the Drawer
   */
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Title of the Drawer
   */
  title: React.ReactNode;
}
