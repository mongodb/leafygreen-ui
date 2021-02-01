import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
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
} from './utils';

const navStyle = css`
  position: relative;
  z-index: 0;
  min-height: 100%;
  min-width: ${sideNavWidth}px;
  width: ${sideNavWidth}px;

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
  padding-top: 16px;
  height: 100%;
  overflow: hidden;
  transition: all ${transitionDurationMilliseconds}ms ease-in-out;
`;

const collapsedNavListStyle = css`
  padding-top: 64px;
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
    ...rest
  }: Props,
  ref,
) {
  const id = useMemo(() => idAllocator.generate(), []);

  const [collapsed, setCollapsed] = useState(
    collapsible ? initialCollapsed : false,
  );

  // Manually detect hover so that hover state can be passed through the context.
  // Using pure CSS would require the nav component to import a data prop selector
  // from every sub-component or an equivalent amount of work.
  const [hovered, setHovered] = useState(false);

  // Debounce hover changes to prevent jitter when rapidly moving the mouse
  // on and off the nav. Alternatively we could set transition-delay for this
  // and all sub-components, but that would be less convenient and wouldn't
  // prevent unnecessary re-renders.
  const debouncedSetHovered = useMemo(
    () => ({
      toTrue: debounce(() => setHovered(true), transitionDurationMilliseconds),
      toFalse: debounce(
        () => setHovered(false),
        transitionDurationMilliseconds,
      ),
    }),
    [],
  );

  const onMouseOver = useCallback(() => {
    debouncedSetHovered.toFalse.cancel();
    debouncedSetHovered.toTrue();
  }, [debouncedSetHovered]);

  const onMouseLeave = useCallback(() => {
    debouncedSetHovered.toTrue.cancel();
    debouncedSetHovered.toFalse();
  }, [debouncedSetHovered]);

  useEffect(() => {
    if (!collapsible) {
      debouncedSetHovered.toTrue.cancel();
      setHovered(false);

      setCollapsed(false);
    }
  }, [collapsible, debouncedSetHovered]);

  const toggleCollapse = useCallback(() => {
    debouncedSetHovered.toTrue.cancel();
    setHovered(false);

    setCollapsed(collapsed => !collapsed);
  }, [debouncedSetHovered]);

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

  const providerData = useMemo(() => ({ collapsed, hovered, currentPath }), [
    collapsed,
    currentPath,
    hovered,
  ]);

  const shouldRenderCollapsedState = collapsed && !hovered;

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
        onMouseOver={collapsed ? onMouseOver : undefined}
        onMouseLeave={collapsed ? onMouseLeave : undefined}
        {...rest}
      >
        {collapsible && (
          <CollapseButton
            navId={id}
            onTrigger={toggleCollapse}
            onMouseOver={hovered ? undefined : stopHoverPropagation}
          />
        )}
        <div
          className={cx(navListStyle, {
            [collapsedNavListStyle]: shouldRenderCollapsedState,
          })}
        >
          {children}
        </div>
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
