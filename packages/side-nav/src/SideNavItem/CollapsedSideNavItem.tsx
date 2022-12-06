import React from 'react';
import Portal from '@leafygreen-ui/portal';
import { cx, css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { useSideNavContext } from '../SideNav/SideNavContext';
import { Theme } from '@leafygreen-ui/lib';

// TODO: break out

const baseStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
`;

const themeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    border-bottom: 1px solid ${palette.gray.light2};
    color: ${palette.green.dark2};

    &:first-of-type {
      border-top: 1px solid ${palette.gray.light2};
    }
  `,
  [Theme.Dark]: css`
    border-bottom: 1px solid ${palette.gray.dark2};
    color: ${palette.green.dark1};

    &:first-of-type {
      border-top: 1px solid ${palette.gray.dark2};
    }
  `,
};

const activeThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.green.light3};
  `,
  [Theme.Dark]: css`
    color: ${palette.white};
    background-color: ${palette.green.dark3};
  `,
};

interface CollapsedSideNavItemProps {
  /**
   * React Node rendered when the navigation is collapsed.
   */
  children: React.ReactNode;

  /**
   * Displays the collapsed item with an active state.
   */
  active?: boolean;

  /**
   * className applied to the root element rendered.
   */
  className?: string;
}

function CollapsedSideNavItem({
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

export default CollapsedSideNavItem;
