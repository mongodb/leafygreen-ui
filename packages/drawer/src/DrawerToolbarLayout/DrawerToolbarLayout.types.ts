import React from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';
import { ToolbarIconButtonProps } from '@leafygreen-ui/toolbar';

import { DrawerProps } from '../Drawer/Drawer.types';

type PickedOptionalDrawerProps = Pick<DrawerProps, 'onClose' | 'displayMode'>;
type PickedRequiredToolbarIconButtonProps = Pick<
  ToolbarIconButtonProps,
  'glyph' | 'label' | 'onClick' | 'disabled'
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
  title: React.ReactNode;

  /**
   * The content of the drawer. This is not required if the toolbar item should not open a drawer.
   */
  content: React.ReactNode;

  /**
   * Determines whether the drawer content should have its own scroll container with padding.
   * When false, the content area will not have padding or scroll behavior, allowing full-width/height content.
   * @defaultValue true
   */
  scrollable?: boolean;
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

  /**
   * Determines whether the drawer content should have its own scroll container with padding.
   * When false, the content area will not have padding or scroll behavior, allowing full-width/height content.
   * @defaultValue true
   */
  scrollable?: never;
}

export type LayoutData = LayoutWithContent | LayoutWithoutContent;

export type DrawerToolbarLayoutProps = PickedOptionalDrawerProps &
  DarkModeProps &
  LgIdProps & {
    /**
     * An array of data that will be used to render the toolbar items and the drawer content.
     */
    toolbarData: Array<LayoutData>;
    className?: string;
    children: React.ReactNode;
  };

export type DrawerToolbarLayoutContainerProps = DrawerToolbarLayoutProps;
