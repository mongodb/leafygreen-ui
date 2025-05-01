import React, { PropsWithChildren } from 'react';

import { DrawerProps } from '../Drawer/Drawer.types';

type PickedRequiredDrawerProps = Required<Pick<DrawerProps, 'displayMode'>>;
type PickedDrawerProps = Pick<DrawerProps, 'onClose'>;

interface LayoutData {
  id: string;
  icon: string;
  content: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  title: string;
}

export type DrawerToolbarLayoutProps = PickedDrawerProps &
  PickedRequiredDrawerProps &
  PropsWithChildren<{
    data?: Array<LayoutData>;
    className?: string;
  }>;

export type DrawerToolbarLayoutContainerProps = DrawerToolbarLayoutProps;
