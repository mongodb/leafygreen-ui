import React, { forwardRef } from 'react';

import { useDrawerLayoutContext } from '../../DrawerLayout/DrawerLayoutContext/DrawerLayoutContext';

import {
  getOverlayDrawerLayoutStyles,
  getOverlayDrawerWrapperStyles,
} from './OverlayDrawerLayout.styles';
import { OverlayDrawerLayoutProps } from './OverlayDrawerLayout.types';
import { css } from '@leafygreen-ui/emotion';
import { GRID_AREA } from '../../constants';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

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
  const { hasToolbar, isDrawerOpen, size } = useDrawerLayoutContext();
  const { theme } = useDarkMode();

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
            data-bye="bye"
            className={css`
              grid-area: ${GRID_AREA.content};
              overflow: scroll;
              height: inherit;
            `}
          >
            {children}
          </div>
          <div
            className={getOverlayDrawerWrapperStyles({
              isDrawerOpen,
              theme,
              size,
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
