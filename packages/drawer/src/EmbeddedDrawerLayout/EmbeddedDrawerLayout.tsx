import React, { forwardRef } from 'react';

import { getEmbeddedDrawerLayoutStyles } from './EmbeddedDrawerLayout.styles';
import { EmbeddedDrawerLayoutProps } from './EmbeddedDrawerLayout.types';

export const EmbeddedDrawerLayout = forwardRef<
  HTMLDivElement,
  EmbeddedDrawerLayoutProps
>(
  (
    { children, className, isDrawerOpen }: EmbeddedDrawerLayoutProps,
    forwardedRef,
  ) => {
    return (
      <div
        ref={forwardedRef}
        className={getEmbeddedDrawerLayoutStyles({ className, isDrawerOpen })}
      >
        {children}
      </div>
    );
  },
);

EmbeddedDrawerLayout.displayName = 'EmbeddedDrawerLayout';
