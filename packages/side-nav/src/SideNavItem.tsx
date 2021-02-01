import React, { useCallback, useContext, useEffect } from 'react';
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
import { SideNavContext, SideNavGroupContext } from './contexts';
import {
  GlyphElement,
  GlyphVisibility,
  sideNavWidth,
  transitionDurationMilliseconds,
} from './utils';

const sideNavItemStyle = css`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 32px;
  width: ${sideNavWidth}px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  text-transform: capitalize;
  border: 0 solid ${uiColors.gray.light2};
  color: ${uiColors.gray.dark2};
  // Chrome has a bug that makes the border black during transition
  // so just disable the transition since it's hard to notice anyway
  transition: all ${transitionDurationMilliseconds}ms ease-in-out, border none;
  text-decoration: none;
  outline: none;

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
  color: ${uiColors.gray.dark1};
  cursor: not-allowed;

  &:hover,
  &:focus {
    color: ${uiColors.gray.dark1};
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
  // margin-top: 4px;
  font-weight: bold;

  &:first-of-type {
    // margin-top: 4px;
  }
`;

const sideNavItemNonGroupLinkStyle = css`
  font-weight: normal;
  color: ${uiColors.blue.base};
`;

const sideNavItemNavCollapsedStyle = css`
  height: 0;
  opacity: 0;
  visibility: hidden;

  &:hover {
    background-color: inherit;
  }
`;

const sideNavItemWithGlyphNavCollapsedStyle = css`
  margin-top: 0;
  height: 40px;
  opacity: 1;
  visibility: visible;
  border-top-width: 1px;
  color: ${uiColors.green.dark2};

  &:hover {
    cursor: inherit;
  }
`;

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
    glyphVisibility = GlyphVisibility.OnlyCollapsed,
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
  const { collapsed: navCollapsed, hovered, currentPath } = useContext(
    SideNavContext,
  );
  const groupContextData = useContext(SideNavGroupContext);
  const groupCollapsed = groupContextData?.collapsed ?? false;
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
  const shouldRenderNavCollapsedState = navCollapsed && !hovered;
  const shouldRenderCollapsedState =
    groupCollapsed || shouldRenderNavCollapsedState;
  const hasGlyph = glyph !== undefined;
  const isInGroup = groupContextData !== null;
  const isLink = href !== undefined;

  let shouldRenderGlyph: boolean;

  if (hasGlyph) {
    if (!disabled) {
      switch (glyphVisibility) {
        case GlyphVisibility.OnlyCollapsed:
          shouldRenderGlyph = shouldRenderNavCollapsedState;
          break;
        case GlyphVisibility.OnlyExpanded:
          shouldRenderGlyph = !shouldRenderNavCollapsedState;
          break;
        case GlyphVisibility.Visible:
          shouldRenderGlyph = true;
          break;
        default:
          enforceExhaustive(glyphVisibility);
      }
    } else {
      shouldRenderGlyph = !shouldRenderNavCollapsedState;
    }
  } else {
    shouldRenderGlyph = false;
  }

  const ariaLabel =
    ariaLabelProp ?? (typeof children === 'string' ? children : undefined);

  if (shouldRenderCollapsedState) {
    return (
      <div
        aria-label={shouldRenderGlyph ? ariaLabel : undefined}
        className={cx(sideNavItemStyle, sideNavItemNavCollapsedStyle, {
          [sideNavItemWithGlyphNavCollapsedStyle]: shouldRenderGlyph,
          [sideNavItemNonGroupLinkStyle]: !isInGroup && isLink,
        })}
      >
        {shouldRenderGlyph && glyph}
      </div>
    );
  }

  return (
    <Box
      as="a"
      aria-label={ariaLabel}
      aria-current={isActive ? AriaCurrentValue.Page : AriaCurrentValue.Unset}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      ref={setRef}
      className={cx(
        sideNavItemStyle,
        {
          [sideNavItemFocusStyle]: usingKeyboard,
          [sideNavItemWithGlyphStyle]: hasGlyph,
          [sideNavItemActiveStyle]: isActive,
          [sideNavItemNonGroupStyle]: !isInGroup,
          [sideNavItemNonGroupLinkStyle]: !isInGroup && isLink,
          [sideNavItemDisabledStyle]: disabled,
        },
        className,
      )}
      onClick={onClick}
      onKeyDown={onKeyDown}
      href={href}
      {...rest}
    >
      {shouldRenderGlyph && glyph}
      {children}
    </Box>
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
