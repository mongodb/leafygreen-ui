import React, { forwardRef } from 'react';

import { DrawerToolbarProvider } from '../DrawerToolbarContext/DrawerToolbarContext';

import { DrawerToolbarLayoutProps } from './DrawerToolbarLayout.types';
import { DrawerToolbarLayoutContent } from './DrawerToolbarLayoutContent';

/**
 * @internal
 *
 * DrawerToolbarLayout is a component that provides a layout for displaying content in a drawer with a toolbar.
 */
export const DrawerToolbarLayout = forwardRef<
  HTMLDivElement,
  DrawerToolbarLayoutProps
>(
  (
    { children, toolbarData, ...rest }: DrawerToolbarLayoutProps,
    forwardRef,
  ) => {
    return (
      <DrawerToolbarProvider data={toolbarData}>
        {/* This extra content component allows us to use useDrawerToolbarContext since we can't use useDrawerToolbarContext in the same file that the provider is wrapped in */}
        <DrawerToolbarLayoutContent ref={forwardRef} {...rest}>
          {children}
        </DrawerToolbarLayoutContent>
      </DrawerToolbarProvider>
    );
  },
);

DrawerToolbarLayout.displayName = 'DrawerToolbarLayout';
