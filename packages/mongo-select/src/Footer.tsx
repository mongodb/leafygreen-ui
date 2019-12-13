import React from 'react';
import { uiColors } from '@leafygreen-ui/palette';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { MenuItem, FocusableMenuItem } from '@leafygreen-ui/menu';

const viewAllStyle = css`
  color: ${uiColors.blue.base};
  font-weight: bolder;
`;

const projectButtonStyle = css`
  display: flex;
  justify-content: space-around;
  padding-top: 16px;
  padding-bottom: 16px;
`;

interface FooterProps {
  onKeyDown: React.KeyboardEventHandler;
  orgId: string;
}

const ProjectFooter = React.forwardRef(
  ({ onKeyDown, orgId }: FooterProps, ref) => {
    return (
      <li onKeyDown={onKeyDown} className={projectButtonStyle} role="none">
        <FocusableMenuItem ref={ref}>
          <Button href={`/v2#/org/${orgId}/projects`}>View All Projects</Button>
        </FocusableMenuItem>
        <FocusableMenuItem ref={ref}>
          <Button href={`/v2#/org/${orgId}/projects/create`}>
            + New Project
          </Button>
        </FocusableMenuItem>
      </li>
    );
  },
);

ProjectFooter.displayName = 'ProjectFooter';

export { ProjectFooter };

const OrganizationFooter = React.forwardRef(
  ({ onKeyDown, orgId }: FooterProps, ref) => {
    return (
      <MenuItem
        onKeyDown={onKeyDown}
        ref={ref}
        href={`org/${orgId}/settings/general`}
      >
        <strong className={viewAllStyle}>View All Organizations</strong>
      </MenuItem>
    );
  },
);

OrganizationFooter.displayName = 'OrganizationFooter';

export { OrganizationFooter };
