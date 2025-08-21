import React, { forwardRef } from 'react';

import { useDrawerLayoutContext } from '../../DrawerLayout/DrawerLayoutContext/DrawerLayoutContext';
import { LayoutGrid } from '../LayoutGrid';

import { getEmbeddedDrawerLayoutStyles } from './EmbeddedDrawerLayout.styles';
import { EmbeddedDrawerLayoutProps } from './EmbeddedDrawerLayout.types';

/**
 * @internal
 *
 * This layout wrapper is used to create a layout that has 2 grid columns. The main content is on the left and the drawer and toolbar(if present) is on the right.
 *
 * Since this layout is used for embedded drawers, when the drawer is open, the layout will shift to the right by the width of the drawer + toolbar(if present).
 *
 */
export const EmbeddedDrawerLayout = forwardRef<
  HTMLDivElement,
  EmbeddedDrawerLayoutProps
>(
  (
    { children, className, drawer }: EmbeddedDrawerLayoutProps,
    forwardedRef,
  ) => {
    const { hasToolbar, isDrawerOpen, drawerWidth, isDrawerResizing, size } =
      useDrawerLayoutContext();

    return (
      <div
        ref={forwardedRef}
        className={getEmbeddedDrawerLayoutStyles({
          className,
          isDrawerOpen,
          hasToolbar,
          isDrawerResizing,
          size,
        })}
        // Prevents a new style class every time the width changes
        style={{ '--drawer-width': `${drawerWidth}` } as React.CSSProperties}
      >
        {drawer !== undefined ? (
          <LayoutGrid drawer={drawer}>{children}</LayoutGrid>
        ) : (
          children
        )}
      </div>
    );
  },
);

EmbeddedDrawerLayout.displayName = 'EmbeddedDrawerLayout';
