import React, { PropsWithChildren } from 'react';

import { GlyphName } from '@leafygreen-ui/icon';
import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';

import { DrawerProps } from '../Drawer/Drawer.types';

type PickedRequiredDrawerProps = Required<Pick<DrawerProps, 'displayMode'>>;
type PickedDrawerProps = Pick<DrawerProps, 'onClose'>;

interface LayoutBase {
  /**
   * The id of the layout. This is used to open the drawer.
   */
  id: string;

  /**
   * The LG Icon that will render in the ToolbarIcon.
   */
  glyph: GlyphName;

  /**
   * The text that will render in the tooltip on hover
   */
  label: React.ReactNode;

  /**
   * Callback function that is called when the button is clicked.
   * @param event
   * @returns void
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface LayoutWithContent extends LayoutBase {
  /**
   * The title of the drawer. This is not required if the toolbar item should not open a drawer.
   */
  title: string;

  /**
   * The content of the drawer. This is not required if the toolbar item should not open a drawer.
   */
  content: React.ReactNode;
}

interface LayoutWithoutContent extends LayoutBase {
  /**
   * The title of the drawer. This is not required if the toolbar item should not open a drawer.
   */
  title?: never;

  /**
   * The content of the drawer. This is not required if the toolbar item should not open a drawer.
   */
  content?: never;
}

export type LayoutData = LayoutWithContent | LayoutWithoutContent;

export type DrawerToolbarLayoutProps = PickedDrawerProps &
  PickedRequiredDrawerProps &
  DarkModeProps &
  LgIdProps &
  PropsWithChildren<{
    data?: Array<LayoutData>;
    className?: string;
  }>;

export type DrawerToolbarLayoutContainerProps = DrawerToolbarLayoutProps;
