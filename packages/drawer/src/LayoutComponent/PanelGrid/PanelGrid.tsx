import React, { forwardRef, useEffect, useRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useDrawerLayoutContext } from '../../DrawerLayout';

import { getPanelGridStyles } from './PanelGrid.styles';
import { PanelGridProps } from './PanelGrid.types';
import { useForwardedRef } from '@leafygreen-ui/hooks';

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

    const layoutRef = useForwardedRef(forwardedRef, null);
    const previouslyFocusedRef = useRef<HTMLElement | null>(null);
    const hasHandledFocusRef = useRef<boolean>(false);

    /**
     * Focuses the first focusable element in the drawer when the drawer is opened.
     * Also handles restoring focus when the drawer is closed.
     */
    useEffect(() => {
      if (isDrawerOpen && !hasHandledFocusRef.current) {
        // Store the currently focused element when opening (only once per open session)
        previouslyFocusedRef.current = document.activeElement as HTMLElement;
        hasHandledFocusRef.current = true;

        // Focus the first focusable element in the drawer
        const firstFocusable = layoutRef.current?.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) as HTMLElement;

        firstFocusable?.focus();
      } else if (!isDrawerOpen && hasHandledFocusRef.current) {
        // Restore focus when closing (only if we had handled focus during this session)
        if (previouslyFocusedRef.current) {
          previouslyFocusedRef.current.focus();
          previouslyFocusedRef.current = null; // Clear the ref
        }
        hasHandledFocusRef.current = false; // Reset for next open session
      }
    }, [isDrawerOpen]);

    return (
      <div
        ref={layoutRef}
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
