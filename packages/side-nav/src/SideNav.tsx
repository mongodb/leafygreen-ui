import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { ulStyleOverrides } from './styles';

const sideNavStyles = css`
  width: 200px;
`;

interface SideNavProps {
  className?: string;
  children: React.ReactNode;
}

function SideNav({ children, className }: SideNavProps) {
  return (
    <nav aria-label="side-nav" className={cx(sideNavStyles, className)}>
      <ul className={ulStyleOverrides}>{children}</ul>
    </nav>
  );
}

SideNav.displayName = 'Side Nav';

SideNav.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default SideNav;
