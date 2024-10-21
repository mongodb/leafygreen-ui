import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import {
  ModalPopoverProvider,
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import Popover, {
  DismissMode,
  PopoverProps,
  RenderMode,
} from '@leafygreen-ui/popover';

import { menuStyles } from './MenuWrapper.styles';

export type MenuWrapperProps = Omit<
  PopoverProps,
  | 'dismissMode'
  | 'onToggle'
  | 'popoverZIndex'
  | 'portalClassName'
  | 'portalContainer'
  | 'portalRef'
  | 'renderMode'
  | 'scrollContainer'
> &
  HTMLElementProps<'div'>;

/**
 * A simple styled popover component
 */
export const MenuWrapper = forwardRef<HTMLDivElement, MenuWrapperProps>(
  ({ className, children, ...props }: MenuWrapperProps, fwdRef) => {
    const { theme } = useDarkMode();

    return (
      <Popover
        ref={fwdRef}
        className={cx(menuStyles[theme], className)}
        {...props}
        dismissMode={DismissMode.Manual}
        renderMode={RenderMode.TopLayer}
      >
        {/*
         * Prevents the opening and closing state of a select dropdown from propagating up
         * to other ModalPopoverProviders in parent components. E.g. Modal
         */}
        <ModalPopoverProvider>{children}</ModalPopoverProvider>
      </Popover>
    );
  },
);

MenuWrapper.displayName = 'MenuWrapper';
