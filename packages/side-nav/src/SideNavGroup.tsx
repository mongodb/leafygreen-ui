import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { ulStyleOverrides, LEFT_RIGHT_OFFSET } from './styles';

const sideNavLabelStyle = css`
  color: ${uiColors.green.base};
  text-transform: uppercase;
  font-size: 12px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 5px ${LEFT_RIGHT_OFFSET}px 5px ${LEFT_RIGHT_OFFSET}px;
`;

interface SideNavGroupProps {
  /**
   * Class name that will be applied to SideNavGroup root component.
   */
  className?: string;
  /**
   * Text that will be displayed in the SideNavGroup optional header.
   */
  headerText?: string;
  /**
   * Class name that will be applied to SideNavGroup optional header.
   */
  headerClassName?: string;
  /**
   * Content that will appear inside of SideNavGroup root component.
   */
  children?: React.ReactNode;
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
 * @param props.className Class name that will be applied to SideNavGroup root component.
 * @param props.headerText Text that will be displayed in the SideNavGroup optional header.
 * @param props.headerClassName Class name that will be applied to SideNavGroup optional header.
 * @param props.children Content that will appear inside of SideNavGroup root component.
 *
 */
function SideNavGroup({
  headerText,
  headerClassName,
  children,
  ...rest
}: SideNavGroupProps) {
  return (
    <li {...rest}>
      {headerText && (
        <h4 className={cx(sideNavLabelStyle, headerClassName)}>
          {headerText}
        </h4>
      )}
      <ul className={ulStyleOverrides}>{children}</ul>
    </li>
  );
}

SideNavGroup.displayName = 'SideNavGroup';

SideNavGroup.propTypes = {
  className: PropTypes.string,
  headerText: PropTypes.string,
  headerClassName: PropTypes.string,
  children: PropTypes.node,
};

export default SideNavGroup;
