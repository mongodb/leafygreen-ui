import React, { PropsWithChildren } from 'react';

import { GlyphName } from '@leafygreen-ui/icon';
import { DarkModeProps } from '@leafygreen-ui/lib';

import { DrawerProps } from '../Drawer/Drawer.types';

type PickedRequiredDrawerProps = Required<Pick<DrawerProps, 'displayMode'>>;
type PickedDrawerProps = Pick<DrawerProps, 'onClose'>;

interface LayoutData {
  id: string;
  glyph: GlyphName;
  content: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
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
