import React, { RefObject } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { createDataProp } from '@leafygreen-ui/lib';

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
  font-family: 'Akzidenz';

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

  &:focus {
    outline: none;
    background-color: ${uiColors.blue.light3};
    color: ${uiColors.blue.dark3};

    &:before {
      background-color: #63b0d0;
    }
  }
`;

const disabledStyle = css`
  cursor: not-allowed;
  background-color: ${uiColors.gray.light3};

  &:hover:before {
    background-color: unset;
  }
`;

const disbaledTextStyle = css`
  color: ${uiColors.gray.light1};
`;

export interface MenuItemProps {
  /**
   * If supplied, MenuItem will be rendered inside of `a` tags.
   */
  href?: string;

  /**
   * Class name that will be applied to root MenuItem element.
   */
  className?: string;

  /**
   * Callback function to be executed when MenuItem is clicked.
   */
  onClick?: React.MouseEventHandler;

  /**
   * Main content displayed in MenuItem.
   */
  children?: React.ReactNode;

  /**
   * Description text displayed below title in MenuItem.
   */
  description?: string;

  /**
   * Determines whether or not the MenuItem is disabled.
   */
  disabled?: boolean;

  /**
   * Determines whether or not the MenuItem is active.
   */
  active?: boolean;

  ref?: any;
}

/**
 * # MenuItem
 *
 * ```
<MenuItem>Hello World!</MenuItem>
 * ```
 * @param props.href If supplied, MenuItem will render inside of `a` tags.
 * @param props.onClick Function to be executed when MenuItem is clicked.
 * @param props.className Classname applied to MenuItem.
 * @param props.children Content to appear inside of the MenuItem.
 * @param props.description Subtext to appear inside of MenuItem
 * @param props.disabled Determines if the MenuItem is disabled
 * @param props.active Determines whether the MenuItem will appear as active
 *
 */
const MenuItem = React.forwardRef(
  (
    {
      disabled = false,
      active = false,
      href,
      onClick,
      className,
      children,
      description,
      ...rest
    }: MenuItemProps,
    forwardedref,
  ) => {
    const Root = href ? 'a' : 'button';

    const anchorProps = href && {
      target: '_blank',
      rel: 'noopener noreferrer',
    };

    return (
      <li role="none">
        <Root
          {...rest}
          {...menuItemContainer.prop}
          {...anchorProps}
          className={cx(
            containerStyle,
            linkStyle,
            {
              [activeStyle]: active,
              [disabledStyle]: disabled,
            },
            className,
          )}
          role="menuitem"
          aria-disabled={disabled}
          onClick={disabled ? undefined : onClick}
          href={href}
          ref={forwardedref as RefObject<any>}
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
