import React from 'react';

import { DarkModeProps, HTMLElementProps, LgIdProps } from '@leafygreen-ui/lib';

/**
 * Options to control how the drawer element is displayed
 * @param Overlay will display a drawer that takes up the full viewport height and elevated above main page content
 * @param Persistent will display a drawer that takes up the full parent container height and on the same elevation as main page content. It is recommended to wrap a persistent drawer within the `PersistentDrawerLayout` container
 */
export const DisplayMode = {
  Overlay: 'overlay',
  Persistent: 'persistent',
} as const;
export type DisplayMode = (typeof DisplayMode)[keyof typeof DisplayMode];

export interface DrawerProps
  extends Omit<HTMLElementProps<'div'>, 'title'>,
    DarkModeProps,
    LgIdProps {
  /**
   * Options to display the drawer element
   * @defaultValue 'overlay'
   * @param overlay will display a drawer that takes up the full viewport height and elevated above main page content
   * @param persistent will display a drawer that takes up the full parent container height and on the same elevation as main page content. It is recommended to wrap a persistent drawer the `PersistentDrawerLayout` container
   */
  displayMode?: DisplayMode;

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
