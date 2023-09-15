import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import Popover, { PopoverProps } from '@leafygreen-ui/popover';

import { menuStyles } from './MenuWrapper.styles';

/**
 * A styled popover
 */
export const MenuWrapper = forwardRef(
  ({
    className,
    children,
    ...props
  }: PopoverProps & HTMLElementProps<'div'>) => {
    const { theme } = useDarkMode();

    return (
      <Popover className={cx(menuStyles[theme], className)} {...props}>
        {children}
      </Popover>
    );
  },
);

MenuWrapper.displayName = 'MenuWrapper';
