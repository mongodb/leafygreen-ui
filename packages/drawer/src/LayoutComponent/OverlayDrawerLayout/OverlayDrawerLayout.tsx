import React, { forwardRef } from 'react';

import { useDrawerLayoutContext } from '../../DrawerLayout/DrawerLayoutContext/DrawerLayoutContext';

import { getOverlayDrawerLayoutStyles } from './OverlayDrawerLayout.styles';
import { OverlayDrawerLayoutProps } from './OverlayDrawerLayout.types';
import { css } from '@leafygreen-ui/emotion';
import { GRID_AREA } from '../../constants';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getDrawerWithToolbarWrapperStyles } from '../../DrawerToolbarLayout/DrawerWithToolbarWrapper/DrawerWithToolbarWrapper.styles';
import { DisplayMode } from '../../Drawer/Drawer.types';
import { useDrawerToolbarContext } from '../../DrawerToolbarLayout/DrawerToolbarContext';

/**
 * @internal
 *
 * This layout wrapper is used to create a layout that has 2 grid columns. The main content is on the left and the drawer is on the right.
 *
 * Since this layout is used for overlay drawers, when the drawer is open, the layout will not shift. Instead the shifting is handled by the children of this component.
 *
 */
export const OverlayDrawerLayout = forwardRef<
  HTMLDivElement,
  OverlayDrawerLayoutProps
>(({ children, className, drawer }: OverlayDrawerLayoutProps, forwardedRef) => {
  const {
    hasToolbar,
    isDrawerOpen: isDrawerOpenLayout,
    size,
  } = useDrawerLayoutContext();
  const { theme } = useDarkMode();
  const { isDrawerOpen: isDrawerOpenToolbar } = useDrawerToolbarContext();

  console.log('🦄', { isDrawerOpenLayout, isDrawerOpenToolbar });

  const isDrawerOpen = isDrawerOpenToolbar ?? isDrawerOpenLayout;

  return (
    <div
      ref={forwardedRef}
      className={getOverlayDrawerLayoutStyles({
        className,
        hasToolbar,
      })}
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
            className={getDrawerWithToolbarWrapperStyles({
              isDrawerOpen,
              theme,
              size,
              hasToolbar,
              displayMode: DisplayMode.Overlay,
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
});

OverlayDrawerLayout.displayName = 'OverlayDrawerLayout';
