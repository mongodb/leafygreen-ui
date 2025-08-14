import React from 'react';

import { DarkModeProps, HTMLElementProps, LgIdProps } from '@leafygreen-ui/lib';

/**
 * Options to control how the drawer element is displayed
 * @param Embedded will display a drawer as a `<div>` element that takes up the full parent container height and on the same elevation as container page content. It is recommended to wrap an embedded drawer within the `DrawerLayout` container
 * @param Overlay will display a drawer as a `<dialog>` element that takes up the full parent container height and elevated above container page content. It is recommended to wrap an overlay drawer within the `DrawerLayout` container
 */
export const DisplayMode = {
  Embedded: 'embedded',
  Overlay: 'overlay',
} as const;
export type DisplayMode = (typeof DisplayMode)[keyof typeof DisplayMode];

export const Size = {
  Default: 'default',
  Large: 'large',
} as const;
export type Size = (typeof Size)[keyof typeof Size];

export interface DrawerProps
  extends Omit<HTMLElementProps<'dialog' | 'div'>, 'title'>,
    DarkModeProps,
    LgIdProps {
  /**
   * Options to display the drawer element
   * @defaultValue 'overlay'
   * @param Embedded will display a drawer as a `<div>` element that takes up the full parent container height and on the same elevation as container page content. It is recommended to wrap an embedded drawer within the `DrawerLayout` container
   * @param Overlay will display a drawer as a `<dialog>` element that takes up the full parent container height and elevated above container page content. It is recommended to wrap an overlay drawer within the `DrawerLayout` container.
   * If wrapping the Drawer in a `DrawerLayout`, this prop is not needed. The Drawer read the `displayMode` prop from `DrawerLayout`.
   */
  displayMode?: DisplayMode;

  /**
   * Determines if the Drawer is open or closed. If wrapping the Drawer in a `DrawerLayout`, this prop is not needed. The Drawer read the `isDrawerOpen` prop from `DrawerLayout`.
   */
  open?: boolean;

  /**
   * Event handler called on close button click. If provided, a close button will be rendered in the Drawer header.
   */
  onClose?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Determines whether the drawer content should have its own scroll container with padding.
   * When false, the content area will not have padding or scroll behavior, allowing full-width/height content.
   * @defaultValue true
   */
  scrollable?: boolean;

  /**
   * Title of the Drawer. If the title is a string, it will be rendered as a `<h2>` element. If the title is a React node, it will be rendered as is.
   */
  title: React.ReactNode;

  /**
   * The size of the Drawer.
   * @defaultValue 'default'
   */
  size?: Size;
}
