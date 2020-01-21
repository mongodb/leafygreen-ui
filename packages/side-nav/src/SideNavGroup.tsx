import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { createDataProp } from '@leafygreen-ui/lib';
import { ulStyleOverrides, LEFT_RIGHT_OFFSET } from './styles';

export const sideNavGroupDataProp = createDataProp('side-nav-group-section');

const sideNavLabelStyle = css`
  display: block;
  color: ${uiColors.green.base};
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 5px ${LEFT_RIGHT_OFFSET}px 5px ${LEFT_RIGHT_OFFSET}px;
`;

interface SideNavGroupProps {
  /**
   * Content that will appear inside of SideNavGroup component.
   */
  children: React.ReactNode;
  /**
   * ClassName that will be applied to root SideNavGroup element.
   */
  className?: string;
  /**
   * Header text displayed above the SideNavGroup contents.
   */
  headerText?: string;
  /**
   * ClassName that will be applied to SideNavGroup's header element.
   */
  headerClassName?: string;
}

/**
 * # SideNavGroup
 *
 * ```
<SideNavGroup headerText="Section Header">
  <SideNavItem>
    Link Content
  </SideNavItem>
</SideNavGroup>
 * ```
 * @param props.children Content that will appear inside of SideNavGroup component.
 * @param props.className ClassName that will be applied to root SideNavGroup element.
 * @param props.headerText Header text displayed above the SideNavGroup contents.
 * @param props.headerClassName ClassName that will be applied to SideNavGroup's header element.
 *
 */
function SideNavGroup({
  children,
  className,
  headerText,
  headerClassName,
  ...rest
}: SideNavGroupProps) {
  return (
    <li className={className} {...rest} {...sideNavGroupDataProp.prop}>
      {headerText && (
        <div className={cx(sideNavLabelStyle, headerClassName)} role="heading">
          {headerText}
        </div>
      )}
      <ul className={ulStyleOverrides}>{children}</ul>
    </li>
  );
}

SideNavGroup.displayName = 'SideNavGroup';

SideNavGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  headerText: PropTypes.string,
  headerClassName: PropTypes.string,
};

export default SideNavGroup;
