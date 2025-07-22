import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { DrawerProps } from '../Drawer/Drawer.types';
import { DrawerToolbarLayoutProps } from '../DrawerToolbarLayout';
import { LayoutComponentProps } from '../LayoutComponent';

export type PickedDrawerProps = Pick<DrawerProps, 'displayMode'>;

export interface BaseDrawerLayoutProps
  extends PickedDrawerProps,
    HTMLElementProps<'div'>,
    DarkModeProps {
  children: React.ReactNode;

  /**
   * Determines if the drawer is resiazable. This is only recommened for individual drawers, not stacked drawers.
   *
   * @defaultValue false
   */
  resizable?: boolean;
}

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
  isDrawerOpen?: boolean; // TODO: this is only needed for embedded drawers

  /**
   * The drawer
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
