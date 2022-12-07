import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Portal from '@leafygreen-ui/portal';

import { useSideNavContext } from '../SideNav/SideNavContext';

import { activeThemeStyle, baseStyles, themeStyle } from './styles';
import { CollapsedSideNavItemProps } from './types';

/**
 * @internal
 */
export function CollapsedSideNavItem({
  children,
  active = false,
  className,
}: CollapsedSideNavItemProps) {
  const { portalContainer, theme } = useSideNavContext();

  return (
    <Portal container={portalContainer}>
      <li
        className={cx(
          baseStyles,
          themeStyle[theme],
          {
            [activeThemeStyle[theme]]: active,
          },
          className,
        )}
      >
        {children}
      </li>
    </Portal>
  );
}
