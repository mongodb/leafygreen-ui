import * as React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { menuGroup } from './MenuGroup';

import NavItem, { NavItemProps } from '@leafygreen-ui/nav-item';

const indentation = 20;

const containerStyle = css`
  ${menuGroup.selector} + & {
    border-top: 1px solid ${uiColors.gray.light1};
  }

  ${menuGroup.selector} ${menuGroup.selector} & {
    padding-left: ${indentation * 2}px;
  }
`;

/**
 * # MenuItem
 *
 * ```
<MenuItem>Hello World!</MenuItem>
 * ```
 * @param props.href If supplied, MenuItem will render inside of `a` tags.
 * @param props.onClick Function to be executed when MenuItem is clicked.
 * @param props.className Classname applied to MenuItem.
 * @param props.children Content to appear inside of the MenuItem.
 * @param props.description Subtext to appear inside of MenuItem
 * @param props.disabled Determines if the MenuItem is disabled
 * @param props.active Determines whether the MenuItem will appear as active
 *
 */
function MenuItem({
  disabled = false,
  active = false,
  href,
  onClick,
  className,
  children,
  description,
  ...rest
}: NavItemProps) {
  return (
    <NavItem
      {...rest}
      disabled={disabled}
      active={active}
      href={href}
      onClick={onClick}
      className={cx(className, containerStyle)}
      description={description}
    >
      {children}
    </NavItem>
  );
}

MenuItem.displayName = 'MenuItem';

MenuItem.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.node,
};

export default MenuItem;
