import React, { forwardRef } from 'react';

import { useDrawerLayoutContext } from '../../DrawerLayout/DrawerLayoutContext/DrawerLayoutContext';
import { contentStyles } from '../LayoutComponent.styles';
import { PanelGrid } from '../PanelGrid';

import { getOverlayDrawerLayoutStyles } from './OverlayDrawerLayout.styles';
import { OverlayDrawerLayoutProps } from './OverlayDrawerLayout.types';

/**
 * @internal
 *
 * This layout wrapper is used to create a layout that has 2 grid columns. The main content is on the left and the drawer and toolbar(if present) is on the right.
 *
 * Since this layout is used for overlay drawers, when the drawer is open, the layout will not shift. Instead the shifting is handled by the children of this component.
 *
 */
export const OverlayDrawerLayout = forwardRef<
  HTMLDivElement,
  OverlayDrawerLayoutProps
>(
  (
    { children, className, panelContent }: OverlayDrawerLayoutProps,
    forwardedRef,
  ) => {
    const { hasToolbar } = useDrawerLayoutContext();
    const hasPanelContentProp = !!panelContent;

    return (
      <div
        ref={forwardedRef}
        className={getOverlayDrawerLayoutStyles({
          className,
          hasToolbar,
        })}
      >
        {hasPanelContentProp ? (
          <>
            <div className={contentStyles}>{children}</div>
            <PanelGrid>{panelContent}</PanelGrid>
          </>
        ) : (
          children
        )}
      </div>
    );
  },
);

OverlayDrawerLayout.displayName = 'OverlayDrawerLayout';
