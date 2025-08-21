import React, { forwardRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useDrawerLayoutContext } from '../../DrawerLayout';

import {
  contentStyles,
  getDrawerWithToolbarWrapperStyles,
} from './DrawerWithToolbarWrapper.styles';
import { DrawerWithToolbarWrapperProps } from './DrawerWithToolbarWrapper.types';

/**
 * @internal
 *
 * This layout wrapper is used to position the toolbar and drawer together. When the drawer is open, the toolbar and drawer will shift to the right.
 *
 * If the drawer is overlay, a box shadow will be applied to the left side of this component.
 */
export const DrawerWithToolbarWrapper = forwardRef<
  HTMLDivElement,
  DrawerWithToolbarWrapperProps
>(
  (
    { children, className, drawer }: DrawerWithToolbarWrapperProps,
    forwardedRef,
  ) => {
    const { theme } = useDarkMode();
    const {
      displayMode,
      size,
      hasToolbar = false,
      isDrawerOpen,
    } = useDrawerLayoutContext();

    return (
      <>
        <div className={contentStyles}>{children}</div>
        <div
          ref={forwardedRef}
          className={getDrawerWithToolbarWrapperStyles({
            className,
            isDrawerOpen,
            displayMode,
            theme,
            size,
            hasToolbar,
          })}
        >
          {drawer}
        </div>
      </>
    );
  },
);

DrawerWithToolbarWrapper.displayName = 'DrawerWithToolbarWrapper';
