import React, { forwardRef } from 'react';

import { consoleOnce } from '@leafygreen-ui/lib';

import { DisplayMode } from '../Drawer/Drawer.types';
import { DrawerToolbarLayout } from '../DrawerToolbarLayout';
import { LayoutComponent } from '../LayoutComponent';

import { DrawerLayoutProps } from './DrawerLayout.types';

/**
 * DrawerLayout is a component that provides a flexible layout for displaying content in a drawer.
 * It can be used in both `overlay` and `embedded` modes, with or without a toolbar.
 */
export const DrawerLayout = forwardRef<HTMLDivElement, DrawerLayoutProps>(
  (
    {
      toolbarData,
      children,
      displayMode = DisplayMode.Overlay,
      isDrawerOpen = false,
      ...rest
    }: DrawerLayoutProps,
    forwardedRef,
  ) => {
    // If there is data, we render the DrawerToolbarLayout.
    if (toolbarData) {
      return (
        <DrawerToolbarLayout
          ref={forwardedRef}
          toolbarData={toolbarData}
          displayMode={displayMode}
          {...rest}
        >
          {children}
        </DrawerToolbarLayout>
      );
    }

    consoleOnce.warn(
      'The use of a Drawer without a toolbar is discouraged. To use a Drawer with a toolbar, please provide a `data` prop with toolbar items.',
    );

    // If there is no data, we render the LayoutComponent.
    // The LayoutComponent will handle the displayMode and render the appropriate layout.
    return (
      <LayoutComponent
        ref={forwardedRef}
        displayMode={displayMode}
        isDrawerOpen={isDrawerOpen}
        {...rest}
      >
        {children}
      </LayoutComponent>
    );
  },
);

DrawerLayout.displayName = 'DrawerLayout';
