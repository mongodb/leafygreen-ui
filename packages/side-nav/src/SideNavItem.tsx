import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import {
  AriaCurrentValue,
  enforceExhaustive,
  keyMap,
  OneOf,
} from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import Portal from '@leafygreen-ui/portal';
import { SideNavContext, SideNavGroupContext } from './contexts';
import {
  GlyphElement,
  GlyphVisibility,
  sideNavCollapsedWidth,
  sideNavWidth,
  transitionDurationMilliseconds,
} from './utils';

const sideNavItemNavExpandedNonGroupLiMarginStyle = css`
  // If it's the first item in the nav we want it to be aligned to the chevron
  &:first-of-type {
    margin-top: 11px;
  }
`;

const sideNavItemStyle = css`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  width: ${sideNavWidth}px;
  cursor: pointer;
  font-size: 14px;
  line-height: 16px;
  text-decoration: none;
  text-transform: capitalize;
  outline: none;
  overflow: hidden;
  border: 0 solid ${uiColors.gray.light2};
  color: ${uiColors.gray.dark2};
  // Chrome has a bug that makes the border black during transition so
  // just disable the border transition since it's hard to notice anyway
  transition: all ${transitionDurationMilliseconds}ms ease-in-out, border none;
`;

const sideNavItemExpandedStyle = css`
  &:hover {
    background-color: ${uiColors.gray.light2};
  }
`;

const sideNavItemFocusStyle = css`
  &:focus {
    color: ${uiColors.blue.dark3};
    background-color: ${uiColors.blue.light3};
  }
`;

const sideNavItemDisabledStyle = css`
  color: ${uiColors.gray.base};
  cursor: not-allowed;

  &:hover,
  &:focus {
    color: ${uiColors.gray.base};
    background-color: inherit;
  }
`;

const sideNavItemWithGlyphStyle = css`
  & > svg:first-child {
    margin-right: 5px;
  }
`;

const sideNavItemActiveStyle = css`
  background-color: ${uiColors.green.light3};
  color: ${uiColors.green.dark3};
  font-weight: bold;

  &:hover {
    background-color: ${uiColors.green.light3};
  }

  &:focus {
    color: ${uiColors.green.dark3};
    background-color: ${uiColors.green.light3};
  }
`;

const sideNavItemNonGroupStyle = css`
  font-weight: bold;
`;

const sideNavItemNonGroupLinkStyle = css`
  font-weight: normal;
  color: ${uiColors.blue.base};
`;

const sideNavItemCollapsibleGroupStyle = css`
  padding-left: 28px;
`;

const contentsStyle = css`
  transition: all ${transitionDurationMilliseconds}ms ease-in-out;
`;

const hiddenContentsStyle = css`
  opacity: 0;
`;

const sideNavItemWithGlyphNavCollapsedStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  height: 40px;
  width: ${sideNavCollapsedWidth}px;
  color: ${uiColors.green.dark2};
  border-top: 1px solid ${uiColors.gray.light2};
  opacity: 1;
  transition: all ${transitionDurationMilliseconds}ms ease-in-out;
`;

const sideNavItemNonGroupWithGlyphNavCollapsedStyle = css`
  & > svg:first-child {
    margin-right: 0;
  }
`;

const sideNavItemWithoutGlyphNavCollapsedStyle = css`
  padding: 0;
