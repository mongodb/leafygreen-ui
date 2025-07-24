import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { DrawerToolbarLayoutProps } from '../DrawerToolbarLayout';
import { LayoutComponentProps } from '../LayoutComponent';

export interface BaseDrawerLayoutPropsWihtoutDisplayMode
  extends HTMLElementProps<'div'>,
    DarkModeProps {
  children: React.ReactNode;
}

export interface BaseDrawerLayoutEmbeddedProps
  extends BaseDrawerLayoutPropsWihtoutDisplayMode {
  /**
   * Options to display the drawer element
   * @param Embedded will display a drawer as a `<div>` element that takes up the full parent container height and on the same elevation as container page content. It is recommended to wrap an embedded drawer within the `DrawerLayout` container
   * @param Overlay will display a drawer as a `<dialog>` element that takes up the full parent container height and elevated above container page content.
   *
   */
  displayMode?: 'embedded';

  /**
   * Determines if the drawer is resiazable. This is only recommened for individual drawers, not stacked drawers.
   *
   * @defaultValue false
   */
  resizable?: boolean;
}

export interface BaseDrawerLayoutOverlayProps
  extends BaseDrawerLayoutPropsWihtoutDisplayMode {
  /**
   * Options to display the drawer element
   * @param Embedded will display a drawer as a `<div>` element that takes up the full parent container height and on the same elevation as container page content. It is recommended to wrap an embedded drawer within the `DrawerLayout` container
   * @param Overlay will display a drawer as a `<dialog>` element that takes up the full parent container height and elevated above container page content.
   *
   */
  displayMode?: 'overlay';

  /**
   * Determines if the drawer is resiazable. This is only recommened for individual drawers, not stacked drawers.
   *
   * @defaultValue false
   */
  resizable?: never;
}

export type BaseDrawerLayoutProps =
  | BaseDrawerLayoutEmbeddedProps
  | BaseDrawerLayoutOverlayProps;

export type DrawerLayoutPropsWithoutToolbar = Omit<
  LayoutComponentProps,
  'displayMode' | 'isDrawerOpen'
> & {
  /**
   * An array of data that will be used to render the toolbar items and the drawer content.
   */
  toolbarData?: never;

  /**
   * Event handler called on close button click. If provided, a close button will be rendered in the Drawer header.
   */
  onClose?: never;

  /**
   * Determines if the Drawer is open. This is only needed if using the Drawer without a toolbar. This will shift the layout to the right by the width of the drawer if `displayMode` is set to 'embedded'.
   */
  isDrawerOpen?: boolean;

  /**
   * The drawer component to be rendered in the layout.
   */
  drawer?: React.ReactNode;
} & BaseDrawerLayoutProps;

export type DrawerLayoutPropsWithToolbar = Omit<
  DrawerToolbarLayoutProps,
  'displayMode'
> & {
  /**
   * Determines if the Drawer is open. This is only needed if using the Drawer without a toolbar. This will shift the layout to the right by the width of the drawer if `displayMode` is set to 'embedded'.
   */
  isDrawerOpen?: never;
} & BaseDrawerLayoutProps;

export type DrawerLayoutProps =
  | DrawerLayoutPropsWithToolbar
  | DrawerLayoutPropsWithoutToolbar;
