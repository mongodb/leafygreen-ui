import React, { PropsWithChildren } from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';

import { DrawerProps } from '../Drawer/Drawer.types';

import { ToolbarIconButtonProps } from '@leafygreen-ui/toolbar';

type PickedOptionalDrawerProps = Pick<DrawerProps, 'onClose' | 'displayMode'>;
type PickedRequiredToolbarIconButtonProps = Pick<
  ToolbarIconButtonProps,
  'glyph' | 'label' | 'onClick'
>;

interface LayoutBase extends PickedRequiredToolbarIconButtonProps {
  /**
   * The id of the layout. This is used to open the drawer.
   */
  id: string;
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

export type DrawerToolbarLayoutProps = PickedOptionalDrawerProps &
  DarkModeProps &
  LgIdProps &
  PropsWithChildren<{
    /**
     * An array of data that will be used to render the toolbar items and the drawer content.
     */
    data?: Array<LayoutData>;
    className?: string;
  }>;

export type DrawerToolbarLayoutContainerProps = DrawerToolbarLayoutProps;
