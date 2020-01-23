import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { MenuItem } from '@leafygreen-ui/menu';
import { AriaCurrentValue } from '@leafygreen-ui/lib';
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
  font-size: 14px;
  text-transform: capitalize;
`;

const disabledStyleOverrides = css`
  background-color: transparent;
  pointer-events: none;
`;

// interface MenuItemProps {
//   /**
//    * Whether or not the SideNavItem will be displayed as active.
//    */
//   active?: boolean;
//   /**
//    * Whether or not the SideNavItem will be displayed as disabled.
//    */
//   disabled?: boolean;
//   /**
//    * When provided, the underlying MenuItem's root component will be rendered as an anchor with this href value.
//    */
//   href?: string;
//   /**
//    * The value for aria-current if the SideNavItem is active
//    */
//   ariaCurrentValue?: AriaCurrentValue;
//   /**
//    * Class name that will be applied to the underlying MenuItem's root component.
//    */
//   className?: string;
//   /**
//    * Content that will appear inside of the underlying MenuItem's content wrapper.
//    */
//   children?: React.ReactNode;
// }

/**
 * # SideNavItem
 *
 * ```
  <SideNavItem href="#homeward" titleTextClassName="header-bold" active>
    Link Title
  </SideNavItem>
 * ```
 @param props.active Whether or not the SideNavItem will be displayed as active.
 @param props.disabled Whether or not the SideNavItem will be displayed as disabled.
 @param props.href When provided, the underlying MenuItem's root component will be rendered as an anchor with this href value.
 @param props.description Description text optionally displayed below the SideNavItem's title.
 @param props.ariaCurrentValue The value for aria-current if the SideNavItem is active
 @param props.className Class name that will be applied to the underlying MenuItem's root component.
 @param props.titleTextClassName Class name that will be applied to the underlying MenuItem's content wrapper.
 @param props.children Content that will appear inside of the underlying MenuItem's content wrapper.
 *
 */
function SideNavItem() {}

SideNavItem.displayName = 'SideNavItem';

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  description: PropTypes.string,
  ariaCurrentValue: PropTypes.oneOf(Object.values(AriaCurrentValue)),
  children: PropTypes.node,
  href: PropTypes.string,
};

export default SideNavItem;
