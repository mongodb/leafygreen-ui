import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@leafygreen-ui/emotion';
import { ulStyleOverrides } from './styles';

const navStyles = css`
  width: 200px;
`;

interface SideNavProps {
  /**
   * Class name that will be applied to SideNav root component.
   */
  className?: string;
  /**
   * Content that will appear inside of SideNav root component.
   */
  children?: React.ReactNode;
}

/**
 * # SideNav
 *
 * ```
<SideNav>
  <SideNavGroup headerText="Section Header">
    <SideNavItem>
      Link Content
    </SideNavItem>
  </SideNavGroup>
</SideNav>
 * ```
 * @param props.className Class name that will be applied to SideNav root component.
 * @param props.children Content that will appear inside of SideNav root component.
 *
 */
function SideNav({ children, ...rest }: SideNavProps) {
  return (
    <nav className={navStyles} aria-label="side-nav" {...rest}>
      <ul className={ulStyleOverrides}>{children}</ul>
    </nav>
  );
}

SideNav.displayName = 'SideNav';

SideNav.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default SideNav;
