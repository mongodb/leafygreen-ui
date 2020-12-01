import React, { useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { IdAllocator } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { SideNavContext, SideNavGroupContext } from './contexts';
import { GlyphElement, transitionDurationMilliseconds } from './utils';

const sideNavGroupStyle = css`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  border: 0 solid ${uiColors.gray.light2};
  transition: all ${transitionDurationMilliseconds}ms ease-in-out;
`;

const sideNavGroupCollapsedStyle = css`
  margin: 0;
  border-top-width: 1px;

  &:last-of-type {
    border-bottom-width: 1px;
  }
`;

const sideNavGroupCollapsedAndCurrentStyle = css`
  background-color: ${uiColors.green.light3};
`;

const sideNavGroupHeaderStyle = css`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  padding: 0 16px;
  text-transform: uppercase;
  white-space: nowrap;
  font-size: 11px;
  font-weight: bold;
  line-height: 16px;
  color: ${uiColors.green.dark2};
`;

const sideNavGroupHeaderCollapsedStyle = css`
  height: 40px;
  margin-bottom: 0;
`;

const glyphStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

interface Props {
  className?: string;
  children: React.ReactNode;
  label: string;
  glyph: GlyphElement;
}

const idAllocator = IdAllocator.create('side-nav-group');

export default function SideNavGroup({
  className,
  children,
  label,
  glyph,
}: Props) {
  const { collapsed, hovered, currentPath } = useContext(SideNavContext);

  const id = useMemo(() => idAllocator.generate(), []);

  const [containedPaths, setContainedPaths] = useState<Set<string>>(
    () => new Set(),
  );

  const addPath = useCallback((path: string) => {
    setContainedPaths(containedPaths => {
      if (!containedPaths.has(path)) {
        const updatedPaths = new Set(containedPaths);
        return updatedPaths.add(path);
      } else {
        return containedPaths;
      }
    });
  }, []);

  const removePath = useCallback((path: string) => {
    setContainedPaths(containedPaths => {
      if (containedPaths.has(path)) {
        const updatedPaths = new Set(containedPaths);
        updatedPaths.delete(path);
        return updatedPaths;
      } else {
        return containedPaths;
      }
    });
  }, []);

  const providerData = useMemo(() => ({ addPath, removePath }), [
    addPath,
    removePath,
  ]);

  const showCollapsed = collapsed && !hovered;
  const containsCurrentPath =
    currentPath !== undefined && containedPaths.has(currentPath);

  return (
    <div
      role={showCollapsed ? undefined : 'group'}
      aria-labelledby={showCollapsed ? undefined : id}
      aria-label={showCollapsed ? label : undefined}
      className={cx(
        sideNavGroupStyle,
        {
          [sideNavGroupCollapsedStyle]: showCollapsed,
          [sideNavGroupCollapsedAndCurrentStyle]:
            showCollapsed && containsCurrentPath,
        },
        className,
      )}
    >
      <div
        id={id}
        aria-hidden={showCollapsed}
        className={cx(sideNavGroupHeaderStyle, {
          [sideNavGroupHeaderCollapsedStyle]: showCollapsed,
        })}
      >
        {glyph && <div className={glyphStyle}>{glyph}</div>}
        {!showCollapsed && label}
      </div>
      <SideNavGroupContext.Provider value={providerData}>
        {children}
      </SideNavGroupContext.Provider>
    </div>
  );
}

SideNavGroup.displayName = 'SideNavGroup';

SideNavGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  glyph: PropTypes.element,
};
