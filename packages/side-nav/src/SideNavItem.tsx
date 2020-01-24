import React, { ReactNode, ElementType } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import {
  AriaCurrentValue,
  HTMLElementProps,
  createDataProp,
} from '@leafygreen-ui/lib';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { LEFT_RIGHT_OFFSET } from './styles';
import omit from 'lodash/omit';

const sideNavItemContainer = createDataProp('side-nav-item-container');

// container styles

const defaultStyle = css`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  margin: unset;
  padding: 10px ${LEFT_RIGHT_OFFSET}px 10px ${LEFT_RIGHT_OFFSET}px;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
  font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
  transition: background-color 150ms ease-in-out;
  appearance: none;
  background: none;

  &::-moz-focus-inner {
    border: 0;
  }

  &:before {
    content: '';
    position: absolute;
    top: -2px;
    bottom: -2px;
    left: -2px;
    right: -2px;
    z-index: -1;
    border-radius: 5px;
    transform: scale(0.9, 0.8);
    transition: transform 150ms ease-in-out, background-color 150ms ease-in-out;
  }

  &:hover {
    text-decoration: none;
    background-color: ${uiColors.gray.light3};

    &:before {
      transform: scale(1);
    }
  }

  &:active {
    background-color: ${uiColors.gray.light2};

    &:before {
      transform: scale(1);
    }
  }

  &:focus {
    outline: none;
    text-decoration: none;

    &:active {
      background-color: ${uiColors.gray.light2};

      &:before {
        transform: scale(1);
      }
    }
  }
`;

const activeStyle = css`
  background-color: ${uiColors.green.light3};
  &:hover {
    color: ${uiColors.green.dark3};
  }
`;

const disabledStyle = css`
  cursor: not-allowed;
  pointer-events: none;
  background-color: transparent;
`;

const focusedStyle = css`
  &:focus {
    background-color: ${uiColors.blue.light3};
    color: ${uiColors.blue.dark3};

    &:before {
      background-color: ${uiColors.blue.light3};
      transform: scale(1);
    }

    &:active {
      color: ${uiColors.green.dark3};
      background-color: ${uiColors.green.light3};

      &:before {
        transform: scale(1);
      }
    }
  }
`;

// text content styles

const textStyle = css`
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

// browser-default overrides

const linkStyle = css`
  text-decoration: none;
  color: inherit;
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
 other additional props will be spread on the anchor element.
 @param props.as When provided, the component will be rendered as the component or html tag indicated
 by this prop. Other additional props will be spread on the anchor element.
 */
function SideNavItem(props: SideNavItemProps) {
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

  if (usesLinkElement(props)) {
    Root = RootComponentTypes.Link;
  } else if (usesCustomElement(props)) {
    Root = props[RootComponentTypes.Custom];
  } else {
    Root = RootComponentTypes.Button;
  }

  return (
    <li role="menuitem">
      <Root
        {...rest}
        {...sideNavItemContainer.prop}
        className={cx(
          defaultStyle,
          linkStyle,
          {
            [activeStyle]: active,
            [disabledStyle]: disabled,
            [focusedStyle]: showFocus,
          },
          className,
        )}
        role="menuitem"
        aria-current={active ? ariaCurrentValue : AriaCurrentValue.Unset}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
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
}

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
