import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import Popover, { PopoverProps } from '@leafygreen-ui/popover';

import { menuStyles } from './MenuWrapper.styles';

/**
 * A simple styled popover component
 */
export const MenuWrapper = forwardRef<
  HTMLDivElement,
  PopoverProps & HTMLElementProps<'div'>
>(
  (
    { className, children, ...props }: PopoverProps & HTMLElementProps<'div'>,
    fwdRef,
  ) => {
    const { theme } = useDarkMode();

    return (
      <Popover
        ref={fwdRef}
        className={cx(menuStyles[theme], className)}
        {...props}
      >
        {children}
      </Popover>
    );
  },
);

MenuWrapper.displayName = 'MenuWrapper';
