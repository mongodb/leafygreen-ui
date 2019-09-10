import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { Menu, MenuItem, MenuGroup } from '@leafygreen-ui/menu';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';

const buttonReset = css`
  appearance: none;
  background: none;
  border: 0px;
  position: relative;
  padding: 0px;

  &:focus {
    outline: none;

    &:before {
      background-color: #63b0d0;
      transform: scale(1);
    }
  }

  &:hover {
    &:before {
      background-color: ${uiColors.gray.light1};
      transform: scale(1);
    }
  }

  &:active {
    &:before {
      background-color: ${uiColors.gray.light3};
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

  &:hover {
    border: 2px solid ${uiColors.gray.light1};
  }

  &:active {
    border: 2px solid ${uiColors.gray.light3};
  }

  &:focus {
    outline: none;
    border: 2px solid ${uiColors.blue.light2};
  }
`;

const menuNameStyle = css`
  margin-right: 2px;
  margin-left: 2px;
`;

const activeMenuButtonStyle = css`
  background-color: ${uiColors.gray.light2};
  &:hover {
    border: 2px solid ${uiColors.gray.light1};
  }
`;

const nameStyle = css`
  font-size: 16px;
  color: ${uiColors.gray.dark1};
  font-weight: bold;
  margin: 4px 0px 2px;
`;

const truncate = css`
  width: 162px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const openIconStyle = css`
  transform: rotate(180deg);
  transition: color 200ms ease-in-out;
`;

const closedIconStyle = css`
  margin-top: 2px;
`;

const accountMenuGroupStyle = css`
  padding: 20px 20px 14px;
`;

const accountButtonStyle = css`
  margin-top: 12px;
  width: 100%;
  display: inline-flex;
  justify-content: center;
`;

const descriptionStyle = css`
  margin: 0px;
  font-size: 12px;
  color: ${uiColors.gray.dark2};
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

const slugs = menuItems.map(mi => mi.slug);

export const Products = {
  Atlas: 'atlas',
  University: 'university',
  Support: 'support',
} as const;

type Products = typeof Products[keyof typeof Products];

interface SSOMenuProps {
  /**
   * Object that contains information about the active user. {name: 'string', email: 'string'}
   */
  user: { name: string; email: string };

  /**
   * MongoDB product that is currently active: ['atlas', 'university', 'support'].
   */
  activeProduct: Products;

  /**
   * Callback invoked after the user clicks log out.
   */
  onLogout?: React.MouseEventHandler;

  /**
   * Callback invoked after the user clicks a product.
   */
  onProductChange?: React.MouseEventHandler;
}

/**
 * # SSOMenu
 *
 * ```
<SSOMenu
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
function SSOMenu({
  user: { name, email },
  activeProduct,
  onLogout = () => {},
  onProductChange = () => {},
}: SSOMenuProps) {
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
          glyph="CaretUp"
          className={cx({
            [openIconStyle]: open,
            [closedIconStyle]: !open,
          })}
        />
      </div>

      <Menu open={open} setOpen={setOpen}>
        <MenuGroup className={accountMenuGroupStyle}>
          <h3 className={cx(nameStyle, truncate)}>{name}</h3>
          <p className={descriptionStyle}>{email}</p>
          <Button
            size="small"
            href="https://account.mongodb.com"
            className={accountButtonStyle}
            as="a"
          >
            MongoDB Account
          </Button>
        </MenuGroup>
        <MenuGroup>
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
        </MenuGroup>
        <MenuItem onClick={onLogout} className={cx(logoutContainerHeight)}>
          Logout
        </MenuItem>
      </Menu>
    </button>
  );
}

SSOMenu.displayName = 'SSOMenu';

SSOMenu.propTypes = {
  user: PropTypes.object,
  activeProduct: PropTypes.oneOf(slugs),
  onLogout: PropTypes.func,
  onProductChange: PropTypes.func,
  onAccountClick: PropTypes.func,
};

export default SSOMenu;
