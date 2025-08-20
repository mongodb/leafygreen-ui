import React, { forwardRef, useEffect } from 'react';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { DisplayMode } from '../Drawer';
import { useDrawerLayoutContext } from '../DrawerLayout';

import { EmbeddedDrawerLayout } from './EmbeddedDrawerLayout';
import { LayoutComponentProps } from './LayoutComponent.types';
import { OverlayDrawerLayout } from './OverlayDrawerLayout';
import { GRID_AREA } from '../constants';
import { css } from '@leafygreen-ui/emotion';

/**
 * @internal
 *
 * LayoutComponent is a wrapper component that provides a layout for displaying content with a drawer.
 * It can be used in both overlay and embedded modes.
 */
export const LayoutComponent = forwardRef<HTMLDivElement, LayoutComponentProps>(
  (
    { children, darkMode: darkModeProp, ...rest }: LayoutComponentProps,
    forwardRef,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);
    const { displayMode } = useDrawerLayoutContext();

    useEffect(() => {
      console.log('🥬 initial render');
    }, []);

    const Component =
      displayMode === DisplayMode.Overlay
        ? OverlayDrawerLayout
        : EmbeddedDrawerLayout;

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <Component ref={forwardRef} {...rest}>
          {children}
        </Component>
      </LeafyGreenProvider>
    );
  },
);

LayoutComponent.displayName = 'LayoutComponent';
