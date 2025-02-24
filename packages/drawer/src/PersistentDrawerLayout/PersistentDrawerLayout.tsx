import React, { forwardRef } from 'react';

import { getPersistentDrawerLayoutStyles } from './PersistentDrawerLayout.styles';
import { PersistentDrawerLayoutProps } from './PersistentDrawerLayout.types';

export const PersistentDrawerLayout = forwardRef<
  HTMLDivElement,
  PersistentDrawerLayoutProps
>(({ children, className, isDrawerOpen }) => {
  return (
    <div
      className={getPersistentDrawerLayoutStyles({ className, isDrawerOpen })}
    >
      {children}
    </div>
  );
});

PersistentDrawerLayout.displayName = 'PersistentDrawerLayout';
