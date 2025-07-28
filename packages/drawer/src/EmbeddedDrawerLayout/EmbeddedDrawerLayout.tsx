import React, { forwardRef, useEffect } from 'react';

import { useMergeRefs } from '@leafygreen-ui/hooks';

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

  const ref = React.useRef<HTMLDivElement>(null);
  const mergeRefs = useMergeRefs([forwardedRef, ref]);

  useEffect(() => {
    ref.current?.style.setProperty('--drawer-width', `${drawerWidth}`);
  }, [drawerWidth]);

  return (
    <div
      ref={mergeRefs}
      className={getEmbeddedDrawerLayoutStyles({
        className,
        isDrawerOpen,
        hasToolbar,
        isDrawerResizing,
      })}
    >
      {children}
    </div>
  );
});

EmbeddedDrawerLayout.displayName = 'EmbeddedDrawerLayout';
