import React, { ReactNode, ElementType } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import {
  AriaCurrentValue,
  HTMLElementProps,
  createDataProp,
} from '@leafygreen-ui/lib';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { sideNavItemSidePadding } from './styles';

const sideNavItemContainer = createDataProp('side-nav-item-container');

// container styles
const defaultStyle = css`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  margin: unset;
  padding: 8px ${sideNavItemSidePadding}px 8px ${sideNavItemSidePadding}px;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: inherit;
  text-align: left;
  text-decoration: none;
  font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
  appearance: none;
  background: none;
  z-index: 0;

  &::-moz-focus-inner {
    border: 0;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    border-radius: 5px;
    background-color: transparent;
    transform: scale(0.9, 0.7);
    transition: all 150ms ease-in-out;
  }

  &:hover,
  &:focus {
    &:before {
      transform: scale(1);
      background-color: ${uiColors.gray.light2};
    }
  }

  &:active:before {
    transform: scale(1);
  }

  &:hover {
    text-decoration: none;
  }

  &:focus {
    text-decoration: none;
    outline: none;
  }
`;

const activeStyle = css`
  cursor: default;
  text-decoration: none;

  &:before {
    transform: scale(1);
    background-color: ${uiColors.green.light3};
  }

  &:hover {
    color: ${uiColors.green.dark3};

    &:before {
      transform: scale(1);
      background-color: ${uiColors.green.light3};
    }
  }
`;

const disabledStyle = css`
  pointer-events: none;
  background-color: transparent;
`;

const focusedStyle = css`
  &:focus {
    text-decoration: none;
    color: ${uiColors.blue.dark3};

    &:before {
      background-color: ${uiColors.blue.light3};
    }
  }
`;

// text content styles
const textStyle = css`
  position: relative;
  z-index: 1;
  font-size: 14px;
  font-weight: normal;
  text-transform: capitalize;
  color: ${uiColors.gray.dark2};

  ${sideNavItemContainer.selector}:focus & {
    color: ${uiColors.blue.dark3};
  }
`;

const activeTextStyle = css`
  font-weight: bold;
  color: ${uiColors.green.dark3};
`;

const disabledTextStyle = css`
  color: ${uiColors.gray.light1};
`;

interface SharedSideNavItemProps {
  /**
   * Whether or not the component should be rendered in an active state.
   */
  active?: boolean;

  /**
   * Whether or not the component should be rendered in a disabled state.
   */
  disabled?: boolean;

  /**
   * The aria-current attribute value set when the component is active.
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
}

interface LinkProps extends HTMLElementProps<'a'>, SharedSideNavItemProps {
  href: string;
}

interface DivProps extends HTMLElementProps<'div'>, SharedSideNavItemProps {
  href?: null;
}

type CustomElementProps = SharedSideNavItemProps & {
  as: ElementType<any>;
  [key: string]: any;
};

export type SideNavItemProps = LinkProps | DivProps | CustomElementProps;

function usesCustomElement(
  props: SideNavItemProps,
): props is CustomElementProps {
  return (props as any).as != null;
}

function usesLinkElement(props: LinkProps | DivProps): props is LinkProps {
  return props.href != null;
}

const RootComponentTypes = {
  Button: 'button',
  Link: 'a',
  Custom: 'as',
} as const;
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

const SideNavItem = React.forwardRef((props: SideNavItemProps, forwardRef) => {
  const {
    active = false,
    disabled = false,
    ariaCurrentValue = AriaCurrentValue.Page,
    className,
    children,
  } = props;

  const rest = omit(props, [
    'as',
    'active',
    'disabled',
    'ariaCurrentValue',
    'className',
    'children',
  ]);

  const { usingKeyboard: showFocus } = useUsingKeyboardContext();

  let Root: ElementType<any>;
  let role: string | null;

  if (usesLinkElement(props)) {
    Root = RootComponentTypes.Link;
    role = props.role || 'menuitem';
  } else if (usesCustomElement(props)) {
    Root = props[RootComponentTypes.Custom];
    role = props.role || null;
  } else {
    Root = RootComponentTypes.Button;
    role = props.role || 'menuitem';
  }

  return (
    <li role="none">
      <Root
        {...rest}
        {...sideNavItemContainer.prop}
        className={cx(
          defaultStyle,
          {
            [activeStyle]: active,
            [disabledStyle]: disabled,
            [focusedStyle]: showFocus,
          },
          className,
        )}
        role={role}
        aria-current={active ? ariaCurrentValue : AriaCurrentValue.Unset}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        ref={forwardRef}
      >
        <div
          className={cx(textStyle, {
            [activeTextStyle]: active,
            [disabledTextStyle]: disabled,
          })}
        >
          {children}
        </div>
      </Root>
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
