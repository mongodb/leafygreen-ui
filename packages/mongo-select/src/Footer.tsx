import React from 'react';
import { uiColors } from '@leafygreen-ui/palette';
import Button from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { MenuItem, FocusableMenuItem } from '@leafygreen-ui/menu';
import { Variant } from './MongoSelect';

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
  variant: Variant;
  onKeyDown: React.KeyboardEventHandler;
}

const Footer = React.forwardRef(({ variant, onKeyDown }: FooterProps, ref) => {
  if (variant === Variant.Organization) {
    return (
      <MenuItem onKeyDown={onKeyDown} ref={ref}>
        <span className={viewAllStyle}>View All Organizations</span>
      </MenuItem>
    );
  }

  return (
    <li onKeyDown={onKeyDown} className={projectButtonStyle} role="none">
      <FocusableMenuItem ref={ref}>
        <Button>View All Projects</Button>
      </FocusableMenuItem>
      <FocusableMenuItem ref={ref}>
        <Button>+ New Project</Button>
      </FocusableMenuItem>
    </li>
  );
});

Footer.displayName = 'Footer';

export default Footer;
