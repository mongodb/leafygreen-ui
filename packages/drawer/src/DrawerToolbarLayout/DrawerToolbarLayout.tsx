import React, { forwardRef } from 'react';

import { DrawerToolbarLayoutProps } from './DrawerToolbarLayout.types';
import { DrawerToolbarLayoutContainer } from './DrawerToolbarLayoutContainer';

/**
 * @internal
 *
 * DrawerToolbarLayout is a component that provides a layout for displaying content in a drawer with a toolbar.
 */
export const DrawerToolbarLayout = forwardRef<
  HTMLDivElement,
  DrawerToolbarLayoutProps
>(({ children, ...rest }: DrawerToolbarLayoutProps, forwardRef) => {
  return (
    <DrawerToolbarLayoutContainer ref={forwardRef} {...rest}>
      {children}
    </DrawerToolbarLayoutContainer>
  );
});

DrawerToolbarLayout.displayName = 'DrawerToolbarLayout';
