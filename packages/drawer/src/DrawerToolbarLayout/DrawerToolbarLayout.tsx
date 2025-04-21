import React from 'react';
import { DrawerToolbarLayoutProps } from './DrawerToolbarLayout.types';
import { DrawerToolbarLayoutContainer } from './DrawerToolbarLayoutContainer';

export const DrawerToolbarLayout = ({
  children,
  ...rest
}: DrawerToolbarLayoutProps) => {
  return (
    <DrawerToolbarLayoutContainer {...rest}>
      {children}
    </DrawerToolbarLayoutContainer>
  );
};

DrawerToolbarLayout.displayName = 'DrawerToolbarLayout';
