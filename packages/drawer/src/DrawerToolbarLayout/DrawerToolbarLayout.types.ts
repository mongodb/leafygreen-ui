import React, { PropsWithChildren } from 'react';

import { GlyphName } from '@leafygreen-ui/icon';
import { DarkModeProps } from '@leafygreen-ui/lib';

import { DrawerProps } from '../Drawer/Drawer.types';

type PickedRequiredDrawerProps = Required<Pick<DrawerProps, 'displayMode'>>;
type PickedDrawerProps = Pick<DrawerProps, 'onClose'>;

interface LayoutData {
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
   * Callback function that is called when the button is clicked.
   * @param event
   * @returns void
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  /**
   * The title of the drawer.
   */
  title: string;
}

export type DrawerToolbarLayoutProps = PickedDrawerProps &
  PickedRequiredDrawerProps &
  DarkModeProps &
  PropsWithChildren<{
    data?: Array<LayoutData>;
    className?: string;
  }>;

export type DrawerToolbarLayoutContainerProps = DrawerToolbarLayoutProps;
