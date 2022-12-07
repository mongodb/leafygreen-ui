import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Transition, TransitionStatus } from 'react-transition-group';
import { isComponentType } from '@leafygreen-ui/lib';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import ChevronRight from '@leafygreen-ui/icon/dist/ChevronRight';
import { palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { SideNavHeader } from '../SideNavHeader/SideNavHeader';
import { useSideNavContext } from '../SideNav/SideNavContext';
import { ulStyleOverrides } from '../SideNav/styles';
import {
  buttonClassName,
  collapsibleFocusStyle,
  collapsibleBaseStyle,
  collapsibleThemeStyle,
  collapsibleGroupBaseStyles,
  expandIconStyle,
  baseStyle,
  themeStyle,
  listItemStyle,
  openExpandIconStyle,
  transitionStyles,
  indentedStyle,
} from './SideNavGroup.styles';
import { SideNavGroupProps } from './types';
import { transitionDuration } from '@leafygreen-ui/tokens';

/**
 * # SideNavGroup
 *
 * ```
<SideNavGroup headerText="Section Header">
  <SideNavItem href="/">
    Back to Home
  </SideNavItem>
</SideNavGroup>
 * ```
 *
 * @param props.className Class name that will be applied to the root-level element.
 * @param props.header Content that will be rendered as the component's header
 *   If a string is provided, it will be rendered with default styling as a header tag.
 * @param props.children Class name that will be applied to the component's header.
 * @param props.collapsible Determines whether or not the Group can be collapsed. @defaultValue false
 * @param props.initialCollapsed Determines whether or not the Group is open by default. @defaultValue true
 */
function SideNavGroup({
  header,
  children,
  collapsible = false,
  initialCollapsed = true,
  glyph,
  className,
  hasActiveItem,
  indentLevel = 0,
  ...rest
}: SideNavGroupProps) {
  const [open, setOpen] = React.useState(!initialCollapsed);
  const nodeRef = React.useRef(null);
  const ulRef = React.useRef<HTMLUListElement>(null);
  const { usingKeyboard } = useUsingKeyboardContext();

  const menuGroupLabelId = useIdAllocator({ prefix: 'menu-group-label-id' });
  const menuId = useIdAllocator({ prefix: 'menu' });
  const { width, theme, darkMode } = useSideNavContext();

  // Iterate over `children` and render them appropriately
  const renderedChildren = useMemo(() => {
    const checkForNestedGroups = (children: React.ReactNode) => {
      return React.Children.map(children, child => {
        if (
          isComponentType(child, 'SideNavGroup') ||
          isComponentType(child, 'SideNavItem')
        ) {
          return React.cloneElement(child, {
            indentLevel: indentLevel + 1,
          });
        } else if ((child as React.ReactElement)?.props?.children) {
          checkForNestedGroups((child as React.ReactElement).props.children);
          return child;
        } else {
          return child;
        }
      });
    };

    return checkForNestedGroups(children);
  }, [children, indentLevel]);

  // compute whether this group is active
  const isActiveGroup: boolean = useMemo(() => {
    if (hasActiveItem != null) {
      return hasActiveItem;
    }

    const checkForActiveNestedItems = (children: React.ReactNode): boolean => {
      let foundActiveChild = false;

      React.Children.forEach(children, child => {
        if (isComponentType(child, 'SideNavItem') && child.props.active) {
          foundActiveChild = true;
          setOpen(true);
        } else if ((child as React.ReactElement)?.props?.children) {
          checkForActiveNestedItems(
            (child as React.ReactElement).props.children,
          );
        }
      });

      return foundActiveChild;
    };

    return checkForActiveNestedItems(children);
  }, [hasActiveItem, children]);

  // compute the entered ul wrapper styles based on the ul height
  useEffect(() => {
    const ulHeight = ulRef?.current?.getBoundingClientRect().height ?? 0;
    transitionStyles['entered'] = css`
      opacity: 1;
      max-height: ${ulHeight + 1}px; // +1 for border
      border-bottom: 1px solid
        ${darkMode ? palette.gray.dark1 : palette.gray.light2};
    `;
  }, [open, ulRef, darkMode]);

  // generate shared props for collapsible and static headers
  const groupHeaderProps = {
    'data-testid': 'side-nav-group-header-label',
    id: menuGroupLabelId,
  };

  return (
    <li className={cx(listItemStyle, className)} {...rest}>
      {collapsible ? (
        <>
          <button
            {...groupHeaderProps}
            aria-controls={menuId}
            aria-expanded={open}
            className={cx(
              buttonClassName,
              baseStyle,
              themeStyle[theme],
              collapsibleBaseStyle,
              collapsibleThemeStyle[theme],
              css`
                width: ${width}px;
              `,
              {
                [collapsibleFocusStyle]: usingKeyboard,
                [indentedStyle(indentLevel, darkMode)]: indentLevel > 1,
              },
            )}
            onClick={() => setOpen(curr => !curr)}
          >
            <SideNavHeader
              theme={theme}
              header={header}
              isActiveGroup={isActiveGroup}
              glyph={glyph}
            />
            <ChevronRight
              role="presentation"
              size={12}
              className={cx(expandIconStyle, {
                [openExpandIconStyle]: open,
              })}
            />
          </button>

          <Transition
            in={open}
            appear
            timeout={150}
            nodeRef={nodeRef}
            mountOnEnter
            unmountOnExit
          >
            {(state: TransitionStatus) => (
              <div
                ref={nodeRef}
                className={cx(
                  collapsibleGroupBaseStyles,
                  transitionStyles[state],
                )}
              >
                <ul
                  ref={ulRef}
                  id={menuId}
                  aria-labelledby={menuGroupLabelId}
                  className={cx(
                    ulStyleOverrides,
                    css`
                      transition: opacity ${transitionDuration.default}ms
                        ease-in-out;
                      opacity: 0;
                    `,
                    {
                      [css`
                        opacity: 1;
                      `]: ['entering', 'entered'].includes(state),
                    },
                  )}
                >
                  {renderedChildren}
                </ul>
              </div>
            )}
          </Transition>
        </>
      ) : (
        // not collapsible
        <>
          <div
            {...groupHeaderProps}
            className={cx(baseStyle, themeStyle[theme], {
              [indentedStyle(indentLevel, darkMode)]: indentLevel > 1,
            })}
          >
            <SideNavHeader
              theme={theme}
              header={header}
              isActiveGroup={isActiveGroup}
              glyph={glyph}
            />
          </div>

          <ul aria-labelledby={menuGroupLabelId} className={ulStyleOverrides}>
            {renderedChildren}
          </ul>
        </>
      )}
    </li>
  );
}

SideNavGroup.displayName = 'SideNavGroup';

SideNavGroup.propTypes = {
  className: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),
  collapsible: PropTypes.bool,
  initialCollapsed: PropTypes.bool,
  glyph: PropTypes.node,
  children: PropTypes.node,
};

export default SideNavGroup;
