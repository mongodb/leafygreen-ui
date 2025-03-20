import React, { forwardRef } from 'react';

import { getEmbeddedDrawerLayoutStyles } from './EmbeddedDrawerLayout.styles';
import { EmbeddedDrawerLayoutProps } from './EmbeddedDrawerLayout.types';

export const EmbeddedDrawerLayout = forwardRef<
  HTMLDivElement,
  EmbeddedDrawerLayoutProps
>(
  (
    { children, className, isDrawerOpen }: EmbeddedDrawerLayoutProps,
    forwardRef,
  ) => {
    return (
      <div
        ref={forwardRef}
        className={getEmbeddedDrawerLayoutStyles({ className, isDrawerOpen })}
      >
        {children}
      </div>
    );
  },
);

EmbeddedDrawerLayout.displayName = 'EmbeddedDrawerLayout';
