import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Transition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import ChevronDownIcon from '@leafygreen-ui/icon/dist/ChevronDown';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { Overline } from '@leafygreen-ui/typography';
import {
  HTMLElementProps,
  IdAllocator,
  keyMap,
  OneOf,
} from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { SideNavContext, SideNavGroupContext } from './contexts';
import { GlyphElement, transitionDurationMilliseconds } from './utils';

const sideNavGroupStyle = css`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  transition: all ${transitionDurationMilliseconds}ms ease-in-out, margin none;
  border: 0 solid rgba(0, 0, 0, 0);
  cursor: default;

  // &:last-of-type {
  //   border-bottom-width: 1px;
  // }
`;

const sideNavGroupExpandedCollapsibleStyle = css`
  border-bottom: 1px solid ${uiColors.gray.light2};
`;

const sideNavGroupNavCollapsedStyle = css`
  margin: 0;
`;

const sideNavGroupWithGlyphNavCollapsedStyle = css`
  border-color: ${uiColors.gray.light2};
  border-top: 1px solid ${uiColors.gray.light2};
`;

const sideNavGroupWithGlyphNavCollapsedAndCurrentStyle = css`
  background-color: ${uiColors.green.light3};
`;

const sideNavGroupHeaderStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px 6px;
  color: ${uiColors.green.dark2};
  outline: none;

  &:hover {
    border-color: ${uiColors.green.base};
  }
`;

const sideNavGroupHeaderFocusStyle = css`
  &:focus {
    color: ${uiColors.blue.base};
    border-color: ${uiColors.blue.base};
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
  border-bottom: 1px solid ${uiColors.gray.light2};
`;

const glyphStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 4px;
`;

const chevronStyle = css`
  margin: 0 6px;
  transition: all ${transitionDurationMilliseconds}ms ease-in-out;
`;

const chevronCollapsedStyle = css`
  transform: rotate(-90deg);
`;

const sideNavGroupHeaderTextStyle = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: inherit;
`;

const sideNavGroupChildrenStyle = css`
  opacity: 1;
  transition: all ${transitionDurationMilliseconds}ms ease-in-out;
`;

type TransitionStatus = Parameters<
  Extract<React.ComponentProps<typeof Transition>['children'], Function>
>[0];

function getGroupChildrenTransitionStyles(
  state: TransitionStatus,
): Record<string, boolean> {
  return {
    [css`
      max-height: 0;
      opacity: 0;
    `]: state === 'exiting' || state === 'exited',
    [css`
      overflow: hidden;
    `]: state === 'exited',
  };
}

const ulStyle = css`
  padding: 0;
  list-style: none;
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

const SideNavGroup = React.forwardRef<HTMLLIElement, Props>(
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

    const [collapsedState, setCollapsedState] = useState(
      collapsible ? initialCollapsed : false,
    );

    const collapsed = collapsible && collapsedState;

    useEffect(() => {
      if (!collapsible) {
        setCollapsedState(false);
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
      setCollapsedState(collapsedState => !collapsedState);
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

    const nodeRef = React.useRef<HTMLDivElement>(null);
    const groupRef = React.useRef<HTMLDivElement>(null);
    const ulRef = React.useRef<HTMLUListElement>(null);

    const providerData = useMemo(
      () => ({
        addPath,
        removePath,
        collapsed,
        collapsible,
        containerRef: groupRef,
      }),
      [addPath, removePath, collapsible, collapsed, groupRef],
    );

    const shouldCollapseChildren = collapsed || navCollapsed;

    return (
      /* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */
      <li ref={ref}>
        <div
          ref={groupRef}
          aria-labelledby={navCollapsed ? undefined : id}
          aria-label={navCollapsed && !hasGlyph ? ariaLabel : undefined}
          className={cx(
            sideNavGroupStyle,
            {
              [sideNavGroupNavCollapsedStyle]: navCollapsed,
              [sideNavGroupExpandedCollapsibleStyle]:
                canRenderAsCollapsible && !collapsed,
              [sideNavGroupWithGlyphNavCollapsedStyle]:
                hasGlyph && navCollapsed,
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
                width: calc(100% - ${canRenderAsCollapsible ? 28 : 0}px);
              `}
            >
              {hasGlyph && (
                <div className={glyphStyle}>
                  {React.cloneElement(glyph!, {
                    'aria-hidden': true,
                    role: 'presentation',
                  })}
                </div>
              )}

              {!navCollapsed && (
                <Overline as="h2" className={sideNavGroupHeaderTextStyle}>
                  {label}
                </Overline>
              )}
            </div>
            {canRenderAsCollapsible && (
              <ChevronDownIcon
                size="small"
                className={cx(chevronStyle, {
                  [chevronCollapsedStyle]: collapsed,
                })}
                aria-hidden
                role="presentation"
              />
            )}
          </div>
          <Transition
            in={!shouldCollapseChildren}
            timeout={transitionDurationMilliseconds}
            nodeRef={nodeRef}
            mountOnEnter
          >
            {state => (
              <div
                ref={nodeRef}
                aria-hidden={shouldCollapseChildren}
                className={cx(
                  sideNavGroupChildrenStyle,
                  css`
                    max-height: ${ulRef.current?.getBoundingClientRect?.()
                      ?.height}px;
                  `,
                  getGroupChildrenTransitionStyles(state),
                )}
              >
                <ul ref={ulRef} role="menu" className={ulStyle}>
                  <SideNavGroupContext.Provider value={providerData}>
                    {children}
                  </SideNavGroupContext.Provider>
                </ul>
              </div>
            )}
          </Transition>
        </div>
      </li>
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
