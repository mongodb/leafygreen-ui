import React, { ReactNode, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { transparentize } from 'polished';
import {
  AriaCurrentValue,
  createDataProp,
  isComponentType,
} from '@leafygreen-ui/lib';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import { spacing, fontFamilies } from '@leafygreen-ui/tokens';
import CollapsedSideNavItem from './CollapsedSideNavItem';
import { useSideNavContext } from './SideNavContext';

const sideNavItemContainer = createDataProp('side-nav-item-container');

// container styles
const defaultStyle = css`
  // Unset defaults
  margin: 0;
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;

  // Layout
  width: 100%;
  min-height: 32px;
  padding: ${spacing[2]}px ${spacing[3]}px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  // Typography
  font-family: ${fontFamilies.default};
  font-weight: normal;
  text-align: left;
  text-decoration: none;
  text-transform: capitalize;
  color: ${uiColors.gray.dark2};

  // Stateful transitions
  transition: background-color 150ms ease-in-out;
  background-color: ${transparentize(100, uiColors.gray.light3)};

  &:hover {
    background-color: ${uiColors.gray.light2};
    text-decoration: none;
  }

  &:focus {
    text-decoration: none;
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }
`;

const typographyStyle = {
  [14]: css`
    font-size: 14px;
    line-height: 1em;
  `,
  [16]: css`
    font-size: 16px;
    line-height: 1.5em;
  `,
};

const activeStyle = css`
  cursor: default;
  font-weight: bold;
  text-decoration: none;

  &,
  &:hover {
    color: ${uiColors.green.dark3};
    background-color: ${uiColors.green.light3};
  }
`;

const disabledStyle = css`
  pointer-events: none;
  background-color: transparent;
  font-weight: normal;

  &,
  &:hover {
    color: ${uiColors.gray.light1};
    background-color: ${transparentize(100, uiColors.gray.light3)};
  }
`;

const focusedStyle = css`
  position: relative;

  &:before {
    transition: all 150ms ease-in-out;
    content: '';
    transform: scaleY(0.3);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 3px;
    height: 20px;
    margin: auto;
    background-color: ${uiColors.focus};
    opacity: 0;
    border-radius: 0 3px 3px 0;
  }

  &:focus {
    text-decoration: none;
    color: ${uiColors.blue.dark3};
    background-color: ${uiColors.blue.light2};

    &:before {
      opacity: 1;
      transform: scaleY(1);
    }
  }
`;

const focusedDisabledStyle = css`
  &:focus {
    color: ${uiColors.blue.light1};
  }
`;

const glyphWrapper = css`
  margin-right: ${spacing[2]}px;
  display: inline-flex;
  align-items: center;
`;

const nestedChildrenStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

function getIndentLevelStyle(indentLevel: number) {
  return css`
    padding-left: ${8 + indentLevel * 16}px;
  `;
}

export interface SideNavItemProps {
  /**
   * Whether or not the component should be rendered in an active state.
   *
   * default: `false`
   */
  active?: boolean;

  /**
   * Whether or not the component should be rendered in a disabled state.
   *
   * default: `false`
   */
  disabled?: boolean;

  /**
   * The aria-current attribute value set when the component is active.
   *
   * default: `"page"`
   */
  ariaCurrentValue?: AriaCurrentValue;

  /**
   * Class name that will be applied to the root-level element.
   */
  className?: string;

  /**
   * Content that will be rendered inside the root-level element.
   */
  children?: ReactNode;

  /**
   * When provided, the component will be rendered as an anchor element with the passed href value.
   */
  href?: string;

  /**
   * The event handler function for the 'onclick' event. Receives the associated `event` object as the first argument.
   */
  onClick?: React.MouseEventHandler;

  /**
   * Icon that's rendered in the item.
   */
  glyph?: React.ReactNode;

  indentLevel?: number;

  isAnyAncestorActive?: boolean;
}

/**
 * # SideNavItem
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
> = React.forwardRef((props: SideNavItemProps, forwardRef) => {
  const {
    active = false,
    disabled = false,
    ariaCurrentValue = AriaCurrentValue.Page,
    indentLevel = 1,
    isAnyAncestorActive: isAnyAncestorActiveProp = false,
    className,
    children,
    onClick: onClickProp,
    glyph,
    ...rest
  } = props;
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const { baseFontSize = 14 } = useSideNavContext();
  const hasNestedChildren = useRef(false);

  const onClick = disabled
    ? (e: React.MouseEvent) => {
        e.nativeEvent.stopImmediatePropagation();
        e.preventDefault();
      }
    : onClickProp;

  const accessibleGlyph =
    (glyph && isComponentType(glyph, 'Glyph')) || isComponentType(glyph, 'Icon')
      ? React.cloneElement(glyph, { 'aria-hidden': true })
      : null;

  const { hasNestedItems, renderedNestedItems } = useMemo(() => {
    const renderedNestedItems: Array<React.ReactElement> = [];
    let hasNestedItems = false;

    React.Children.forEach(children, (child, index) => {
      if (child != null && isComponentType(child, 'SideNavItem')) {
        hasNestedItems = true;

        if (active || isAnyAncestorActiveProp) {
          renderedNestedItems.push(
            React.cloneElement(child, {
              className: getIndentLevelStyle(indentLevel),
              indentLevel: indentLevel + 1,
              isAnyAncestorActive: active || isAnyAncestorActiveProp,
              key: index,
            }),
          );
        }
      }
    });

    return { hasNestedItems, renderedNestedItems };
  }, [children, active, indentLevel, isAnyAncestorActiveProp]);

  const renderedChildren = useMemo(() => {
    const renderedChildren: React.ReactNodeArray = [];

    React.Children.forEach(children, child => {
      if (!child) {
        return null;
      }

      if (isComponentType(child, 'SideNavItem')) {
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
        {...sideNavItemContainer.prop}
        className={cx(
          defaultStyle,
          typographyStyle[baseFontSize],
          {
            [activeStyle]: active,
            [disabledStyle]: disabled,
            [focusedStyle]: showFocus,
            [focusedDisabledStyle]: showFocus && disabled,
            [nestedChildrenStyles]: hasNestedChildren.current,
          },
          className,
        )}
        aria-current={active ? ariaCurrentValue : AriaCurrentValue.Unset}
        aria-disabled={disabled}
        ref={forwardRef}
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

      {hasNestedItems && renderedNestedItems}
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
