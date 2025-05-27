import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import React from 'react';
import { DisplayMode } from '../Drawer/Drawer.types';

import { DrawerToolbarProvider } from '../DrawerToolbarContext';

import { DrawerToolbarLayoutProps } from './DrawerToolbarLayout.types';
import { DrawerToolbarLayoutContainer } from './DrawerToolbarLayoutContainer';

export const DrawerToolbarLayout = ({
  children,
  data = [],
  darkMode: darkModeProp,
  displayMode = DisplayMode.Overlay,
  ...rest
}: DrawerToolbarLayoutProps) => {
  const { darkMode } = useDarkMode(darkModeProp);
  return (
    <DrawerToolbarProvider data={data}>
      <LeafyGreenProvider darkMode={darkMode}>
        <DrawerToolbarLayoutContainer
          data={data}
          displayMode={displayMode}
          {...rest}
        >
          {children}
        </DrawerToolbarLayoutContainer>
      </LeafyGreenProvider>
    </DrawerToolbarProvider>
  );
};

DrawerToolbarLayout.displayName = 'DrawerToolbarLayout';
