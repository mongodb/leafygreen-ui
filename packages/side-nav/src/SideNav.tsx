import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { ulStyleOverrides } from './styles';

const navStyles = css`
  width: 200px;
  overflow-y: scroll;
  padding-bottom: 24px;
`;

interface SideNavProps {
  /**
   * Class name that will be applied to the root-level element.
   */
  className?: string;

  /**
   * Content that will be rendered inside the root-level element.
   */
  children?: React.ReactNode;
}

/**
 * # SideNav
 *
 * ```
<SideNav>
  <SideNavGroup headerText="Section Header">
    <SideNavItem href="/">
      Back to Home
    </SideNavItem>
  </SideNavGroup>
</SideNav>
 * ```
 *
 * @param props.className Class name that will be applied to the root-level element.
 * @param props.children Content that will be rendered inside the root-level element.
 */
function SideNav({ className, children, ...rest }: SideNavProps) {
  return (
    <nav className={cx(navStyles, className)} aria-label="side-nav" {...rest}>
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
