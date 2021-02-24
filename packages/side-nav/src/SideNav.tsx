import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import { Transition } from 'react-transition-group';
import { TransitionStatus } from 'react-transition-group/Transition';
import {prefersReducedMotion} from '@leafygreen-ui/a11y';
import {useEventListener} from '@leafygreen-ui/hooks';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';
import {keyMap} from '@leafygreen-ui/lib';
import { sideNavWidth, ulStyleOverrides, collapseDuration } from './styles';
import SideNavContext from './SideNavContext';
import CollapseToggle from './CollapseToggle';

const navStyles = css`
  transition: all ${collapseDuration}ms ease-in-out;
  width: ${sideNavWidth}px;
  background-color: ${uiColors.gray.light3};
  border-right: 1px solid ${uiColors.gray.light2};
  position: relative;
  z-index: 0;
  overflow-y: auto;
  overflow-x: hidden;


  ${prefersReducedMotion(`
    transition: all ${collapseDuration}ms ease-in-out, width 0ms linear;
  `)}
`;

const collapsedNavStyles = css`
  width: 48px;
`;

const hoverNavStyles = css`
  box-shadow: 2px 0 4px ${transparentize(0.9, uiColors.black)};
  border-right-color: ${uiColors.gray.light3};
`;

const listStyles = css`
  transition: opacity ${collapseDuration}ms ease-in-out, transform ${collapseDuration}ms ease-in-out;
  position: absolute;
  left: 0;
  right: 0;
  top: ${spacing[3]}px;

  ${prefersReducedMotion(`
    transition: opacity ${collapseDuration}ms ease-in-out;
  `)}
`;

const expandedListStyle = css`
  width: ${sideNavWidth}px;
`;

const wrapper = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
`;

const space = css`
  transition: width ${collapseDuration}ms ease-in-out;
  width: ${sideNavWidth}px;
  position: relative;

  ${prefersReducedMotion(`
    transition: none;
  `)}
`;

const collapsedSpace = css`
  width: 48px;
`
const expandedStateStyles: Partial<Record<TransitionStatus, string>> = {
  entering: css`
    transform: translate3d(0, ${spacing[2]}px, 0);
    opacity: 0;
  `,
  entered: css`
    transform: translate3d(0, ${spacing[2]}px, 0);
    opacity: 0;
  `,
  exiting: css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `,
  exited: css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `,
} as const;

const collapsedStateStyles: Partial<Record<TransitionStatus, string>> = {
  entering: css`
    transform: translate3d(0, 0, 0);
    opacity: 1;  
  `,
  entered: css`
    transform: translate3d(0, 0, 0);
    opacity: 1;
  `,
  exiting: css`
    transform: translate3d(0, -${spacing[2]}px, 0);
    opacity: 0;
  `,
  exited: css`
    transform: translate3d(0, -${spacing[2]}px, 0);
    opacity: 0;
  `,
} as const;

interface SideNavProps {
  /**
   * Class name that will be applied to the root-level element.
   */
  className?: string;

  /**
   * Content that will be rendered inside the root-level element.
   */
  children?: React.ReactNode;

  /**
   * The currentPath prop is used to set the correct element in the navigation to active.
   */
  currentPath?: string;
}

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
 */
function SideNav({
  className,
  currentPath = '',
  children,
  ...rest
}: SideNavProps) {
  const { Provider: ContextProvider } = SideNavContext;
  const [collapsed, setCollapsed] = useState(false);
  const [hover, setHover] = useState(false);
  const [
    portalContainer,
    setPortalContainer,
  ] = useState<HTMLUListElement | null>(null);

  // Global event listener for toggling the navigation.
  useEventListener('keypress', e => {
    const disabledTagNames = ['INPUT', 'TEXTAREA'] as const;

    // Disable toggling the side navigation when a user is typing in an input.
    // The typing for useEventListener doesn't seem to like using event.target,
    // so we disable this here.
    // @ts-expect-error
    const shouldToggle = disabledTagNames.includes(e.target?.tagName);

    if (e.keyCode === keyMap.BracketLeft && !shouldToggle) {
      setCollapsed(curr => !curr);
    }
  }, {
    options: {
      passive: true,
    },
  })

  return (
    <Transition in={collapsed && !hover} timeout={collapseDuration}>
      {state => (
        <ContextProvider
          value={{
            currentPath,
            collapsed,
            setCollapsed,
            portalContainer: portalContainer,
            transitionState: state,
          }}
        >
          <div className={cx(space, {[collapsedSpace]: collapsed}, className)}>
            <div
              className={wrapper}
              onMouseLeave={() => setHover(false)}
            >
              <nav
                className={cx(
                  navStyles,
                  {
                    [collapsedNavStyles]: ['entering', 'entered'].includes(state),
                    [hoverNavStyles]: hover && collapsed,
                  },
                )}
                aria-label="side-nav"
                onMouseEnter={() => setHover(true)}
                {...rest}
              >
                <ul className={cx(ulStyleOverrides, listStyles, expandedListStyle, expandedStateStyles[state])}>
                  {children}
                </ul>

                <ul
                  className={cx(ulStyleOverrides, listStyles, collapsedStateStyles[state])}
                  ref={setPortalContainer}
                />
              </nav>

              <CollapseToggle
                collapsed={collapsed || (!hover && collapsed)}
                onClick={() => setCollapsed(curr => !curr)}
                // This prevents any strange flickering while the navigation is transitioning.
                hideTooltip={['entering', 'exiting'].includes(state) || undefined}
              />
            </div>
          </div>
        </ContextProvider>
      )}
    </Transition>
  );
}

SideNav.displayName = 'SideNav';

SideNav.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  currentPath: PropTypes.string,
};

export default SideNav;
