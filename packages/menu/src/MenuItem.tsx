import React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { AriaCurrentValue } from '@leafygreen-ui/lib';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';

const menuItemContainer = createDataProp('menu-item-container');

const indentation = 20;

const containerStyle = css`
  min-height: 42px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: ${indentation}px;
  text-decoration: none;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  transition: background-color 150ms ease-in-out;
  border: none;
  margin: unset;
  width: 100%;
  font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  background: ${uiColors.white};
  text-align: left;

  &:before {
    content: '';
    position: absolute;
    width: 3px;
    top: 0;
    bottom: 0;
    left: -1px;
    background-color: transparent;
    transition: background-color 150ms ease-in-out;
  }

  &:hover {
    text-decoration: none;
    background-color: ${uiColors.gray.light3};

    &:before {
      background-color: ${uiColors.gray.light2};
    }
  }

  &:active {
    background-color: ${uiColors.gray.light2};

    &:before {
      background-color: ${uiColors.gray.light1};
    }
  }

  &:focus {
    outline: none;
    text-decoration: none;
  }
`;

const focusedStyle = css`
  &:focus {
    background-color: ${uiColors.blue.light3};
    color: ${uiColors.blue.dark3};

    &:before {
      background-color: #63b0d0;
    }
  }
`;

const linkStyle = css`
  text-decoration: none;
  color: inherit;
`;

const titleTextStyle = css`
  font-size: 14px;
  font-weight: normal;
  color: ${uiColors.gray.dark2};

  ${menuItemContainer.selector}:focus & {
    color: ${uiColors.blue.dark3};
  }
`;

const activeTitleTextStyle = css`
  font-weight: bold;
  color: ${uiColors.green.dark3};
`;

const activeDescriptionTextStyle = css`
  color: ${uiColors.green.dark2};
`;

const descriptionTextStyle = css`
  font-size: 12px;
  font-weight: normal;
  color: ${uiColors.gray.dark1};

  ${menuItemContainer.selector}:focus & {
    color: ${uiColors.blue.dark2};
  }
`;

const activeStyle = css`
  background-color: ${uiColors.green.light3};

  &:before {
    background-color: ${uiColors.green.base};
  }

  &:hover {
    background-color: ${uiColors.green.light3};
    color: ${uiColors.green.dark3};

    &:before {
      background-color: ${uiColors.green.base};
    }
  }
`;

const disabledStyle = css`
  cursor: not-allowed;
  pointer-events: none;
  background-color: ${uiColors.gray.light3};

  &:hover:before {
    background-color: unset;
  }
`;

const disabledTextStyle = css`
  color: ${uiColors.gray.light1};
`;

interface SharedMenuItemProps {
  /**
   * Determines whether or not the MenuItem is active.
   */
  active?: boolean;
  /**
   * Determines whether or not the MenuItem is disabled.
   */
  disabled?: boolean;
  /**
   * Description text displayed below title in MenuItem.
   */
  description?: string;
  /**
   * The value for aria-current if the SideNavItem is active
   */
  ariaCurrentValue?: AriaCurrentValue;
  /**
   * Class name that will be applied to root MenuItem element.
   */
  className?: string;
  /**
   * Class name that will be applied to the title text/children wrapper.
   */
  titleTextClassName?: string;
  /**
   * Content that will appear inside of the underlying MenuItem's content wrapper.
   */
  children?: React.ReactNode;
  ref?: React.Ref<any>;
}

interface LinkMenuItemProps extends HTMLElementProps<'a'>, SharedMenuItemProps {
  href: string;
}

interface ButtonMenuItemProps
  extends HTMLElementProps<'button'>,
    SharedMenuItemProps {
  href?: null;
}

export type MenuItemProps = LinkMenuItemProps | ButtonMenuItemProps;

function usesLinkElement(
  props: LinkMenuItemProps | ButtonMenuItemProps,
): props is LinkMenuItemProps {
  return props.href != null;
}

/**
 * # MenuItem
 *
 * ```
  <MenuItem href="#homeward" titleTextClassName="header-bold" active>
    My Beautiful Menu Item
  </MenuItem>
 * ```
 @param props.active Determines whether or not the MenuItem is active.
 @param props.disabled Determines whether or not the MenuItem is disabled.
 @param props.description Description text optionally displayed below the MenuItem's title.
 @param props.ariaCurrentValue The value for aria-current if the MenuItem is active
 @param props.className Class name that will be applied to root MenuItem element.
 @param props.titleTextClassName Class name that will be applied to the title text/children wrapper.
 @param props.href When provided, the underlying MenuItem's root component will be rendered as an anchor with this href value.
 @param props.children Content that will appear inside of the underlying MenuItem's content wrapper.
 *
 */
const MenuItem = React.forwardRef(
  (props: MenuItemProps, forwardRef: React.Ref<any>) => {
    const {
      active = false,
      disabled = false,
      description,
      ariaCurrentValue = 'page',
      className,
      titleTextClassName,
      href,
      children,
      ...rest
    } = props;
    const { usingKeyboard: showFocus } = useUsingKeyboardContext();

    const anchorProps = href && {
      target: '_self',
      rel: '',
      href,
    };

    const renderMenuItem = (Root: React.ElementType<any> = 'button') => (
      <li role="none">
        <Root
          {...anchorProps}
          {...rest}
          {...menuItemContainer.prop}
          className={cx(
            containerStyle,
            linkStyle,
            {
              [activeStyle]: active,
              [disabledStyle]: disabled,
              [focusedStyle]: showFocus,
            },
            className,
          )}
          role="menuitem"
          aria-current={active ? ariaCurrentValue : '' }
          aria-disabled={disabled}
          ref={forwardRef}
          tabIndex={disabled ? -1 : undefined}
        >
          <div
            className={cx(
              titleTextStyle,
              {
                [activeTitleTextStyle]: active,
                [disabledTextStyle]: disabled,
              },
              titleTextClassName,
            )}
          >
            {children}
          </div>
          {description && (
            <div
              className={cx(descriptionTextStyle, {
                [activeDescriptionTextStyle]: active,
                [disabledTextStyle]: disabled,
              })}
            >
              {description}
            </div>
          )}
        </Root>
      </li>
    );

    if (usesLinkElement(props)) {
      return renderMenuItem('a');
    }

    return renderMenuItem();
  },
);

MenuItem.displayName = 'MenuItem';

// @ts-ignore: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37660
MenuItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  description: PropTypes.string,
  ariaCurrentValue: PropTypes.oneOf(Object.values(AriaCurrentValue)),
  className: PropTypes.string,
  titleTextClassName: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node,
  ref: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default MenuItem;
