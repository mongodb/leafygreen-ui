import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import { useEventListener, useIdAllocator } from '@leafygreen-ui/hooks';
import { css, cx } from '@leafygreen-ui/emotion';
import { keyMap } from '@leafygreen-ui/lib';
import { validateAriaLabelProps } from '@leafygreen-ui/a11y';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';
import SideNavContext from './SideNavContext';
import CollapseToggle from './CollapseToggle';
import { SideNavProps } from './types';
import {
  sideNavWidth,
  ulStyleOverrides,
  collapseDuration,
  expandedEnteredStyle,
  expandedExitedStyle,
  space,
  collapsedSpace,
  wrapper,
  navStyles,
  collapsedNavStyles,
  hoverNavStyles,
  listWrapper,
  listStyles,
  collapsedEnteredStyle,
  collapsedExitedStyle,
  sideNavClassName,
} from './styles';

const sideNavSelector = `.${sideNavClassName}`;

export { sideNavSelector };

const expandedStateStyles: Partial<Record<TransitionStatus, string>> = {
  entering: expandedEnteredStyle,
  entered: expandedEnteredStyle,
  exiting: expandedExitedStyle,
  exited: expandedExitedStyle,
} as const;

const collapsedStateStyles: Partial<Record<TransitionStatus, string>> = {
  entering: collapsedEnteredStyle,
  entered: collapsedEnteredStyle,
  exiting: collapsedExitedStyle,
  exited: collapsedExitedStyle,
} as const;

/**
 * # SideNav
 *
 * ```
<SideNav>
  <SideNavGroup headerText="Section Header">
    <SideNavItem href="/">
      Back to Home
    </SideNavItem>
  </SideNavGroup>
</SideNav>
 * ```
 *
 * @param props.className Class name that will be applied to the root-level element.
 * @param props.children Content that will be rendered inside the root-level element.
 * @param props.baseFontSize Determines the base font size for the menu items.
 * @param props.widthOverride Provides an override for the SideNav width.
 * @param props.collapsed Allows consuming applications to control the collapsed state of the navigation.
 * @param props.setCollapsed Consuming application's collapsed-state management controller
 */
function SideNav({
  className,
  children,
  id: idProp,
  baseFontSize: baseFontSizeProp,
  widthOverride,
  collapsed: controlledCollapsed,
  setCollapsed: setControlledCollapsed = () => {},
  ...rest
}: SideNavProps) {
  const { Provider: SideNavProvider } = SideNavContext;
  const [uncontrolledCollapsed, uncontrolledSetCollapsed] = useState(false);
  const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
  const { usingKeyboard } = useUsingKeyboardContext();

  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const navId = useIdAllocator({ prefix: 'side-nav', id: idProp });
  const [portalContainer, setPortalContainer] =
    useState<HTMLUListElement | null>(null);
  const width =
    typeof widthOverride === 'number' ? widthOverride : sideNavWidth;

  const collapsed =
    typeof controlledCollapsed === 'boolean'
      ? controlledCollapsed
      : uncontrolledCollapsed;

  const setCollapsed =
    typeof controlledCollapsed === 'boolean'
      ? setControlledCollapsed
      : uncontrolledSetCollapsed;

  // We visually expand the navigation when a user focuses on an element within the navigation
  // while navigating via keyboard.
  const focusExpand = usingKeyboard && focus;

  // Nav element should have a programmatically-determinable label
  validateAriaLabelProps(rest, 'SideNav');

  // Global event listener for toggling the navigation.
  useEventListener(
    'keypress',
    e => {
      const disabledTagNames = ['INPUT', 'TEXTAREA'] as const;

      // Disable toggling the side navigation when a user is typing in an input.
      // The typing for useEventListener doesn't seem to like using event.target,
      // so we disable this here.
      // @ts-expect-error
      const shouldToggle = disabledTagNames.includes(e.target?.tagName);

      if (e.keyCode === keyMap.BracketLeft && !shouldToggle) {
        setCollapsed(curr => !curr);
      }
    },
    {
      options: {
        passive: true,
      },
    },
  );

  return (
    <Transition
      in={collapsed && !hover && !focusExpand}
      timeout={collapseDuration}
    >
      {state => (
        <SideNavProvider
          value={{
            navId,
            collapsed,
            portalContainer,
            width,
            transitionState: state,
            baseFontSize,
          }}
        >
          <div
            data-testid="side-nav-container"
            className={cx(
              sideNavClassName,
              space,
              css`
                width: ${width}px;
              `,
              { [collapsedSpace]: collapsed },
              className,
            )}
          >
            <div className={wrapper} onMouseLeave={() => setHover(false)}>
              <nav
                id={navId}
                className={cx(
                  navStyles,
                  css`
                    width: ${width}px;
                  `,
                  {
                    [collapsedNavStyles]: ['entering', 'entered'].includes(
                      state,
                    ),
                    [hoverNavStyles]: (hover || focusExpand) && collapsed,
                  },
                )}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onMouseEnter={() => setHover(true)}
                {...rest}
              >
                <div className={cx(listWrapper, expandedStateStyles[state])}>
                  <ul
                    className={cx(
                      ulStyleOverrides,
                      listStyles,
                      css`
                        width: ${width}px;
                      `,
                    )}
                  >
                    {children}
                  </ul>
                </div>

                <div className={cx(listWrapper, collapsedStateStyles[state])}>
                  <ul
                    // We hide the duplicate items from screen readers.
                    aria-hidden
                    className={cx(ulStyleOverrides, listStyles)}
                    ref={setPortalContainer}
                  />
                </div>
              </nav>

              <CollapseToggle
                collapsed={collapsed || (!hover && !focusExpand && collapsed)}
                onClick={() => {
                  setCollapsed(curr => !curr);
                  setHover(false);
                }}
                // This prevents any strange flickering while the navigation is transitioning.
                hideTooltip={
                  ['entering', 'exiting'].includes(state) || undefined
                }
              />
            </div>
          </div>
        </SideNavProvider>
      )}
    </Transition>
  );
}

SideNav.displayName = 'SideNav';

SideNav.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.string,
};

export default SideNav;
