import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import {
  Menu,
  MenuItem,
  MenuSeparator,
  FocusableMenuItem,
} from '@leafygreen-ui/menu';
import { createDataProp } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';

const iconRef = createDataProp('icon-ref');

const buttonReset = css`
  appearance: none;
  background: none;
  border: 0px;
  position: relative;
  padding: 0px;

  &:hover:before {
    transform: scale(1);
  }

  &:active {
    color: ${uiColors.gray.dark2};

    &:before {
      transform: scale(1);
    }

    & ${iconRef.selector} {
      color: ${uiColors.gray.dark1};
    }
  }

  &:focus {
    outline: none;

    &:before {
      background-color: #63b0d0;
      transform: scale(1);
    }
  }

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
    border-radius: 50px;
    transform: scale(0.9, 0.8);
    transition: transform 150ms ease-in-out;
    background-color: ${uiColors.gray.light2};
  }
`;

const menuButtonStyle = css`
  height: 29px;
  padding-left: 14px;
  padding-right: 14px;
  border: 1px solid ${uiColors.gray.light1};
  background-color: ${uiColors.white};
  border-radius: 14.5px;
  cursor: pointer;
  transition: background 150ms ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${uiColors.gray.dark2};
  font-size: 12px;
  position: relative;

  &:focus {
    outline: none;
  }
`;

const menuNameStyle = css`
  margin-right: 2px;
  margin-left: 2px;
`;

const activeMenuButtonStyle = css`
  background-color: ${uiColors.gray.light2};
`;

const nameStyle = css`
  font-size: 16px;
  color: ${uiColors.gray.dark2};
  font-weight: bold;
  margin: 4px 0px 2px;
`;

const truncate = css`
  width: 162px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const closedIconStyle = css`
  transform: rotate(180deg);
  transition: color 200ms ease-in-out;
  color: ${uiColors.gray.base};
`;

const openIconStyle = css`
  margin-top: 2px;
  color: ${uiColors.gray.base};
`;

const headerPadding = css`
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

const accountButtonStyle = css`
  margin-top: 12px;
  margin-left: 20px;
  width: calc(100% - 40px);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;
`;

const descriptionStyle = css`
  margin: 0px;
  font-size: 12px;
  color: ${uiColors.gray.dark1};
  text-decoration: none;
`;

const logoutContainerHeight = css`
  height: 46px;
`;

const menuItems = [
  {
    displayName: 'Atlas',
    description: 'cloud.mongodb.com',
    href: 'https://cloud.mongodb.com',
    slug: 'atlas',
  },
  {
    displayName: 'University',
    description: 'university.mongodb.com',
    href: 'https://university.mongodb.com',
    slug: 'university',
  },
  {
    displayName: 'Cloud Support',
    description: 'support.mongodb.com',
    href: 'https://support.mongodb.com',
    slug: 'support',
  },
] as const;

export const Product = {
  Atlas: 'atlas',
  University: 'university',
  Support: 'support',
} as const;

type Product = typeof Product[keyof typeof Product];

interface MongoMenuProps {
  /**
   * Object that contains information about the active user. {name: 'string', email: 'string'}
   */
  user: { name: string; email: string };

  /**
   * MongoDB product that is currently active: ['atlas', 'university', 'support'].
   */
  activeProduct: Product;

  /**
   * Callback invoked after the user clicks log out.
   */
  onLogout?: React.MouseEventHandler;

  /**
   * Callback invoked after the user clicks a product.
   */
  onProductChange?: React.MouseEventHandler;

  /**
   * URL passed to MongoDB Account button.
   */
  accountURL?: string;
}

/**
 * # MongoMenu
 *
 * ```
<MongoMenu
    user={{ name: 'Alex Smith', email: 'alex.smith@youwork.com' }}
    activeProduct="atlas"
    onLogout={() => console.log('On logout')}
    onProductChange={() => console.log('Switching products')}
  />
 * ```
 * @param props.user Object that contains information about the active user. {name: 'string', email: 'string'}
 * @param props.activeProduct  MongoDB product that is currently active: ['atlas', 'university', 'support'].
 * @param props.onLogout Callback invoked after the user clicks log out.
 * @param props.onProductChange Callback invoked after the user clicks a product.
 *
 */
function MongoMenu({
  user: { name, email },
  accountURL = 'https://cloud.mongodb.com/v2#/account',
  activeProduct,
  onLogout = () => {},
  onProductChange = () => {},
}: MongoMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <button className={buttonReset} onClick={() => setOpen(curr => !curr)}>
      <div
        className={cx(menuButtonStyle, {
          [activeMenuButtonStyle]: open,
        })}
      >
        <span className={menuNameStyle}>{name}</span>

        <Icon
          {...iconRef.prop}
          glyph="CaretUp"
          className={cx({
            [openIconStyle]: open,
            [closedIconStyle]: !open,
          })}
        />
      </div>

      <Menu open={open} setOpen={setOpen}>
        <div className={headerPadding}>
          <h3 className={cx(nameStyle, truncate)}>{name}</h3>
          <p className={descriptionStyle}>{email}</p>
        </div>
        <FocusableMenuItem>
          <Button
            size="small"
            href={accountURL}
            className={accountButtonStyle}
            as="a"
          >
            MongoDB Account
          </Button>
        </FocusableMenuItem>
        <MenuSeparator />
        {menuItems.map(el => (
          <MenuItem
            onClick={onProductChange}
            key={el.displayName}
            active={el.slug === activeProduct}
            href={el.href}
            description={el.description}
          >
            {el.displayName}
          </MenuItem>
        ))}
        <MenuSeparator />
        <MenuItem onClick={onLogout} className={cx(logoutContainerHeight)}>
          Logout
        </MenuItem>
      </Menu>
    </button>
  );
}

MongoMenu.displayName = 'MongoMenu';

const slugs = menuItems.map(mi => mi.slug);

MongoMenu.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  activeProduct: PropTypes.oneOf(slugs),
  onLogout: PropTypes.func,
  onProductChange: PropTypes.func,
  onAccountClick: PropTypes.func,
};

export default MongoMenu;
