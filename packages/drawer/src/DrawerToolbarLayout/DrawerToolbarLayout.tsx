import React from 'react';
import { DrawerToolbarProvider } from '../DrawerToolbarContext';

import { DrawerToolbarLayoutProps } from './DrawerToolbarLayout.types';
import { DrawerToolbarLayoutContainer } from './DrawerToolbarLayoutContainer';

export const DrawerToolbarLayout = ({
  children,
  data = [],
  ...rest
}: DrawerToolbarLayoutProps) => {
  return (
    <DrawerToolbarProvider data={data}>
      <DrawerToolbarLayoutContainer data={data} {...rest}>
        {children}
      </DrawerToolbarLayoutContainer>
    </DrawerToolbarProvider>
  );
};

DrawerToolbarLayout.displayName = 'DrawerToolbarLayout';
