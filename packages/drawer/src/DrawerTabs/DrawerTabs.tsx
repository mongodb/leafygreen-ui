import React from 'react';

import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size, Tabs } from '@leafygreen-ui/tabs';

import { useScrollShadowTop } from '../Drawer';
import { useDrawerContext } from '../DrawerContext';

import { getDrawerTabsStyles } from './DrawerTabs.styles';
import { DrawerTabsProps } from './DrawerTabs.types';

export const DrawerTabs = ({
  children,
  className,
  ...rest
}: DrawerTabsProps) => {
  const { theme } = useDarkMode();
  const { registerTabs } = useDrawerContext();

  const { hasShadowTop, scrollContainerRef } = useScrollShadowTop();

  useIsomorphicLayoutEffect(() => {
    registerTabs();
  }, [registerTabs]);

  return (
    <Tabs
      aria-label="Drawer tabs"
      {...rest}
      className={getDrawerTabsStyles({ className, hasShadowTop, theme })}
      size={Size.Small}
      tabPanelsContainerRef={scrollContainerRef}
    >
      {children}
    </Tabs>
  );
};

DrawerTabs.displayName = 'DrawerTabs';
