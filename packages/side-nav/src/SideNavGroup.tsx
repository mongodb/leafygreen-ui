import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import ChevronRightIcon from '@leafygreen-ui/icon/dist/ChevronRight';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { createDataProp, OneOf } from '@leafygreen-ui/lib';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import {
  ulStyleOverrides,
  sideNavItemSidePadding,
  sideNavWidth,
} from './styles';

const button = createDataProp('side-nav-group-button');

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

const collapsibleHeaderStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2px; // padding-bottom is 4px for not collapsible groups, but spec has the border closer to the element
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
    transition: background-color 150ms ease-in-out;
  }

  &:hover:before {
    background-color: ${uiColors.green.base};
  }
`;

const collapsibleHeaderFocusStyle = css`
  ${button.selector}:focus & {
    color: ${uiColors.blue.base};

    &:before {
      background-color: ${uiColors.blue.light3};
    }
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

const defaultStyle = css`
  transition: all 150ms ease-in-out;
  max-height: 0;
  overflow: hidden;
  opacity: 1;
`;

const transitionStyles = {
  entering: css`
    opacity: 0;
  `,
  exiting: css`
    opacity: 0;
  `,
  exited: css`
    opacity: 0;
  `,
};

interface SideNavGroupBaseProps {
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

type CollapsedProps = OneOf<
  {
    /**
     * Determines whether or not the Group can be collapsed.
     *
     * @defaultValue `false`
     */
    collapsible: true;

    /**
     * If collapsible, determines whether or not the group should be XX or collapsed by default.
     *
     * @defaultValue `true`
     */
    initialCollapsed?: boolean;
  },
  {
    collapsible?: false;
  }
>;

type SideNavGroupProps = CollapsedProps & SideNavGroupBaseProps;

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
 * @param props.collapsible Determines whether or not the Group can be collapsed. @defaultValue false
 * @param props.initialCollapsed Determines whether or not the Group is open by default. @defaultValue true
 */
function SideNavGroup({
  header,
  children,
  collapsible = false,
  initialCollapsed,
  ...rest
}: SideNavGroupProps) {
  const [open, setOpen] = React.useState(!initialCollapsed);
  const nodeRef = React.useRef(null);
  const ulRef = React.useRef<HTMLUListElement>(null);
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();

  if (collapsible) {
    return (
      <li {...rest}>
        <button
          {...button.prop}
          className={buttonResetStyles}
          onClick={() => setOpen(curr => !curr)}
        >
          <h4
            className={cx(sideNavLabelStyle, collapsibleHeaderStyle, {
              [collapsibleHeaderFocusStyle]: showFocus,
            })}
          >
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
          appear
          timeout={150}
          nodeRef={nodeRef}
          mountOnEnter
          unmountOnExit
        >
          {(state: string) => (
            <div
              ref={nodeRef}
              className={cx(defaultStyle, {
                [transitionStyles.entering]: state === 'entering',
                [css`
                  opacity: 1;
                  max-height: ${ulRef?.current?.getBoundingClientRect()
                    .height}px;
                `]: state === 'entered',
                [transitionStyles.exiting]: state === 'exiting',
                [transitionStyles.exited]: state === 'exited',
              })}
            >
              <ul ref={ulRef} role="menu" className={ulStyleOverrides}>
                {children}
              </ul>
            </div>
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
