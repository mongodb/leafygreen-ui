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

const sideNavGroupCollapsedStyle = css`
  margin: 0;
`;

const sideNavGroupWithGlyphCollapsedStyle = css`
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
  margin-bottom: 0;
`;

const sideNavGroupHeaderWithGlyphCollapsedStyle = css`
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
} & OneOf<{ label: string }, { label: React.ReactNode; 'aria-label': string }> &
  Omit<HTMLElementProps<'div'>, 'aria-label' | 'ref'>;

const idAllocator = IdAllocator.create('side-nav-group');

const SideNavGroup = React.forwardRef<HTMLDivElement, Props>(
  function SideNavGroup(
    {
      className,
      children,
      glyph,
      label,
      'aria-label': ariaLabelProp,
      ...rest
    }: Props,
    ref,
  ) {
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

    const shouldRenderCollapsedState = collapsed && !hovered;
    const hasGlyph = glyph !== undefined;
    const containsCurrentPath =
      currentPath !== undefined && containedPaths.has(currentPath);

    const ariaLabel =
      ariaLabelProp ?? (typeof label === 'string' ? label : undefined);

    return (
      <div
        ref={ref}
        role={shouldRenderCollapsedState ? undefined : 'group'}
        aria-labelledby={shouldRenderCollapsedState ? undefined : id}
        aria-label={
          shouldRenderCollapsedState && !hasGlyph ? ariaLabel : undefined
        }
        className={cx(
          sideNavGroupStyle,
          {
            [sideNavGroupCollapsedStyle]: shouldRenderCollapsedState,
            [sideNavGroupWithGlyphCollapsedStyle]:
              hasGlyph && shouldRenderCollapsedState,
            [sideNavGroupCollapsedAndCurrentStyle]:
              shouldRenderCollapsedState && containsCurrentPath,
          },
          className,
        )}
        {...rest}
      >
        <div
          id={id}
          aria-hidden={shouldRenderCollapsedState}
          className={cx(sideNavGroupHeaderStyle, {
            [sideNavGroupHeaderCollapsedStyle]: shouldRenderCollapsedState,
            [sideNavGroupHeaderWithGlyphCollapsedStyle]:
              hasGlyph && shouldRenderCollapsedState,
          })}
        >
          {hasGlyph && <div className={glyphStyle}>{glyph}</div>}
          {!shouldRenderCollapsedState && label}
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
  // @ts-expect-error PropTypes typing doesn't work well with OneOf
  'aria-label': PropTypes.string,
  // @ts-expect-error PropTypes typing doesn't work well with OneOf
  glyph: PropTypes.element,
};
