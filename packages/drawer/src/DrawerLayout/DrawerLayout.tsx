import React, { forwardRef } from 'react';

import { consoleOnce } from '@leafygreen-ui/lib';

import { DisplayMode } from '../Drawer/Drawer.types';
import { DrawerToolbarLayout } from '../DrawerToolbarLayout';
import { LayoutComponent } from '../LayoutComponent';

import { DrawerLayoutProps } from './DrawerLayout.types';
import { DrawerLayoutProvider } from './DrawerLayoutContext';

/**
 * `DrawerLayout` is a component that provides a flexible layout for displaying content in a drawer.
 * It can be used in both `overlay` and `embedded` modes, with or without a `Toolbar`.
 */
export const DrawerLayout = forwardRef<HTMLDivElement, DrawerLayoutProps>(
  (
    {
      toolbarData,
      children,
      displayMode = DisplayMode.Overlay,
      isDrawerOpen = false,
      resizable = false,
      ...rest
    }: DrawerLayoutProps,
    forwardedRef,
  ) => {
    // If there is data, we render the DrawerToolbarLayout.
    if (toolbarData) {
      return (
        <DrawerLayoutProvider
          isDrawerOpen={isDrawerOpen}
          resizable={resizable}
          displayMode={displayMode}
        >
          <DrawerToolbarLayout
            ref={forwardedRef}
            toolbarData={toolbarData}
            displayMode={displayMode}
            {...rest}
          >
            {children}
          </DrawerToolbarLayout>
        </DrawerLayoutProvider>
      );
    }

    consoleOnce.warn(
      'Using a Drawer without a toolbar is not recommended. To include a toolbar, pass a toolbarData prop containing the desired toolbar items.',
    );

    // If there is no data, we render the LayoutComponent.
    // The LayoutComponent will read the displayMode and render the appropriate layout.
    return (
      <DrawerLayoutProvider
        isDrawerOpen={isDrawerOpen}
        resizable={resizable}
        displayMode={displayMode}
      >
        <LayoutComponent
          ref={forwardedRef}
          displayMode={displayMode}
          isDrawerOpen={isDrawerOpen}
          {...rest}
        >
          {children}
        </LayoutComponent>
      </DrawerLayoutProvider>
    );
  },
);

DrawerLayout.displayName = 'DrawerLayout';
