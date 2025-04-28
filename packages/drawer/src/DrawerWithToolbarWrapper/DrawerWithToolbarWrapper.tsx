import React, { forwardRef, useEffect, useState } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getDrawerWithToolbarWrapperStyles } from './DrawerWithToolbarWrapper.styles';
import { DrawerWithToolbarWrapperProps } from './DrawerWithToolbarWrapper.types';

export const DrawerWithToolbarWrapper = forwardRef<
  HTMLDivElement,
  DrawerWithToolbarWrapperProps
>(
  (
    {
      children,
      className,
      isDrawerOpen,
      displayMode,
    }: DrawerWithToolbarWrapperProps,
    forwardedRef,
  ) => {
    const { theme } = useDarkMode();
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
          displayMode,
          theme,
        })}
      >
        {children}
      </div>
    );
  },
);

DrawerWithToolbarWrapper.displayName = 'DrawerWithToolbarWrapper';
