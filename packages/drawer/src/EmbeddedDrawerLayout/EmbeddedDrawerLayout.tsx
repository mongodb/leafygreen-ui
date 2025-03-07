import React, { forwardRef } from 'react';

import { getEmbeddedDrawerLayoutStyles } from './EmbeddedDrawerLayout.styles';
import { EmbeddedDrawerLayoutProps } from './EmbeddedDrawerLayout.types';

export const EmbeddedDrawerLayout = forwardRef<
  HTMLDivElement,
  EmbeddedDrawerLayoutProps
>(({ children, className, isDrawerOpen }, fwdRef) => {
  return (
    <div
      className={getEmbeddedDrawerLayoutStyles({ className, isDrawerOpen })}
      ref={fwdRef}
    >
      {children}
    </div>
  );
});

EmbeddedDrawerLayout.displayName = 'EmbeddedDrawerLayout';