`;

type TransitionStatus = Parameters<
  Extract<React.ComponentProps<typeof Transition>['children'], Function>
>[0];

function getCollapsedItemWithGlyphTransitionStyles(
  state: TransitionStatus,
): Record<string, boolean> {
  return {
    [css`
      height: 0;
      padding: 0 16px;
      opacity: 0;
      border: none;
    `]: state === 'exiting' || state === 'exited',
    [css`
      overflow: hidden;
    `]: state === 'exited',
  };
}

type Props = {
  className?: string;
  path?: string;
  href?: string;
  onClick?: React.MouseEventHandler;
  onKeyDown?: React.KeyboardEventHandler;
  onSelect?: (
    path: string | undefined,
    event: React.MouseEvent | React.KeyboardEvent,
  ) => void;
  disabled?: boolean;
} & OneOf<{ glyph: GlyphElement; glyphVisibility?: GlyphVisibility }, {}> &
  OneOf<
    { children: string },
    { 'aria-label': string; children: React.ReactNode }
  >;

const SideNavItem: ExtendableBox<
  Props & { ref?: React.Ref<any> },
  'a'
> = React.forwardRef(function SideNavItem(
  {
    className,
    children,
    glyph,
    glyphVisibility = GlyphVisibility.NavCollapsed,
    path,
    onSelect,
    'aria-label': ariaLabelProp,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    href,
    disabled = false,
    ...rest
  }: Props,
  refProp,
) {
  const { collapsed: navCollapsed, currentPath } = useContext(SideNavContext);

  const groupContextData = useContext(SideNavGroupContext);
  const groupCollapsed = groupContextData?.collapsed ?? false;
  const groupCollapsible = groupContextData?.collapsible ?? false;
  const containerRef = groupContextData?.containerRef ?? null;

  const { usingKeyboard } = useUsingKeyboardContext();

  useEffect(() => {
    if (groupContextData === null) {
      return;
    }

    const { addPath, removePath } = groupContextData;

    if (path) {
      addPath(path);

      return () => removePath(path);
    }
  }, [groupContextData, path]);

  const setRef = useCallback(
    (ref: HTMLElement | null) => {
      if (groupContextData === null) {
        return;
      }

      const { removePath } = groupContextData;

      // Remove the path from the item's group if it was unmounted
      if (ref === null && path !== undefined) {
        removePath(path);
      }

      if (typeof refProp === 'function') {
        refProp(ref);
      } else if (refProp) {
        refProp.current = ref;
      }
    },
    [groupContextData, path, refProp],
  );

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        return;
      }

      onSelect?.(path, event);
      onClickProp?.(event);
    },
    [disabled, onClickProp, onSelect, path],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (disabled) {
        return;
      }

      if (event.ctrlKey || event.shiftKey || event.altKey) {
        return onKeyDownProp?.(event);
      }

      if (event.keyCode === keyMap.Enter) {
        onSelect?.(path, event);
      }

      onKeyDownProp?.(event);
    },
    [disabled, onKeyDownProp, onSelect, path],
  );

  const isActive = path !== undefined && currentPath === path;
  const shouldRenderCollapsedState = groupCollapsed || navCollapsed;
  const hasGlyph = glyph !== undefined;
  const isInGroup = groupContextData !== null;
  const isLink = href !== undefined;

  const shouldRenderGlyph = useMemo(() => {
    if (!hasGlyph) {
      return false;
    }

    if (disabled) {
      return !navCollapsed;
    }

    switch (glyphVisibility) {
      case GlyphVisibility.NavCollapsed:
        return navCollapsed;
      case GlyphVisibility.NavExpanded:
        return !navCollapsed;
      case GlyphVisibility.Visible:
        return true;
      default:
        enforceExhaustive(glyphVisibility);
    }
  }, [disabled, glyphVisibility, hasGlyph, navCollapsed]);

  const shouldRenderCollapsedGlyph = navCollapsed && shouldRenderGlyph;

  // SideNavGroup will animate and hide it's <li /> list
  // when collapsed so we render outside of the list so
  // the collapsed state will appear
  const shouldPortalCollapsedGlyph = isInGroup && shouldRenderCollapsedGlyph;
  const nodeRef = useRef<HTMLDivElement>(null);

  const ariaLabel =
    ariaLabelProp ?? (typeof children === 'string' ? children : undefined);

  const renderedGlyph = shouldRenderGlyph
    ? React.cloneElement(glyph!, {
        'aria-hidden': true,
        role: 'presentation',
      })
    : null;

  const props = useMemo(() => {
    const commonStyles = cx(sideNavItemStyle, {
      [sideNavItemNonGroupStyle]: !isInGroup,
      [sideNavItemNonGroupLinkStyle]: !isInGroup && isLink,
      [sideNavItemCollapsibleGroupStyle]: groupCollapsible,
      [sideNavItemWithGlyphStyle]: hasGlyph,
    });

    if (shouldRenderCollapsedState) {
      return {
        'aria-label': shouldRenderGlyph ? ariaLabel : undefined,
        tabIndex: -1,
        className: cx(commonStyles, {
          [sideNavItemWithGlyphNavCollapsedStyle]:
            shouldRenderCollapsedGlyph && !shouldPortalCollapsedGlyph,
          [sideNavItemNonGroupWithGlyphNavCollapsedStyle]:
            !isInGroup &&
            shouldRenderCollapsedGlyph &&
            !shouldPortalCollapsedGlyph,
          [sideNavItemWithoutGlyphNavCollapsedStyle]: !(
            isInGroup || shouldRenderCollapsedGlyph
          ),
        }),
        children: (
          <>
            {isInGroup || shouldRenderCollapsedGlyph ? renderedGlyph : null}
            {isInGroup && (
              <div className={cx(contentsStyle, hiddenContentsStyle)}>
                {children}
              </div>
            )}
          </>
        ),
      };
    } else {
      return {
        'aria-label': ariaLabel,
        'aria-current': isActive
          ? AriaCurrentValue.Page
          : AriaCurrentValue.Unset,
        'aria-disabled': disabled,
        tabIndex: disabled ? -1 : 0,
        className: cx(
          commonStyles,
          sideNavItemExpandedStyle,
          {
            [sideNavItemFocusStyle]: usingKeyboard,
            [sideNavItemActiveStyle]: isActive,
            [sideNavItemDisabledStyle]: disabled,
          },
          className,
        ),
        onClick,
        onKeyDown,
        href,
        children: (
          <>
            {renderedGlyph}
            <div
              aria-hidden={shouldRenderCollapsedGlyph}
              className={cx(contentsStyle, {
                [hiddenContentsStyle]: shouldRenderCollapsedGlyph,
              })}
            >
              {children}
            </div>
          </>
        ),
      };
    }
  }, [
    ariaLabel,
    isInGroup,
    isLink,
    groupCollapsible,
    hasGlyph,
    shouldRenderCollapsedState,
    shouldRenderGlyph,
    shouldRenderCollapsedGlyph,
    shouldPortalCollapsedGlyph,
    renderedGlyph,
    isActive,
    disabled,
    usingKeyboard,
    className,
    onClick,
    onKeyDown,
    href,
    children,
  ]);

  return (
    <>
      <li
        role="none"
        className={cx({
          [sideNavItemNavExpandedNonGroupLiMarginStyle]:
            !isInGroup && !navCollapsed,
        })}
      >
        <Box
          as="a"
          ref={shouldPortalCollapsedGlyph ? undefined : setRef}
          role={isInGroup ? 'menuitem' : undefined}
          {...props}
          {...rest}
        />
      </li>
      <Transition
        in={shouldPortalCollapsedGlyph}
        timeout={transitionDurationMilliseconds}
        nodeRef={nodeRef}
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <Portal container={containerRef?.current}>
            <div
              ref={nodeRef}
              className={cx(
                sideNavItemWithGlyphNavCollapsedStyle,
                getCollapsedItemWithGlyphTransitionStyles(state),
              )}
            >
              {renderedGlyph}
            </div>
          </Portal>
        )}
      </Transition>
    </>
  );
});

export default SideNavItem;

SideNavItem.displayName = 'SideNavItem';

SideNavItem.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string,
  href: PropTypes.string,
  onSelect: PropTypes.func,
  // @ts-expect-error PropTypes typing doesn't work well with unions
  glyph: PropTypes.element,
  // @ts-expect-error PropTypes typing doesn't work well with unions
  glyphVisibility: PropTypes.oneOf(Object.values(GlyphVisibility)),
  // @ts-expect-error PropTypes typing doesn't work well with unions
  'aria-label': PropTypes.string,
  disabled: PropTypes.bool,
};
