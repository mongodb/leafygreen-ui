import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import ChevronRightIcon from '@leafygreen-ui/icon/dist/ChevronRight';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { ulStyleOverrides, sideNavItemSidePadding } from './styles';

const sideNavLabelStyle = css`
  font-size: 12px;
  letter-spacing: 0.3px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${uiColors.green.dark2};
  margin-top: 12px;
  margin-bottom: 0;
  padding: 4px ${sideNavItemSidePadding}px 4px ${sideNavItemSidePadding}px;
  line-height: 1.3em;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    height: 1px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #0b3b35;
    margin-left: 16px;
    margin-right: 16px;
  }
`;

const collapsableHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const iconStyle = css`
  transition: 150ms all ease-in-out;
`;

const openIconStyle = css`
  transform: rotate(90deg);
  transition: 150ms all ease-in-out;
`;

const hideUl = css`
  opacity: 0;
  transition: opacity 150ms ease-in-out;
`;

const showUl = css`
  opacity: 1;
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

  /**
   * Determines whether or not the Group can be collapsed.
   *
   * @default: `false`
   */
  collapsable?: boolean;
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
 * @param props.collapsable Determines whether or not the Group can be collapsed.
 */
function SideNavGroup({
  header,
  children,
  collapsable = false,
  ...rest
}: SideNavGroupProps) {
  const [open, setOpen] = React.useState(false);
  const nodeRef = React.useRef(null);

  const collapsableUl = (
    <Transition
      in={open}
      timeout={150}
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      {(state: string) => (
        <ul
          role="menu"
          className={cx(ulStyleOverrides, hideUl, {
            [showUl]: state === 'entered',
          })}
        >
          {children}
        </ul>
      )}
    </Transition>
  );

  const defaultUl = (
    <ul role="menu" className={ulStyleOverrides}>
      {children}
    </ul>
  );

  return (
    <li {...rest}>
      <h4
        className={cx(sideNavLabelStyle, {
          [collapsableHeaderStyle]: collapsable,
        })}
      >
        {header}
        {collapsable && (
          <ChevronRightIcon
            size={10}
            onClick={() => setOpen(curr => !curr)}
            className={cx(iconStyle, {
              [openIconStyle]: open,
            })}
          />
        )}
      </h4>
      {!collapsable ? defaultUl : collapsableUl}
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
