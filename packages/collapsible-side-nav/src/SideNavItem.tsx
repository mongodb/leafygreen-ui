import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { AriaCurrentValue, enforceExhaustive, OneOf } from '@leafygreen-ui/lib';
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
  transition: all ${transitionDurationMilliseconds}ms ease-in-out;

  &:hover {
    background-color: ${uiColors.gray.light2};
  }
`;

const sideNavItemWithGlyphStyle = css`
  & > svg:first-child {
    margin-right: 5px;
  }
`;

const sideNavItemLinkStyle = css`
  font-weight: normal;
  color: ${uiColors.blue.base};
`;

const sideNavItemActiveStyle = css`
  background-color: ${uiColors.green.light3};
  color: ${uiColors.green.dark3};
  font-weight: bold;

  &:hover {
    background-color: ${uiColors.green.light3};
  }
`;

const sideNavItemNonGroupStyle = css`
  margin-top: 4px;
  font-weight: bold;
`;

const sideNavItemCollapsedStyle = css`
  height: 0;
  opacity: 0;
  visibility: hidden;
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
  children: React.ReactNode;
  path?: string;
  href?: string;
  onClick?: React.MouseEventHandler;
} & OneOf<{ glyph: GlyphElement; glyphVisibility?: GlyphVisibility }, {}> &
  OneOf<
    { children: string },
    { 'aria-label': string; children: React.ReactNode }
  >;

export default function SideNavItem({
  className,
  children,
  glyph,
  glyphVisibility = GlyphVisibility.OnlyCollapsed,
  path,
  href,
  onClick,
  'aria-label': ariaLabel,
}: Props) {
  const { collapsed, hovered, currentPath } = useContext(SideNavContext);
  const groupContextData = useContext(SideNavGroupContext);

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
    },
    [groupContextData, path],
  );

  const isActive = path !== undefined && currentPath === path;
  const showCollapsed = collapsed && !hovered;
  const hasGlyph = glyph !== undefined;
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

  return (
    <a
      aria-label={
        ariaLabel ?? (typeof children === 'string' ? children : undefined)
      }
      aria-current={isActive ? AriaCurrentValue.Page : AriaCurrentValue.Unset}
      tabIndex={!isLink ? 0 : undefined}
      ref={setRef}
      className={cx(
        sideNavItemStyle,
        {
          [sideNavItemWithGlyphStyle]: hasGlyph,
          [sideNavItemActiveStyle]: isActive,
          [sideNavItemNonGroupStyle]: groupContextData === null,
          [sideNavItemCollapsedStyle]: showCollapsed,
          [sideNavItemWithGlyphCollapsedStyle]: showCollapsed && showGlyph,
          [sideNavItemLinkStyle]: isLink,
        },
        className,
      )}
      href={href}
      onClick={onClick}
    >
      {showGlyph && glyph}
      {!showCollapsed && children}
    </a>
  );
}

SideNavItem.displayName = 'SideNavItem';

SideNavItem.propTypes = {
  className: PropTypes.string,
  path: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  glyph: PropTypes.element,
  glyphVisibility: PropTypes.oneOf(Object.values(GlyphVisibility)),
  'aria-label': PropTypes.string,
};
