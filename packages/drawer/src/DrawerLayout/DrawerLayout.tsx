import React, { forwardRef } from 'react';

import { consoleOnce } from '@leafygreen-ui/lib';

import { DisplayMode, Size } from '../Drawer/Drawer.types';
import { DrawerToolbarLayout } from '../DrawerToolbarLayout';
import { LayoutComponent } from '../LayoutComponent';

import { DrawerLayoutProvider } from './DrawerLayoutContext/DrawerLayoutContext';
import { DrawerLayoutProps } from './DrawerLayout.types';

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
      onClose,
      size = Size.Default,
      ...rest
    }: DrawerLayoutProps,
    forwardedRef,
  ) => {
    const hasToolbar = toolbarData && toolbarData.length > 0;

    // if (!hasToolbar) {
    //   consoleOnce.warn(
    //     'Using a Drawer without a toolbar is not recommended. To include a toolbar, pass a toolbarData prop containing the desired toolbar items.',
    //   );
    // }

    return (
      <DrawerLayoutProvider
        isDrawerOpen={isDrawerOpen}
        resizable={resizable}
        displayMode={displayMode}
        onClose={onClose}
        hasToolbar={hasToolbar}
        size={size}
      >
        {toolbarData ? (
          <DrawerToolbarLayout
            ref={forwardedRef}
            toolbarData={toolbarData}
            {...rest}
          >
            {children}
          </DrawerToolbarLayout>
        ) : (
          <LayoutComponent ref={forwardedRef} {...rest}>
            {children}
          </LayoutComponent>
        )}
      </DrawerLayoutProvider>
    );
  },
);

DrawerLayout.displayName = 'DrawerLayout';
