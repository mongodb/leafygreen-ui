import React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps, createDataProp } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
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

const activetitleTextStyle = css`
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

const disbaledTextStyle = css`
  color: ${uiColors.gray.light1};
`;

interface SharedMenuItemProps {
  /**
   * Class name that will be applied to root MenuItem element.
   */
  className?: string;

  /**
   * Determines whether or not the MenuItem is active.
   */
  active?: boolean;

  /**
   * Description text displayed below title in MenuItem.
   */
  description?: string;
  /**
   * Determines whether or not the MenuItem is disabled.
   */
  disabled?: boolean;
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

type MenuItemProps = LinkMenuItemProps | ButtonMenuItemProps;

function usesLinkElement(
  props: LinkMenuItemProps | ButtonMenuItemProps,
): props is LinkMenuItemProps {
  return props.href != null;
}

const MenuItem = React.forwardRef(
  (props: MenuItemProps, forwardRef: React.Ref<any>) => {
    const {
      disabled = false,
      active = false,
      className,
      children,
      description,
      href,
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
          aria-disabled={disabled}
          ref={forwardRef}
          tabIndex={disabled ? -1 : undefined}
        >
          <div
            className={cx(titleTextStyle, {
              [activetitleTextStyle]: active,
              [disbaledTextStyle]: disabled,
            })}
          >
            {children}
          </div>
          {description && (
            <div
              className={cx(descriptionTextStyle, {
                [activeDescriptionTextStyle]: active,
                [disbaledTextStyle]: disabled,
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
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.node,
  ref: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default MenuItem;
