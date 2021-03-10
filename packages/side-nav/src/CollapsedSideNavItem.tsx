import React from 'react';
import Portal from '@leafygreen-ui/portal';
import { cx, css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useSideNavContext } from './SideNavContext';

const collapsedItemStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-bottom: 1px solid ${uiColors.gray.light2};
  color: ${uiColors.green.dark2};

  &:first-of-type {
    border-top: 1px solid ${uiColors.gray.light2};
  }
`;

const collapsedItemActiveStyle = css`
  background-color: ${uiColors.green.light3};
`;

interface CollapsedSideNavItemProps {
  children: React.ReactNode;
  active: boolean;
  className: string;
}

function CollapsedSideNavItem({
  children,
  active,
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
