import React, { forwardRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useDrawerLayoutContext } from '../../DrawerLayout';

import { getPanelGridStyles } from './PanelGrid.styles';
import { PanelGridProps } from './PanelGrid.types';

/**
 * @internal
 *
 * This layout component is used to wrap the toolbar(if present) and drawer in it's own grid.
 *
 * If there is a toolbar, there will be 2 grid columns. The toolbar will be in the first column and the drawer will be in the second column.
 *
 * If there is no toolbar, there will be 1 grid column. The drawer will be in the first column.
 *
 * If the drawer is overlay, the column width is increased and acts as a position absolute container. This gets around using transforms directly on the drawer element, which was causing unexpected behavior.
 * A box shadow is also applied to the left side of the drawer.
 *
 * If the drawer is embedded, the grid width is set to auto and inherits the column size of the parent column.
 */
export const PanelGrid = forwardRef<HTMLDivElement, PanelGridProps>(
  ({ children, className }: PanelGridProps, forwardedRef) => {
    const { theme } = useDarkMode();
    const {
      displayMode,
      size,
      hasToolbar = false,
      isDrawerOpen,
    } = useDrawerLayoutContext();

    return (
      <div
        ref={forwardedRef}
        className={getPanelGridStyles({
          className,
          isDrawerOpen,
          displayMode,
          theme,
          size,
          hasToolbar,
        })}
      >
        {children}
      </div>
    );
  },
);

PanelGrid.displayName = 'PanelGrid';
