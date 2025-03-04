import React from 'react';

import { DarkModeProps, HTMLElementProps, LgIdProps } from '@leafygreen-ui/lib';

/**
 * Options to control how the drawer element is displayed
 * @param Embedded will display a drawer that takes up the full parent container height and on the same elevation as main page content. It is recommended to wrap an embedded drawer within the `EmbeddedDrawerLayout` container
 * @param Overlay will display a drawer that takes up the full viewport height and elevated above main page content
 */
export const DisplayMode = {
  Embedded: 'embedded',
  Overlay: 'overlay',
} as const;
export type DisplayMode = (typeof DisplayMode)[keyof typeof DisplayMode];

export interface DrawerProps
  extends Omit<HTMLElementProps<'dialog' | 'div'>, 'title'>,
    DarkModeProps,
    LgIdProps {
  /**
   * Options to display the drawer element
   * @defaultValue 'overlay'
   * @param embedded will display a drawer that takes up the full parent container height and on the same elevation as main page content. It is recommended to wrap a embedded drawer the `EmbeddedDrawerLayout` container
   * @param overlay will display a drawer that takes up the full viewport height and elevated above main page content
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
