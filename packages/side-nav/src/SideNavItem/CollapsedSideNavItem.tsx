import React from 'react';

import { css,cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import Portal from '@leafygreen-ui/portal';

import { useSideNavContext } from '../SideNavContext';

const collapsedItemStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-bottom: 1px solid ${palette.gray.light2};
  color: ${palette.green.dark2};

  &:first-of-type {
    border-top: 1px solid ${palette.gray.light2};
  }
`;

const collapsedItemActiveStyle = css`
  background-color: ${palette.green.light3};
`;

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
  const { portalContainer } = useSideNavContext();

  return (
    <Portal container={portalContainer}>
      <li
        className={cx(
          collapsedItemStyles,
          {
            [collapsedItemActiveStyle]: active,
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
