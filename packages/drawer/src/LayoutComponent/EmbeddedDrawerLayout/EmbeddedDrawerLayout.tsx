import React, { forwardRef } from 'react';

import { useDrawerLayoutContext } from '../../DrawerLayout/DrawerLayoutContext/DrawerLayoutContext';

import {
  getEmbeddedDrawerLayoutStyles,
  getEmbeddedDrawerWrapperStyles,
} from './EmbeddedDrawerLayout.styles';
import { EmbeddedDrawerLayoutProps } from './EmbeddedDrawerLayout.types';
import { css } from '@leafygreen-ui/emotion';
import { GRID_AREA } from '../../constants';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

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
>(
  (
    { children, className, drawer }: EmbeddedDrawerLayoutProps,
    forwardedRef,
  ) => {
    const { hasToolbar, isDrawerOpen, drawerWidth, isDrawerResizing, size } =
      useDrawerLayoutContext();
    const { theme } = useDarkMode();

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
        // Prevents a new style class everytime the width changes
        style={{ '--drawer-width': `${drawerWidth}` } as React.CSSProperties}
      >
        {drawer !== undefined ? (
          <>
            <div
              className={css`
                grid-area: ${GRID_AREA.content};
                overflow: scroll;
                height: inherit;
              `}
            >
              {children}
            </div>
            <div
              className={getEmbeddedDrawerWrapperStyles({
                isDrawerOpen,
                theme,
              })}
            >
              {drawer}
            </div>
          </>
        ) : (
          children
        )}
      </div>
    );
  },
);

EmbeddedDrawerLayout.displayName = 'EmbeddedDrawerLayout';
