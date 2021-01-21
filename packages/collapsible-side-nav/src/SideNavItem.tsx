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
  transitionDurationMilliseconds,
} from './utils';

const sideNavItemStyle = css`
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 32px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
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
    background-color: ${uiColors.green.light3};
    color: ${uiColors.green.dark3};
  }
`;

const sideNavItemNonGroupStyle = css`
  margin-top: 4px;
  font-weight: bold;
`;

const sideNavItemNonGroupLinkStyle = css`
  font-weight: normal;
  color: ${uiColors.blue.base};
`;

const sideNavItemCollapsedStyle = css`
  height: 0;
  opacity: 0;
  visibility: hidden;

  &:hover {
    background-color: initial;
  }
`;

const sideNavItemWithGlyphCollapsedStyle = css`
  margin-top: 0;
  height: 40px;
  opacity: 1;
  visibility: visible;
  border-top-width: 1px;
  color: ${uiColors.green.dark2};

  &:hover {
    cursor: initial;
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
    'aria-label': ariaLabel,
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    href,
    ...rest
  }: Props,
  refProp,
) {
  const { collapsed, hovered, currentPath } = useContext(SideNavContext);
  const groupContextData = useContext(SideNavGroupContext);
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
      onSelect?.(path, event);
      onClickProp?.(event);
    },
    [onClickProp, onSelect, path],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (event.ctrlKey || event.shiftKey || event.altKey) {
        return onKeyDownProp?.(event);
      }

      if (event.keyCode === keyMap.Enter) {
        onSelect?.(path, event);
      }

      onKeyDownProp?.(event);
    },
    [onKeyDownProp, onSelect, path],
  );

  const isActive = path !== undefined && currentPath === path;
  const showCollapsed = collapsed && !hovered;
  const hasGlyph = glyph !== undefined;
  const isInGroup = groupContextData !== null
  const isLink = href !== undefined;

  let showGlyph: boolean;

  if (hasGlyph) {
    switch (glyphVisibility) {
      case GlyphVisibility.OnlyCollapsed:
        showGlyph = showCollapsed;
        break;
      case GlyphVisibility.OnlyExpanded:
        showGlyph = !showCollapsed;
        break;
      case GlyphVisibility.Visible:
        showGlyph = true;
        break;
      default:
        enforceExhaustive(glyphVisibility);
    }
  } else {
    showGlyph = false;
  }

  if (showCollapsed) {
    return (
      <div
        className={cx(sideNavItemStyle, sideNavItemCollapsedStyle, {
          [sideNavItemWithGlyphCollapsedStyle]: showGlyph,
          [sideNavItemNonGroupLinkStyle]: !isInGroup && isLink,
        })}
      >
        {showGlyph && glyph}
      </div>
    );
  }

  return (
    <Box
      as="a"
      aria-label={
        ariaLabel ?? (typeof children === 'string' ? children : undefined)
      }
      aria-current={isActive ? AriaCurrentValue.Page : AriaCurrentValue.Unset}
      tabIndex={0}
      ref={setRef}
      className={cx(
        sideNavItemStyle,
        {
          [sideNavItemFocusStyle]: usingKeyboard,
          [sideNavItemWithGlyphStyle]: hasGlyph,
          [sideNavItemActiveStyle]: isActive,
          [sideNavItemNonGroupStyle]: !isInGroup,
          [sideNavItemNonGroupLinkStyle]: !isInGroup && isLink,
        },
        className,
      )}
      onClick={onClick}
      onKeyDown={onKeyDown}
      href={href}
      {...rest}
    >
      {showGlyph && glyph}
      {!showCollapsed && children}
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
  // @ts-expect-error PropTypes typing doesn't work well with OneOf
  glyph: PropTypes.element,
  // @ts-expect-error PropTypes typing doesn't work well with OneOf
  glyphVisibility: PropTypes.oneOf(Object.values(GlyphVisibility)),
  // @ts-expect-error PropTypes typing doesn't work well with OneOf
  'aria-label': PropTypes.string,
};
