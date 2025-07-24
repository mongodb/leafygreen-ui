import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

import { DrawerToolbarLayoutProps } from '../DrawerToolbarLayout';

import { DrawerProps } from '../Drawer/Drawer.types';

type PickedDrawerProps = Pick<DrawerProps, 'onClose'>;

export interface BaseDrawerLayoutPropsWithoutDisplayMode
  extends HTMLElementProps<'div'>,
    DarkModeProps,
    PickedDrawerProps {
  children: React.ReactNode;
}

export interface BaseDrawerLayoutEmbeddedProps
  extends BaseDrawerLayoutPropsWithoutDisplayMode {
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
  extends BaseDrawerLayoutPropsWithoutDisplayMode {
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

export type DrawerLayoutPropsWithoutToolbar = {
  /**
   * An array of data that will be used to render the toolbar items and the drawer content.
   */
  toolbarData?: never;

  /**
   * Determines if the Drawer is open. This is only needed if using the Drawer without a toolbar. This will shift the layout to the right by the width of the drawer if `displayMode` is set to 'embedded'.
   */
  isDrawerOpen?: boolean;

  /**
   * The drawer component to be rendered in the layout.
   */
  drawer?: React.ReactNode;
} & BaseDrawerLayoutProps;

export type DrawerLayoutPropsWithToolbar = {
  /**
   * An array of data that will be used to render the toolbar items and the drawer content.
   */
  toolbarData: DrawerToolbarLayoutProps['toolbarData'];

  /**
   * Determines if the Drawer is open. This is only needed if using the Drawer without a toolbar. This will shift the layout to the right by the width of the drawer if `displayMode` is set to 'embedded'.
   */
  isDrawerOpen?: never;

  /**
   * The drawer component to be rendered in the layout.
   */
  drawer?: never;
} & BaseDrawerLayoutProps;

export type DrawerLayoutProps =
  | DrawerLayoutPropsWithToolbar
  | DrawerLayoutPropsWithoutToolbar;
