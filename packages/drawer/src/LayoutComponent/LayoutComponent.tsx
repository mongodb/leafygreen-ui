import React, { forwardRef } from 'react';

import { DisplayMode } from '../Drawer';
import { DrawerProvider } from '../DrawerContext';
import { EmbeddedDrawerLayout } from '../EmbeddedDrawerLayout';
import { OverlayDrawerLayout } from '../OverlayDrawerLayout';

import { LayoutComponentProps } from './LayoutComponent.types';

/**
 * @internal
 *
 * LayoutComponent is a wrapper component that provides a layout for displaying content with a drawer.
 * It can be used in both overlay and embedded modes.
 */
export const LayoutComponent = forwardRef<HTMLDivElement, LayoutComponentProps>(
  ({ children, displayMode, ...rest }: LayoutComponentProps, forwardRef) => {
    const Component =
      displayMode === DisplayMode.Overlay
        ? OverlayDrawerLayout
        : EmbeddedDrawerLayout;

    return (
      <DrawerProvider>
        <Component ref={forwardRef} {...rest}>
          {children}
        </Component>
      </DrawerProvider>
    );
  },
);

LayoutComponent.displayName = 'LayoutComponent';
