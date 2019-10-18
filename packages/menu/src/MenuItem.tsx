import * as React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import NavItem, { NavItemProps } from '@leafygreen-ui/nav-item';
import { menuGroupDataProp } from './MenuGroup';

const indentation = 20;

const containerStyle = css`
  &:first-of-type ~ ${menuGroupDataProp.selector} {
    border-top: 1px solid ${uiColors.gray.light1};
  }

  ${menuGroupDataProp.selector} + & {
    border-top: 1px solid ${uiColors.gray.light1};
  }

  ${menuGroupDataProp.selector} ${menuGroupDataProp.selector} & {
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
 * @param props.description Subtext to appear inside of MenuItem.
 * @param props.disabled Determines if the MenuItem is disabled.
 * @param props.active Determines whether the MenuItem will appear as active.
 *
 */
const MenuItem = React.forwardRef(
  ({ className, ...rest }: NavItemProps, forwardRef) => {
    return (
      <NavItem
        {...rest}
        ref={forwardRef}
        className={cx(containerStyle, className)}
      />
    );
  },
);

MenuItem.displayName = 'MenuItem';

export default MenuItem;
