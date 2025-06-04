import React, { forwardRef } from 'react';

import { DisplayMode } from '../Drawer/Drawer.types';
import { DrawerToolbarLayout } from '../DrawerToolbarLayout';
import { LayoutComponent } from '../LayoutComponent';

import { DrawerLayoutProps } from './DrawerLayout.types';

/**
 * DrawerLayout is a component that provides a flexible layout for displaying content in a drawer.
 * It can be used in both overlay and embedded modes, with or without a toolbar.
 */
export const DrawerLayout = forwardRef<HTMLDivElement, DrawerLayoutProps>(
  (
    {
      data,
      onClose,
      children,
      displayMode = DisplayMode.Overlay,
      darkMode,
      ...rest
    }: DrawerLayoutProps,
    forwardedRef,
  ) => {
    // If there is data, we render the DrawerToolbarLayout.
    if (data) {
      return (
        <DrawerToolbarLayout
          ref={forwardedRef}
          data={data}
          onClose={onClose}
          darkMode={darkMode}
          displayMode={displayMode}
          {...rest}
        >
          {children}
        </DrawerToolbarLayout>
      );
    }

    // If there is no data, we render the LayoutComponent.
    // The LayoutComponent will handle the displayMode and render the appropriate layout.
    return (
      <LayoutComponent ref={forwardedRef} {...rest} displayMode={displayMode}>
        {children}
      </LayoutComponent>
    );
  },
);

DrawerLayout.displayName = 'DrawerLayout';
