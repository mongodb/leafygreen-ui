import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import Popover, { PopoverProps } from '@leafygreen-ui/popover';

import { menuStyles } from './MenuWrapper.styles';

/**
 * A styled popover
 */
export function MenuWrapper({ className, children, ...props }: PopoverProps) {
  const { theme } = useDarkMode();

  return (
    <Popover className={cx(menuStyles[theme], className)} {...props}>
      {children}
    </Popover>
  );
}

MenuWrapper.displayName = 'MenuWrapper';
