import React from 'react';
import Portal from '@leafygreen-ui/portal';
import { cx } from '@leafygreen-ui/emotion';
import { useSideNavContext } from '../SideNav/SideNavContext';
import { baseStyles, themeStyle, activeThemeStyle } from './styles';
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
