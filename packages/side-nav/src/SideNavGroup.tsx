import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import ChevronRightIcon from '@leafygreen-ui/icon/dist/ChevronRight';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import {
  ulStyleOverrides,
  sideNavItemSidePadding,
  sideNavWidth,
} from './styles';

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
`;

const collapsableHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2px; // padding-bottom is 4px for not collapsable groups, but spec has the border closer to the element
  margin-bottom: 2px; // adds the remaining 2px of space between group header and subsequent content
  cursor: pointer;
  width: ${sideNavWidth}px;

  &:before {
    content: '';
    position: absolute;
    height: 2px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: ${uiColors.green.light3};
    border-radius: 2px;
    margin-left: 16px;
    margin-right: 16px;
  }
`;

const buttonResetStyles = css`
  background-color: transparent;
  border: none;
  padding: 0px;
  margin: 0px;

  &:focus {
    outline: none;
  }
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
  collapsable,
  ...rest
}: SideNavGroupProps) {
  const [open, setOpen] = React.useState(false);
  const nodeRef = React.useRef(null);

  if (collapsable != null) {
    return (
      <li {...rest}>
        <button
          className={buttonResetStyles}
          onClick={() => setOpen(curr => !curr)}
        >
          <h4 className={cx(sideNavLabelStyle, collapsableHeaderStyle)}>
            {header}
            <ChevronRightIcon
              size={12}
              className={cx(iconStyle, {
                [openIconStyle]: open,
              })}
            />
          </h4>
        </button>
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
      </li>
    );
  }

  return (
    <li {...rest}>
      <h4 className={sideNavLabelStyle}>{header}</h4>
      <ul role="menu" className={ulStyleOverrides}>
        {children}
      </ul>
    </li>
  );
  // const collapsableUl = (
  // <Transition
  //   in={open}
  //   timeout={150}
  //   mountOnEnter
  //   unmountOnExit
  //   nodeRef={nodeRef}
  // >
  //   {(state: string) => (
  //     <ul
  //       role="menu"
  //       className={cx(ulStyleOverrides, hideUl, {
  //         [showUl]: state === 'entered',
  //       })}
  //     >
  //       {children}
  //     </ul>
  //   )}
  // </Transition>
  // );

  // const defaultUl = (
  // <ul role="menu" className={ulStyleOverrides}>
  //   {children}
  // </ul>
  // );

  // const handleClick = () => {
  //   if (!collapsable) {
  //     return;
  //   }

  //   setOpen(curr => !curr);
  // };

  // return (
  //   <li {...rest}>
  //     <h4
  //       onClick={handleClick}
  // className={cx(sideNavLabelStyle, {
  //   [collapsableHeaderStyle]: collapsable,
  // })}
  //     >
  //       {header}
  //       {collapsable && (
  // <ChevronRightIcon
  //   size={12}
  //   className={cx(iconStyle, {
  //     [openIconStyle]: open,
  //   })}
  // />
  //       )}
  //     </h4>
  //     {!collapsable ? defaultUl : collapsableUl}
  //   </li>
  // );
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
