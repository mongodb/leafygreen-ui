import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Transition, TransitionStatus } from 'react-transition-group';
import { isComponentType } from '@leafygreen-ui/lib';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import ChevronRight from '@leafygreen-ui/icon/dist/ChevronRight';
import { palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { CollapsedSideNavItem } from '../SideNavItem';
import { useSideNavContext } from '../SideNavContext';
import { ulStyleOverrides, getIndentLevelStyle } from '../styles';
import {
  buttonClassName,
  collapsibleHeaderFocusStyle,
  collapsibleHeaderStyle,
  customIconStyles,
  sideNavCollapsibleGroupBaseStyles,
  expandIconStyle,
  headerStyle,
  listItemStyle,
  openExpandIconStyle,
  transitionStyles,
} from './SideNavGroup.styles';
import { SideNavGroupProps } from './types';
import { Overline } from '@leafygreen-ui/typography';
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
  const { width } = useSideNavContext();

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

  // render the provided glyph with appropriate aria roles
  const accessibleGlyph =
    glyph && (isComponentGlyph(glyph) || isComponentType(glyph, 'Icon'))
      ? React.cloneElement(glyph, {
          className: cx(customIconStyles, glyph.props.className),
          role: 'presentation',
          'data-testid': 'side-nav-group-header-icon',
        })
      : null;

  // Render the header text
  const renderedHeader = (
    <div
      className={css`
        display: inline-flex;
        align-items: center;
      `}
    >
      {accessibleGlyph && (
        <>
          {accessibleGlyph}

          <CollapsedSideNavItem active={isActiveGroup}>
            {accessibleGlyph}
          </CollapsedSideNavItem>
        </>
      )}
      <Overline
        className={css`
          color: inherit;
        `}
      >
        {header}
      </Overline>
    </div>
  );

  // compute styles for indented items
  const indentedStyle = cx(
    getIndentLevelStyle(indentLevel),
    css`
      padding-top: 16px;
      padding-bottom: 8px;
    `,
  );

  // compute the entered ul wrapper styles based on the ul height
  useEffect(() => {
    const ulHeight = ulRef?.current?.getBoundingClientRect().height ?? 0;
    transitionStyles['entered'] = css`
      opacity: 1;
      max-height: ${ulHeight + 1}px; // +1 for border
      border-bottom: 1px solid ${palette.gray.light2};
    `;
  }, [open, ulRef]);

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
              headerStyle,
              collapsibleHeaderStyle,
              css`
                width: ${width}px;
              `,
              {
                [collapsibleHeaderFocusStyle]: usingKeyboard,
                [indentedStyle]: indentLevel > 1,
              },
            )}
            onClick={() => setOpen(curr => !curr)}
          >
            {renderedHeader}
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
                  sideNavCollapsibleGroupBaseStyles,
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
            className={cx(headerStyle, {
              [indentedStyle]: indentLevel > 1,
            })}
          >
            {renderedHeader}
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
