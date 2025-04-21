import React, { PropsWithChildren } from 'react';
import { DrawerProps } from '../Drawer/Drawer.types';

type PickedDrawerProps = Pick<DrawerProps, 'displayMode' | 'onClose'>;

type LayoutData = {
  id: string;
  icon: string;
  content: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  title: string;
};

export type DrawerToolbarLayoutProps = PickedDrawerProps &
  PropsWithChildren<{
    data?: LayoutData[];

    className?: string;

    // temp
    open?: boolean;
  }>;

export type DrawerToolbarLayoutContainerProps = DrawerToolbarLayoutProps;
