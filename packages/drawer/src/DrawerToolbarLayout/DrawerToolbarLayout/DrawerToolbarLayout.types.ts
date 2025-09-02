import React from 'react';

import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';
import { ToolbarIconButtonProps } from '@leafygreen-ui/toolbar';

type PickedRequiredToolbarIconButtonProps = Pick<
  ToolbarIconButtonProps,
  'glyph' | 'label' | 'onClick' | 'disabled'
>;

interface LayoutBase extends PickedRequiredToolbarIconButtonProps {
  /**
   * The id of the layout. This is used to open the drawer.
   */
  id: string;

  /**
   * Determines if the current toolbar item is visible. If all toolbar items have `visible` set to `false`, the toolbar will not be rendered.
   * @defaultValue true
   */
  visible?: boolean;
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
   * Determines whether the drawer content should have padding.
   * When false, the content area will not have padding, allowing full-width/height content.
   * @defaultValue true
   */
  hasPadding?: boolean;

  /**
   * Determines whether the drawer content should have its own scroll container.
   * When false, the content area will not have scroll behavior.
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
   * Determines whether the drawer content should have padding.
   * When false, the content area will not have padding, allowing full-width/height content.
   * @defaultValue true
   */
  hasPadding?: never;

  /**
   * Determines whether the drawer content should have its own scroll container.
   * When false, the content area will not have scroll behavior.
   * @defaultValue true
   */
  scrollable?: never;
}

export type LayoutData = LayoutWithContent | LayoutWithoutContent;

export type DrawerToolbarLayoutProps = DarkModeProps &
  LgIdProps & {
    className?: string;
    children: React.ReactNode;
  };

export type DrawerToolbarLayoutContentProps = DrawerToolbarLayoutProps;
