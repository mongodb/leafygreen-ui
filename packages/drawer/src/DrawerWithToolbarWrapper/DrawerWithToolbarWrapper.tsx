import React, { forwardRef, useEffect, useState } from 'react';

import { getDrawerWithToolbarWrapperStyles } from './DrawerWithToolbarWrapper.styles';
import { DrawerWithToolbarWrapperProps } from './DrawerWithToolbarWrapper.types';

export const DrawerWithToolbarWrapper = forwardRef<
  HTMLDivElement,
  DrawerWithToolbarWrapperProps
>(
  (
    { children, className, isDrawerOpen }: DrawerWithToolbarWrapperProps,
    forwardedRef,
  ) => {
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
      if (isDrawerOpen) setShouldAnimate(true);
    }, [isDrawerOpen]);

    return (
      <div
        ref={forwardedRef}
        className={getDrawerWithToolbarWrapperStyles({
          className,
          isDrawerOpen,
          shouldAnimate,
        })}
      >
        {children}
      </div>
    );
  },
);

DrawerWithToolbarWrapper.displayName = 'DrawerWithToolbarWrapper';
