import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { ulStyleOverrides, SIDE_OFFSET } from './styles';

const sideNavLabelStyle = css`
  font-size: 11px;
  letter-spacing: 0.3px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${uiColors.green.dark2};
  margin-top: 0;
  margin-bottom: 0;
  padding: 5px ${SIDE_OFFSET}px 5px ${SIDE_OFFSET}px;
`;

interface SideNavGroupProps {
  /**
   * Class name that will be applied to the root-level element.
   */
  className?: string;

  /**
   * Content that will be rendered as the component's header. If a string is provided,
   * it will be rendered with default styling as a header tag.
   */
  header?: React.ReactNode;

  /**
   * Content that will be rendered inside the root-level element.
   */
  children?: React.ReactNode;
}

/**
 * # SideNavGroup
 *
 * ```
<SideNavGroup headerText="Section Header">
  <SideNavItem href="/">
    Back to Home
  </SideNavItem>
</SideNavGroup>
 * ```
 *
 * @param props.className Class name that will be applied to the root-level element.
 * @param props.header Content that will be rendered as the component's header
 *   If a string is provided, it will be rendered with default styling as a header tag.
 * @param props.children Class name that will be applied to the component's header.
 */
function SideNavGroup({ header, children, ...rest }: SideNavGroupProps) {
  return (
    <li {...rest}>
      <h4 className={sideNavLabelStyle}>{header}</h4>
      <ul role="menu" className={ulStyleOverrides}>
        {children}
      </ul>
    </li>
  );
}

SideNavGroup.displayName = 'SideNavGroup';

SideNavGroup.propTypes = {
  className: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  children: PropTypes.node,
};

export default SideNavGroup;
