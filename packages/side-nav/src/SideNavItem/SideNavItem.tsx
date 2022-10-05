import React, { useRef, useMemo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { AriaCurrentValue, isComponentType } from '@leafygreen-ui/lib';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import CollapsedSideNavItem from './CollapsedSideNavItem';
import { useSideNavContext } from '../SideNavContext';
import { getIndentLevelStyle, typographyStyle } from '../styles';
import {
  baseNavItemStyle,
  activeNavItemStyle,
  disabledNavItemStyle,
  focusedNavItemStyle,
  focusedDisabledNavItemStyle,
  glyphWrapper,
  nestedChildrenStyles,
  sideNavItemClassName,
} from './SideNavItem.styles';
import { SideNavItemProps } from './types';

/**
 * TODO: TSDoc
 *
 * ```
  <SideNavItem href="/">
    Back to Home
  </SideNavItem>
 * ```
 *
 ### Component Props
 @param props.active Whether or not the component should be rendered in an active state.
 @param props.disabled Whether or not the component should be rendered in a disabled state.
 @param props.ariaCurrentValue The aria-current attribute value set when the component is active.
 @param props.className Class name that will be applied to the root-level element.
 @param props.children Content that will be rendered inside the root-level element.
 *
 ### Optional Polymorphic Props
 @param props.href When provided, the component will be rendered as an anchor element. This and
 *  other additional props will be spread on the anchor element.
 @param props.as When provided, the component will be rendered as the component or html tag indicated
 *  by this prop. Other additional props will be spread on the anchor element.
 */
const SideNavItem: ExtendableBox<
  SideNavItemProps & { ref?: React.Ref<any> },
  'button'
> = forwardRef((props: SideNavItemProps, forwardedRef) => {
  const {
    active = false,
    disabled = false,
    ariaCurrentValue = AriaCurrentValue.Page,
    indentLevel = 1,
    className,
    children,
    onClick: onClickProp,
    glyph,
    ...rest
  } = props;
  const { usingKeyboard } = useUsingKeyboardContext();
  const { baseFontSize } = useSideNavContext();
  const hasNestedChildren = useRef(false);

  const onClick = disabled
    ? (e: React.MouseEvent) => {
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
      }
    : (e: React.MouseEvent) => {
        onClickProp?.(e);
      };

  const accessibleGlyph =
    (glyph && isComponentType(glyph, 'Glyph')) || isComponentType(glyph, 'Icon')
      ? React.cloneElement(glyph, { 'aria-hidden': true })
      : null;

  const { hasNestedItems, renderedNestedItems } = useMemo(() => {
    const renderedNestedItems: Array<React.ReactElement> = [];
    let hasNestedItems = false; // Whether this item has nested descendants

    React.Children.forEach(children, (child, index) => {
      if (
        (child != null && isComponentType(child, 'SideNavItem')) ||
        isComponentType(child, 'SideNavGroup')
      ) {
        hasNestedItems = true;
        if (active || hasActiveNestedItems(children)) {
          renderedNestedItems.push(
            React.cloneElement(child, {
              indentLevel: indentLevel + 1,
              key: index,
            }),
          );
        }
      }
    });

    // Recursive function to determine if a SideNavItem has an active descendant
    function hasActiveNestedItems(children: React.ReactNode): boolean {
      let hasActiveDescendant = false;

      React.Children.forEach(children, child => {
        if (hasActiveDescendant) return;
        else if (isComponentType(child, 'SideNavItem') && child.props.active) {
          hasActiveDescendant = true;
        } else if (
          (child as React.ReactElement)?.props?.children &&
          typeof (child as React.ReactElement).props.children == 'object'
        ) {
          hasActiveDescendant = hasActiveNestedItems(
            (child as React.ReactElement).props.children,
          );
        }
      });
      return hasActiveDescendant;
    }

    return { hasNestedItems, renderedNestedItems };
  }, [children, active, indentLevel]);

  const renderedChildren = useMemo(() => {
    const renderedChildren: React.ReactNodeArray = [];

    React.Children.forEach(children, child => {
      if (!child) {
        return null;
      }

      if (
        isComponentType(child, 'SideNavItem') ||
        isComponentType(child, 'SideNavGroup')
      ) {
        return null;
      }

      renderedChildren.push(child);
    });

    return renderedChildren;
  }, [children]);

  return (
    <li
      className={css`
        width: 100%;
      `}
    >
      <Box
        as={props.href ? 'a' : 'button'}
        {...rest}
        className={cx(
          sideNavItemClassName,
          baseNavItemStyle,
          typographyStyle[baseFontSize],
          {
            [activeNavItemStyle]: active,
            [disabledNavItemStyle]: disabled,
            [focusedNavItemStyle]: usingKeyboard,
            [focusedDisabledNavItemStyle]: usingKeyboard && disabled,
            [nestedChildrenStyles]: hasNestedChildren.current,
            [getIndentLevelStyle(indentLevel)]: indentLevel > 1,
          },
          className,
        )}
        aria-current={active ? ariaCurrentValue : AriaCurrentValue.Unset}
        aria-disabled={disabled}
        ref={forwardedRef}
        onClick={onClick}
      >
        {accessibleGlyph && (
          <span className={glyphWrapper}>
            {accessibleGlyph}

            <CollapsedSideNavItem active={active}>
              {accessibleGlyph}
            </CollapsedSideNavItem>
          </span>
        )}

        {renderedChildren}
      </Box>

      {hasNestedItems && (
        <ul
          className={css`
            list-style: none;
            padding-inline-start: 0;
          `}
        >
          {renderedNestedItems}
        </ul>
      )}
    </li>
  );
});

SideNavItem.displayName = 'SideNavItem';

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  ariaCurrentValue: PropTypes.oneOf(Object.values(AriaCurrentValue)),
  children: PropTypes.node,
  href: PropTypes.string,
};

export default SideNavItem;
