import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import ChevronDownIcon from '@leafygreen-ui/icon/dist/ChevronDown';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import {
  createDataProp,
  HTMLElementProps,
  IdAllocator,
  keyMap,
  OneOf,
} from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { SideNavContext, SideNavGroupContext } from './contexts';
import { GlyphElement, transitionDurationMilliseconds } from './utils';

const childContainerDataProp = createDataProp('side-nav-group-child-container');

const sideNavGroupStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
  transition: all ${transitionDurationMilliseconds}ms ease-in-out;
  border: 0 solid rgba(0, 0, 0, 0);
  border-top-width: 1px;
  cursor: default;

  &:last-of-type {
    border-bottom-width: 1px;
  }
`;

const sideNavGroupExpandedCollapsibleStyle = css`
  &:not(:last-of-type) {
    border-bottom: 1px solid ${uiColors.gray.light2};
  }
`;

const sideNavGroupNavCollapsedStyle = css`
  margin: 0;
`;

const sideNavGroupWithGlyphNavCollapsedStyle = css`
  border-color: ${uiColors.gray.light2};
`;

const sideNavGroupWithGlyphNavCollapsedAndCurrentStyle = css`
  background-color: ${uiColors.green.light3};
`;

const sideNavGroupHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: bold;
  line-height: 16px;
  color: ${uiColors.green.dark2};
  outline: none;

  &:hover + ${childContainerDataProp.selector} {
    border-color: ${uiColors.green.base};
  }
`;

const sideNavGroupHeaderFocusStyle = css`
  &:focus {
    color: ${uiColors.blue.base};

    & + ${childContainerDataProp.selector} {
      border-color: ${uiColors.blue.base};
    }
  }
`;

const sideNavGroupHeaderNavCollapsedStyle = css`
  padding-top: 0;
  padding-bottom: 0;
`;

const sideNavGroupHeaderWithGlyphNavCollapsedStyle = css`
  height: 40px;
`;

const sideNavGroupHeaderCollapsibleStyle = css`
  cursor: pointer;
`;

const glyphStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

const chevronStyle = css`
  transition: all ${transitionDurationMilliseconds}ms ease-in-out;
  margin: 0 6px;
`;

const chevronCollapsedStyle = css`
  transform: rotate(-90deg);
`;

const sideNavGroupHeaderTextStyle = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const sideNavGroupChildrenCollapsibleStyle = css`
  border-top: 1px solid ${uiColors.gray.light2};
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

const idAllocator = IdAllocator.create('side-nav-group-header');

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
    const { usingKeyboard } = useUsingKeyboardContext();

    const { collapsed: navCollapsed, currentPath } = useContext(SideNavContext);

    // eslint-disable-next-line prefer-const
    let [collapsed, setCollapsed] = useState(
      collapsible ? initialCollapsed : false,
    );

    if (!collapsible) {
      collapsed = false;
    }

    useEffect(() => {
      if (!collapsible) {
        setCollapsed(false);
      }
    }, [collapsible]);

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

    const canRenderAsCollapsible = collapsible && !navCollapsed;

    const toggleCollapse = useCallback(() => {
      setCollapsed(collapsed => !collapsed);
    }, []);

    const hasGlyph = glyph !== undefined;
    const containsCurrentPath =
      currentPath !== undefined && containedPaths.has(currentPath);

    const ariaLabel =
      ariaLabelProp ?? (typeof label === 'string' ? label : undefined);

    const headerProps = useMemo(() => {
      if (canRenderAsCollapsible) {
        const onKeyDown = (event: React.KeyboardEvent) => {
          if (event.ctrlKey || event.shiftKey || event.altKey) {
            return;
          }

          if (
            event.keyCode === keyMap.Space ||
            event.keyCode === keyMap.Enter
          ) {
            event.preventDefault();
            event.stopPropagation();
            toggleCollapse();
          }
        };

        return {
          tabIndex: 0,
          'aria-expanded': !collapsed,
          'aria-controls': id,
          role: 'button',
          onClick: toggleCollapse,
          onKeyDown,
        };
      } else {
        return { 'tab-index': -1 };
      }
    }, [canRenderAsCollapsible, collapsed, id, toggleCollapse]);

    const providerData = useMemo(
      () => ({
        addPath,
        removePath,
        collapsed,
        collapsible,
      }),
      [addPath, removePath, collapsible, collapsed],
    );

    return (
      /* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */
      <div
        ref={ref}
        role={navCollapsed ? undefined : 'group'}
        aria-labelledby={navCollapsed ? undefined : id}
        aria-label={navCollapsed && !hasGlyph ? ariaLabel : undefined}
        className={cx(
          sideNavGroupStyle,
          {
            [sideNavGroupNavCollapsedStyle]: navCollapsed,
            [sideNavGroupExpandedCollapsibleStyle]:
              canRenderAsCollapsible && !collapsed,
            [sideNavGroupWithGlyphNavCollapsedStyle]: hasGlyph && navCollapsed,
            [sideNavGroupWithGlyphNavCollapsedAndCurrentStyle]:
              navCollapsed && containsCurrentPath && hasGlyph,
          },
          className,
        )}
        {...rest}
      >
        <div
          id={id}
          aria-hidden={navCollapsed}
          className={cx(sideNavGroupHeaderStyle, {
            [sideNavGroupHeaderFocusStyle]: usingKeyboard,
            [sideNavGroupHeaderNavCollapsedStyle]: navCollapsed,
            [sideNavGroupHeaderWithGlyphNavCollapsedStyle]:
              hasGlyph && navCollapsed,
            [sideNavGroupHeaderCollapsibleStyle]: canRenderAsCollapsible,
          })}
          {...headerProps}
        >
          <div
            className={css`
              display: flex;
              // Leave space for chevron and its margins = 16px + 2 * 6px
              width: calc(100% - 28px);
            `}
          >
            {hasGlyph && <div className={glyphStyle}>{glyph}</div>}
            <div className={sideNavGroupHeaderTextStyle}>
              {!navCollapsed && label}
            </div>
          </div>
          {canRenderAsCollapsible && (
            <ChevronDownIcon
              className={cx(chevronStyle, {
                [chevronCollapsedStyle]: collapsed,
              })}
              aria-hidden
              role="presentation"
            />
          )}
        </div>
        <div
          {...childContainerDataProp.prop}
          className={cx({
            [sideNavGroupChildrenCollapsibleStyle]: canRenderAsCollapsible,
          })}
        >
          <SideNavGroupContext.Provider value={providerData}>
            {children}
          </SideNavGroupContext.Provider>
        </div>
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
