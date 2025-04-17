import React, { forwardRef } from 'react';
import { DisplayMode } from '../Drawer/Drawer.types';

import { getEmbeddedDrawerLayoutStyles } from './EmbeddedDrawerLayout.styles';
import { EmbeddedDrawerLayoutProps } from './EmbeddedDrawerLayout.types';

export const EmbeddedDrawerLayout = forwardRef<
  HTMLDivElement,
  EmbeddedDrawerLayoutProps
>(
  (
    {
      children,
      className,
      isDrawerOpen,
      hasToolbar,
      displayMode = DisplayMode.Embedded,
    }: EmbeddedDrawerLayoutProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={getEmbeddedDrawerLayoutStyles({
          className,
          isDrawerOpen,
          hasToolbar,
          displayMode,
        })}
      >
        {children}
      </div>
    );
  },
);

EmbeddedDrawerLayout.displayName = 'EmbeddedDrawerLayout';
