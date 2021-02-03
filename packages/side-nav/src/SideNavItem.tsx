import React, { useCallback, useContext, useEffect, useMemo } from 'react';
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
  & svg:first-child {
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

const sideNavItemExpandedCollapsibleGroupStyle = css`
  padding-left: 28px;
`;

const sideNavItemCollapsedStyle = css`
  padding-top: 0;
  padding-bottom: 0;

  &:hover {
    background-color: inherit;
  }
`;

const sideNavItemWithGlyphNavCollapsedStyle = css`
  margin-top: 0;
  height: 40px;
  border-top-width: 1px;
  color: ${uiColors.green.dark2};
  overflow: hidden;

  &:hover {
    cursor: inherit;
  }
`;

const sideNavItemContentStyle = css`
  opacity: 1;
  transition: all ${transitionDurationMilliseconds}ms ease-in-out;
`;

const sideNavItemContentCollapsedStyle = css`
  opacity: 0;
  height: 0;
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
    if (!hasGlyph || (groupCollapsed && !navCollapsed)) {
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
  }, [disabled, glyphVisibility, groupCollapsed, hasGlyph, navCollapsed]);

  const ariaLabel =
    ariaLabelProp ?? (typeof children === 'string' ? children : undefined);

  const props = useMemo(() => {
    const commonStyles = cx(sideNavItemStyle, {
      [sideNavItemNonGroupStyle]: !isInGroup,
      [sideNavItemNonGroupLinkStyle]: !isInGroup && isLink,
    });

    if (shouldRenderCollapsedState) {
      return {
        'aria-label': shouldRenderGlyph ? ariaLabel : undefined,
        tabIndex: -1,
        className: cx(commonStyles, sideNavItemCollapsedStyle, {
          [sideNavItemWithGlyphNavCollapsedStyle]: shouldRenderGlyph,
        }),
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
          {
            [sideNavItemFocusStyle]: usingKeyboard,
            [sideNavItemWithGlyphStyle]: hasGlyph,
            [sideNavItemActiveStyle]: isActive,
            [sideNavItemDisabledStyle]: disabled,
            [sideNavItemExpandedCollapsibleGroupStyle]:
              groupCollapsible && !groupCollapsed,
          },
          className,
        ),
        onClick,
        onKeyDown,
        href,
      };
    }
  }, [
    ariaLabel,
    className,
    disabled,
    hasGlyph,
    href,
    isActive,
    isInGroup,
    isLink,
    onClick,
    onKeyDown,
    groupCollapsible,
    groupCollapsed,
    shouldRenderCollapsedState,
    shouldRenderGlyph,
    usingKeyboard,
  ]);

  return (
    <Box as="a" ref={setRef} {...props} {...rest}>
      {shouldRenderGlyph && glyph}
      <div
        className={cx(sideNavItemContentStyle, {
          [sideNavItemContentCollapsedStyle]: shouldRenderCollapsedState,
        })}
      >
        {children}
      </div>
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
