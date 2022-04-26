import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { isComponentType } from '@leafygreen-ui/lib';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import ChevronRight from '@leafygreen-ui/icon/dist/ChevronRight';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { CollapsedSideNavItem } from '../SideNavItem';
import { useSideNavContext } from '../SideNavContext';
import { ulStyleOverrides, getIndentLevelStyle } from '../styles';
import {
  buttonClassName,
  collapsibleHeaderFocusStyle,
  collapsibleLabelStyle,
  customIconStyles,
  defaultStyle,
  expandIconStyle,
  labelStyle,
  listItemStyle,
  openExpandIconStyle,
  transitionStyles,
} from './SideNavGroup.styles';
import { SideNavGroupProps } from './types';

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
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();

  const menuGroupLabelId = useIdAllocator({ prefix: 'menu-group-label-id' });
  const menuId = useIdAllocator({ prefix: 'menu' });
  const { width } = useSideNavContext();

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

  const accessibleGlyph =
    glyph && (isComponentGlyph(glyph) || isComponentType(glyph, 'Icon'))
      ? React.cloneElement(glyph, {
          className: cx(customIconStyles, glyph.props.className),
          role: 'presentation',
          'data-testid': 'side-nav-group-header-icon',
        })
      : null;

  const renderedLabelText = (
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

      {/** We wrap the text in a span here to allow us to style based
       * on the glyph being the last child of its parent.
       * Text nodes aren't considered children.
       * */}
      <span>{header}</span>
    </div>
  );

  const intentedStyle = cx(
    getIndentLevelStyle(indentLevel),
    css`
      padding-top: 16px;
      padding-bottom: 8px;
    `,
  );

  if (collapsible) {
    return (
      <li className={cx(listItemStyle, className)} {...rest}>
        <button
          aria-controls={menuId}
          aria-expanded={open}
          className={cx(
            buttonClassName,
            labelStyle,
            collapsibleLabelStyle,
            css`
              width: ${width}px;
            `,
            {
              [collapsibleHeaderFocusStyle]: showFocus,
              [intentedStyle]: indentLevel > 1,
            },
          )}
          onClick={() => setOpen(curr => !curr)}
          id={menuGroupLabelId}
          data-testid="side-nav-group-header-label"
        >
          {renderedLabelText}
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
          {(state: string) => (
            <div
              ref={nodeRef}
              className={cx(defaultStyle, {
                [transitionStyles.entering]: state === 'entering',
                [css`
                  opacity: 1;
                  max-height: ${ulRef?.current?.getBoundingClientRect()
                    .height}px;
                  border-bottom: 1px solid ${uiColors.gray.light2};
                `]: state === 'entered',
                [transitionStyles.exiting]: state === 'exiting',
                [transitionStyles.exited]: state === 'exited',
              })}
            >
              <ul
                ref={ulRef}
                id={menuId}
                aria-labelledby={menuGroupLabelId}
                className={cx(
                  ulStyleOverrides,
                  css`
                    transition: opacity 150ms ease-in-out;
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
      </li>
    );
  }

  return (
    <li className={cx(listItemStyle, className)} {...rest}>
      <div
        data-testid="side-nav-group-header-label"
        id={menuGroupLabelId}
        className={cx(buttonClassName, labelStyle, {
          [intentedStyle]: indentLevel > 1,
        })}
      >
        {renderedLabelText}
      </div>

      <ul aria-labelledby={menuGroupLabelId} className={ulStyleOverrides}>
        {renderedChildren}
      </ul>
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
