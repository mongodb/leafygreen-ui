import React from 'react';
import { useInView } from 'react-intersection-observer';

import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size, Tabs } from '@leafygreen-ui/tabs';

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

  // Track when intercept <span> element is no longer visible to add shadow below drawer header
  const { ref: interceptRef, inView: isInterceptInView } = useInView({
    fallbackInView: true,
  });

  useIsomorphicLayoutEffect(() => {
    registerTabs();
  }, [registerTabs]);

  return (
    <Tabs
      aria-label="Drawer tabs"
      className={getDrawerTabsStyles({
        className,
        hasShadowTop: !isInterceptInView,
        theme,
      })}
      {...rest}
      // DrawerTabs is locked to the small size variant
      size={Size.Small}
    >
      {/* Empty span element used to track if tab panel container has scrolled down */}
      <span ref={interceptRef} />
      {children}
    </Tabs>
  );
};

DrawerTabs.displayName = 'DrawerTabs';
