import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import {
  PopoverProvider,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
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
        {/* Adding the provider inside of <Popover /> to keep track of only the select menus */}
        <PopoverProvider>{children}</PopoverProvider>
      </Popover>
    );
  },
);

MenuWrapper.displayName = 'MenuWrapper';
