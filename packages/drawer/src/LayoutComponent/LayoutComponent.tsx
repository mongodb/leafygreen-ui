import React, { forwardRef } from 'react';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { DisplayMode } from '../Drawer';
import { useDrawerLayoutContext } from '../DrawerLayout';
import { EmbeddedDrawerLayout } from './EmbeddedDrawerLayout';
import { OverlayDrawerLayout } from './OverlayDrawerLayout';

import { LayoutComponentProps } from './LayoutComponent.types';

/**
 * @internal
 *
 * LayoutComponent is a wrapper component that provides a layout for displaying content with a drawer.
 * It can be used in both overlay and embedded modes.
 */
export const LayoutComponent = forwardRef<HTMLDivElement, LayoutComponentProps>(
  (
    { children, darkMode: darkModeProp, drawer, ...rest }: LayoutComponentProps,
    forwardRef,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);
    const { displayMode } = useDrawerLayoutContext();

    const Component =
      displayMode === DisplayMode.Overlay
        ? OverlayDrawerLayout
        : EmbeddedDrawerLayout;

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <Component ref={forwardRef} {...rest}>
          {children}
          {drawer}
        </Component>
      </LeafyGreenProvider>
    );
  },
);

LayoutComponent.displayName = 'LayoutComponent';
