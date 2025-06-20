import React, { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getItemStyles, getLinkStyles } from './SectionNavItem.styles';
import { SectionNavItemProps } from './SectionNavItem.types';

export const SectionNavItem = forwardRef<
  HTMLAnchorElement,
  SectionNavItemProps
>(
  (
    { className, children, active, depth, ...rest }: SectionNavItemProps,
    forwardedRef,
  ) => {
    const { theme } = useDarkMode();
    return (
      <li className={getItemStyles({ theme })}>
        <a
          className={cx(getLinkStyles({ depth, active, theme }), className)}
          ref={forwardedRef}
          {...rest}
        >
          {children}
        </a>
      </li>
    );
  },
);

SectionNavItem.displayName = 'SectionNavItem';

// TODO: context to make sure this can not render outside of SectionNav
