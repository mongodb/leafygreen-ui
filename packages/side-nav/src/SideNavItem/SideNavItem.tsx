import React, { forwardRef, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { AriaCurrentValue, isComponentType } from '@leafygreen-ui/lib';

import { AccessibleGlyph } from '../AccessibleGlyph';
import {
  getIndentLevelStyle,
  typographyStyle,
  useSideNavContext,
} from '../SideNav';

import {
  activeBaseStyle,
  activeThemeStyle,
  baseStyle,
  disabledStyle,
  focusedDisabledStyle,
  focusedDisabledThemeStyle,
  focusedStyle,
  focusedThemeStyle,
  glyphWrapperStyle,
  liStyle,
  nestedChildrenStyles,
  nestedUlStyle,
  sideNavItemClassName,
  themeStyle,
} from './SideNavItem.styles';
import { SideNavItemProps } from './SideNavItem.types';

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
 @param props.indentLevel Change the indentation. Will not work if `<SideNavItem>` is a child of `<SideNavGroup>`
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
  const { baseFontSize, theme, darkMode } = useSideNavContext();
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
    glyph && isComponentGlyph(glyph)
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
    const renderedChildren: Array<React.ReactNode> = [];

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
    <li className={liStyle}>
      <Box
        as={props.href ? 'a' : 'button'}
        {...rest}
        className={cx(
          sideNavItemClassName,
          baseStyle,
          themeStyle[theme],
          typographyStyle[baseFontSize],
          {
            [cx(activeBaseStyle, activeThemeStyle[theme])]: active,
            [disabledStyle]: disabled,
            [cx(focusedStyle, focusedThemeStyle[theme])]: usingKeyboard,
            [cx(focusedDisabledStyle, focusedDisabledThemeStyle[theme])]:
              usingKeyboard && disabled,
            [nestedChildrenStyles]: hasNestedChildren.current,
            [getIndentLevelStyle(indentLevel, darkMode)]: indentLevel > 1,
          },
          className,
        )}
        aria-current={active ? ariaCurrentValue : AriaCurrentValue.Unset}
        aria-disabled={disabled}
        ref={forwardedRef}
        onClick={onClick}
      >
        {accessibleGlyph && (
          <AccessibleGlyph
            isActiveGroup={active}
            accessibleGlyph={accessibleGlyph}
            className={glyphWrapperStyle}
          />
        )}

        {renderedChildren}
      </Box>

      {hasNestedItems && (
        <ul className={nestedUlStyle}>{renderedNestedItems}</ul>
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
