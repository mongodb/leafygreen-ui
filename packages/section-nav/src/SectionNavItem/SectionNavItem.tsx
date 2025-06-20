import React from 'react';

import { SectionNavItemProps } from './SectionNavItem.types';
import { getItemStyles, getLinkStyles } from './SectionNavItem.styles';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

export function SectionNavItem({
  className,
  children,
  active,
  depth,
  ...rest
}: SectionNavItemProps) {
  const { theme } = useDarkMode();
  return (
    <li className={getItemStyles({ theme })}>
      <a
        className={cx(getLinkStyles({ depth, active, theme }), className)}
        {...rest}
      >
        {children}
      </a>
    </li>
  );
}

SectionNavItem.displayName = 'SectionNavItem';
