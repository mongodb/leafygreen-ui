import React, { forwardRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getItemStyles, getLinkStyles } from './SectionNavItem.styles';
import { SectionNavItemProps } from './SectionNavItem.types';
import { useSectionNavContext } from '../Context/SectionNavContext';

export const SectionNavItem = forwardRef<
  HTMLAnchorElement,
  SectionNavItemProps
>(
  (
    { className, children, active, depth, ...rest }: SectionNavItemProps,
    forwardedRef,
  ) => {
    const { theme } = useDarkMode();
    const { lgIds, hasContext } = useSectionNavContext();

    if (!hasContext) {
      console.error(
        'SectionNavItem must be used within a SectionNav component',
      );
    }

    return (
      <li className={getItemStyles({ theme })}>
        <a
          className={getLinkStyles({ depth, active, theme, className })}
          ref={forwardedRef}
          data-testid={`${lgIds.item}`}
          data-lgid={`${lgIds.item}`}
          {...rest}
        >
          {children}
        </a>
      </li>
    );
  },
);

SectionNavItem.displayName = 'SectionNavItem';
