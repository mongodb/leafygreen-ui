import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import { css, cx } from '@leafygreen-ui/emotion';
import { useEventListener } from '@leafygreen-ui/hooks';
import { HTMLElementProps, IdAllocator, keyMap } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import CollapseButton from './CollapseButton';
import { SideNavContext } from './contexts';
import {
  sideNavWidth,
  sideNavCollapsedWidth,
  transitionDurationMilliseconds,
  useHover,
} from './utils';

const navStyle = css`
  position: relative;
  z-index: 0;
  min-height: 100%;
  min-width: ${sideNavWidth}px;
  width: ${sideNavWidth}px;
  user-select: none;
  background-color: ${uiColors.gray.light3};
  border-right: 1px solid ${uiColors.gray.light2};
  transition: all ${transitionDurationMilliseconds}ms ease-in-out;
`;

const collapsedNavStyle = css`
  position: absolute;
  min-width: ${sideNavCollapsedWidth}px;
  width: ${sideNavCollapsedWidth}px;
  top: 0;
  bottom: 0;
`;

const collapsedHoveredNavStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  border-width: 0;
  box-shadow: 6px 0 10px -8px ${transparentize(0.7, uiColors.black)};
`;

const collapsedSpacerStyle = css`
  min-width: ${sideNavCollapsedWidth}px;
  width: ${sideNavCollapsedWidth}px;
`;

const navListStyle = css`
  position: relative;
  padding: 0;
  margin-top: 5px;
  overflow: hidden;
  list-style: none;
  transition: all ${transitionDurationMilliseconds}ms ease-in-out;
  border-top: 1px solid rgba(0, 0, 0, 0);
  border-bottom: 1px solid rgba(0, 0, 0, 0);
`;

const collapsedNavListStyle = css`
  margin-top: 64px;

  &:not(:empty) {
    border-bottom-color: ${uiColors.gray.light2};
  }
`;

type Props = {
  children: React.ReactNode;
  className?: string;
  currentPath?: string;
} & (
  | { collapsible: false; initialCollapsed?: undefined }
  | { collapsible?: true; initialCollapsed?: boolean }
) &
  Omit<HTMLElementProps<'nav'>, 'ref'>;

const idAllocator = IdAllocator.create('side-nav');

const SideNav = React.forwardRef<HTMLElement, Props>(function SideNav(
  {
    children,
    className,
    currentPath,
    collapsible = true,
    initialCollapsed = false,
    onMouseOver: onMouseOverProp,
    onMouseLeave: onMouseLeaveProp,
    ...rest
  }: Props,
  ref,
) {
  const id = useMemo(() => idAllocator.generate(), []);

  const [collapsedState, setCollapsedState] = useState(
    collapsible ? initialCollapsed : false,
  );

  const collapsed = collapsible && collapsedState;

  useEffect(() => {
    if (!collapsible) {
      setCollapsedState(false);
    }
  }, [collapsible]);

  const { hovered, onMouseOver, onMouseLeave } = useHover({
    transitionDurationMilliseconds,
    onMouseOver: onMouseOverProp,
    onMouseLeave: onMouseLeaveProp,
    enabled: collapsed,
  });

  const toggleCollapse = useCallback(() => {
    setCollapsedState(collapsedState => !collapsedState);
  }, []);

  useEventListener(
    'keydown',
    event => {
      if (event.keyCode === keyMap.BracketLeft) {
        event.preventDefault();
        event.stopImmediatePropagation();
        toggleCollapse();
      }
    },
    { dependencies: [collapsible, toggleCollapse], enabled: collapsible },
  );

  // We want to prevent the collapse button from capturing hover but we
  // can't just check if button ref contains the hover target because the
  // button ref is unstable due to its use of Tooltip.
  const stopHoverPropagation = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  const shouldRenderCollapsedState = collapsed && !hovered;
  const providerData = useMemo(
    () => ({ collapsed: shouldRenderCollapsedState, currentPath }),
    [shouldRenderCollapsedState, currentPath],
  );

  return (
    <SideNavContext.Provider value={providerData}>
      <div className={cx({ [collapsedSpacerStyle]: collapsed })} />
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      <nav
        ref={ref}
        aria-label="side-nav"
        className={cx(
          navStyle,
          {
            [collapsedNavStyle]: shouldRenderCollapsedState,
            [collapsedHoveredNavStyle]: collapsed && hovered,
          },
          className,
        )}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        {...rest}
      >
        {collapsible && (
          <CollapseButton
            navId={id}
            onTrigger={toggleCollapse}
            onMouseOver={hovered ? undefined : stopHoverPropagation}
            collapsed={collapsed}
            hovered={hovered}
          />
        )}
        <ul
          className={cx(navListStyle, {
            [collapsedNavListStyle]: shouldRenderCollapsedState,
          })}
        >
          {children}
        </ul>
      </nav>
    </SideNavContext.Provider>
  );
});

export default SideNav;

SideNav.displayName = 'SideNav';

SideNav.propTypes = {
  className: PropTypes.string,
  currentPath: PropTypes.string,
  // @ts-expect-error PropTypes typing doesn't work well with unions
  collapsible: PropTypes.bool,
  initialCollapsed: PropTypes.bool,
};
