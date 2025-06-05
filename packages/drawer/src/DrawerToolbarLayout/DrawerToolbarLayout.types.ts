import React from 'react';

import { GlyphName } from '@leafygreen-ui/icon';
import { DarkModeProps } from '@leafygreen-ui/lib';

import { DrawerProps } from '../Drawer/Drawer.types';

type PickedOptionalDrawerProps = Pick<DrawerProps, 'onClose' | 'displayMode'>;

export interface LayoutData {
  /**
   * The id of the layout. This is used to open the drawer.
   */
  id: string;

  /**
   * The LG Icon that will render in the ToolbarIcon.
   */
  glyph: GlyphName;

  /**
   * The content of the drawer.
   */
  content: React.ReactNode;

  /**
   * The text that will render in the tooltip on hover.
   */
  label: React.ReactNode;

  /**
   * Callback function that is called when the toolbar item is clicked.
   * @param event
   * @returns void
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * The title of the drawer.
   */
  title: string;
}

export type DrawerToolbarLayoutProps = PickedOptionalDrawerProps &
  DarkModeProps & {
    /**
     * An array of data that will be used to render the toolbar items and the drawer content.
     */
    toolbarData: Array<LayoutData>;
    className?: string;
    children: React.ReactNode;
  };

export type DrawerToolbarLayoutContainerProps = DrawerToolbarLayoutProps;
