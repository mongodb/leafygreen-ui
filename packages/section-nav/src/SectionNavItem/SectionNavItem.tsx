import React, { forwardRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useSectionNavContext } from '../Context/SectionNavContext';
import {
  SectionNavNestedContextProvider,
  useSectionNavNestedContext,
} from '../Context/SectionNavNestedContext';

import { getLinkStyles, itemStyles, listSyles } from './SectionNavItem.styles';
import { SectionNavItemProps } from './SectionNavItem.types';

export const SectionNavItem = forwardRef<
  HTMLAnchorElement,
  SectionNavItemProps
>(
  (
    {
      children,
      className,
      label,
      active = false,
      ...rest
    }: SectionNavItemProps,
    forwardedRef,
  ) => {
    const { theme } = useDarkMode();
    const { lgIds, hasContext } = useSectionNavContext();
    const { level } = useSectionNavNestedContext();

    if (!hasContext) {
      console.error(
        'SectionNavItem must be used within a SectionNav component',
      );
    }

    // This is a warning for consumers to know that the component currently only supports 2 levels of nesting.
    if (level > 2) {
      console.warn(
        'This component currently only supports 2 levels of nesting.',
      );
    }

    return (
      <li className={itemStyles}>
        <a
          className={getLinkStyles({ active, theme, className, level })}
          ref={forwardedRef}
          data-active={active}
          data-testid={`${lgIds.item}`}
          data-lgid={`${lgIds.item}`}
          data-level={level}
          {...rest}
        >
          {label}
        </a>
        {children && (
          <SectionNavNestedContextProvider level={level + 1}>
            <ol className={listSyles}>{children}</ol>
          </SectionNavNestedContextProvider>
        )}
      </li>
    );
  },
);

SectionNavItem.displayName = 'SectionNavItem';
