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
        <DrawerToolbarLayoutContent
          ref={forwardRef}
          toolbarData={toolbarData}
          {...rest}
        >
          {children}
        </DrawerToolbarLayoutContent>
      </DrawerToolbarProvider>
    );
  },
);

DrawerToolbarLayout.displayName = 'DrawerToolbarLayout';
