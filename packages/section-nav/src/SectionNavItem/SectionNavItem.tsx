import React, { forwardRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useSectionNavContext } from '../Context/SectionNavContext';

import { getLinkStyles, itemStyles, listSyles } from './SectionNavItem.styles';
import { SectionNavItemProps } from './SectionNavItem.types';

export const SectionNavItem = forwardRef<
  HTMLAnchorElement,
  SectionNavItemProps
>(
  (
    {
      className,
      children,
      active = false,
      level = 1,
      label,
      ...rest
    }: SectionNavItemProps,
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
      <li className={itemStyles}>
        <a
          className={getLinkStyles({ level, active, theme, className })}
          ref={forwardedRef}
          data-active={active}
          data-level={level}
          data-testid={`${lgIds.item}`}
          data-lgid={`${lgIds.item}`}
          {...rest}
        >
          {label}
        </a>
        <ol className={listSyles}>{children}</ol>
      </li>
    );
  },
);

SectionNavItem.displayName = 'SectionNavItem';
