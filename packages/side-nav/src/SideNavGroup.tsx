import React, { useCallback, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps, IdAllocator, OneOf } from '@leafygreen-ui/lib';
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

const sideNavGroupNavCollapsedStyle = css`
  margin: 0;
`;

const sideNavGroupWithGlyphNavCollapsedStyle = css`
  border-top-width: 1px;

  &:last-of-type {
    border-bottom-width: 1px;
  }
`;

const sideNavGroupNavCollapsedAndCurrentStyle = css`
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

const sideNavGroupHeaderNavCollapsedStyle = css`
  margin-bottom: 0;
`;

const sideNavGroupHeaderWithGlyphNavCollapsedStyle = css`
  height: 40px;
`;

const glyphStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

type Props = {
  className?: string;
  children: React.ReactNode;
  glyph?: GlyphElement;
} & (
  | { collapsible: false; initialCollapsed?: undefined }
  | { collapsible?: true; initialCollapsed?: boolean }
) &
  OneOf<{ label: string }, { label: React.ReactNode; 'aria-label': string }> &
  Omit<HTMLElementProps<'div'>, 'aria-label' | 'ref'>;

const idAllocator = IdAllocator.create('side-nav-group');

const SideNavGroup = React.forwardRef<HTMLDivElement, Props>(
  function SideNavGroup(
    {
      className,
      children,
      glyph,
      label,
      collapsible = false,
      initialCollapsed = true,
      'aria-label': ariaLabelProp,
      ...rest
    }: Props,
    ref,
  ) {
    const { collapsed: navCollapsed, hovered, currentPath } = useContext(
      SideNavContext,
    );

    const [collapsed, setCollapsed] = useState(
      collapsible ? initialCollapsed : false,
    );

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

    const providerData = useMemo(() => ({ addPath, removePath, collapsed }), [
      addPath,
      removePath,
      collapsed,
    ]);

    const shouldRenderNavCollapsedState = navCollapsed && !hovered;
    const hasGlyph = glyph !== undefined;
    const containsCurrentPath =
      currentPath !== undefined && containedPaths.has(currentPath);

    const ariaLabel =
      ariaLabelProp ?? (typeof label === 'string' ? label : undefined);

    return (
      <div
        ref={ref}
        role={shouldRenderNavCollapsedState ? undefined : 'group'}
        aria-labelledby={shouldRenderNavCollapsedState ? undefined : id}
        aria-label={
          shouldRenderNavCollapsedState && !hasGlyph ? ariaLabel : undefined
        }
        className={cx(
          sideNavGroupStyle,
          {
            [sideNavGroupNavCollapsedStyle]: shouldRenderNavCollapsedState,
            [sideNavGroupWithGlyphNavCollapsedStyle]:
              hasGlyph && shouldRenderNavCollapsedState,
            [sideNavGroupNavCollapsedAndCurrentStyle]:
              shouldRenderNavCollapsedState && containsCurrentPath,
          },
          className,
        )}
        {...rest}
      >
        <div
          id={id}
          aria-hidden={shouldRenderNavCollapsedState}
          className={cx(sideNavGroupHeaderStyle, {
            [sideNavGroupHeaderNavCollapsedStyle]: shouldRenderNavCollapsedState,
            [sideNavGroupHeaderWithGlyphNavCollapsedStyle]:
              hasGlyph && shouldRenderNavCollapsedState,
          })}
        >
          {hasGlyph && <div className={glyphStyle}>{glyph}</div>}
          {!shouldRenderNavCollapsedState && label}
        </div>
        <SideNavGroupContext.Provider value={providerData}>
          {children}
        </SideNavGroupContext.Provider>
      </div>
    );
  },
);

export default SideNavGroup;

SideNavGroup.displayName = 'SideNavGroup';

SideNavGroup.propTypes = {
  className: PropTypes.string,
  label: PropTypes.node,
  // @ts-expect-error PropTypes typing doesn't work well with unions
  collapsible: PropTypes.bool,
  initialCollapsed: PropTypes.bool,
  // @ts-expect-error PropTypes typing doesn't work well with unions
  'aria-label': PropTypes.string,
  // @ts-expect-error PropTypes typing doesn't work well with unions
  glyph: PropTypes.element,
};
