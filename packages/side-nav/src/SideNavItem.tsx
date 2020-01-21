import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { MenuItem, MenuItemProps } from '@leafygreen-ui/menu';
import { LEFT_RIGHT_OFFSET } from './styles';

// style overrides for menu item
const containerStyleOverrides = css`
  padding: 10px ${LEFT_RIGHT_OFFSET}px 10px ${LEFT_RIGHT_OFFSET}px;
  min-height: 0;
  border-radius: 5px;

  &:before {
    content: normal;
  }

  &:focus:active {
    background-color: ${uiColors.gray.light2};
  }
`;

const titleTextStyleOverrides = css`
  font-size: 15px;
  text-transform: capitalize;
`;

const disabledStyleOverrides = css`
  background-color: ${uiColors.white};
  pointer-events: none;
`;

function SideNavItem({
  active = false,
  disabled = false,
  className,
  titleTextClassName,
  children,
  description,
  href,
  ...rest
}: MenuItemProps) {
  if (active) {
    rest['aria-current'] = 'page';
  }

  return (
    <MenuItem
      active={active}
      disabled={disabled}
      className={cx(
        containerStyleOverrides,
        {
          [disabledStyleOverrides]: disabled,
        },
        className,
      )}
      titleTextClassName={cx(titleTextStyleOverrides, titleTextClassName)}
      description={description}
      href={href}
      {...rest}
    >
      {children}
    </MenuItem>
  );
}

SideNavItem.displayName = 'SideNavItem';

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  description: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
};

export default SideNavItem;
