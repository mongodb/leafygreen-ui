import React, { forwardRef } from 'react';

import { useDrawerLayoutContext } from '../DrawerLayout';

import { getEmbeddedDrawerLayoutStyles } from './EmbeddedDrawerLayout.styles';
import { EmbeddedDrawerLayoutProps } from './EmbeddedDrawerLayout.types';

/**
 * @internal
 *
 * This layout wrapper is used to create a layout that has 2 grid columns. The main content is on the left and the drawer is on the right.
 *
 * Since this layout is used for embedded drawers, when the drawer is open, the layout will shift to the right by the width of the drawer + toolbar if it exists.
 *
 */
export const EmbeddedDrawerLayout = forwardRef<
  HTMLDivElement,
  EmbeddedDrawerLayoutProps
>(({ children, className }: EmbeddedDrawerLayoutProps, forwardedRef) => {
  const { hasToolbar, isDrawerOpen, drawerWidth, isDrawerResizing } =
    useDrawerLayoutContext();

  return (
    <div
      ref={forwardedRef}
      className={getEmbeddedDrawerLayoutStyles({
        className,
        isDrawerOpen,
        hasToolbar,
        isDrawerResizing,
      })}
      // Prevents a new style class everytime the width changes
      style={{ '--drawer-width': `${drawerWidth}` } as React.CSSProperties}
    >
      {children}
    </div>
  );
});

EmbeddedDrawerLayout.displayName = 'EmbeddedDrawerLayout';
