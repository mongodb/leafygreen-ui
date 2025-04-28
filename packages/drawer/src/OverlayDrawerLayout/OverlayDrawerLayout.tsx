import React, { forwardRef } from 'react';

import { getOverlayDrawerLayoutStyles } from './OverlayDrawerLayout.styles';
import { OverlayDrawerLayoutProps } from './OverlayDrawerLayout.types';

export const OverlayDrawerLayout = forwardRef<
  HTMLDivElement,
  OverlayDrawerLayoutProps
>(
  (
    { children, className, isDrawerOpen, hasToolbar }: OverlayDrawerLayoutProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={getOverlayDrawerLayoutStyles({
          className,
          isDrawerOpen,
          hasToolbar,
        })}
      >
        {children}
      </div>
    );
  },
);

OverlayDrawerLayout.displayName = 'OverlayDrawerLayout';
