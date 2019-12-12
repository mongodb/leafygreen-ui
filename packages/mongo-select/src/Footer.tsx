import React from 'react';
import PropTypes from 'prop-types';
import { uiColors } from '@leafygreen-ui/palette';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { MenuItem, FocusableMenuItem } from '@leafygreen-ui/menu';
import { Variant } from './MongoSelect';

const viewAllStyle = css`
  color: ${uiColors.blue.base};
  font-weight: bolder;
  text-decoration: none;
`;

const projectButtonStyle = css`
  display: flex;
  justify-content: space-around;
  padding-top: 16px;
  padding-bottom: 16px;
`;

interface FooterProps {
  variant: Variant;
  onKeyDown: React.KeyboardEventHandler;
  orgId: string;
}

const Footer = React.forwardRef(
  ({ variant, onKeyDown, orgId }: FooterProps, ref) => {
    if (variant === Variant.Organization) {
      return (
        <MenuItem onKeyDown={onKeyDown} ref={ref}>
          <a href={`org/${orgId}/settings/general`} className={viewAllStyle}>
            View All Organizations
          </a>
        </MenuItem>
      );
    }

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

Footer.displayName = 'Footer';

// @ts-ignore: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37660
Footer.propTypes = {
  variant: PropTypes.oneOf(['organization', 'project']).isRequired,
  onKeyDown: PropTypes.func.isRequired,
  orgId: PropTypes.string.isRequired,
};

export default Footer;
