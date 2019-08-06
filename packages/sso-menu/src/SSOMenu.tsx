import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from 'emotion';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { Menu, MenuGroup, MenuItem } from '@leafygreen-ui/menu';

const menuButtonStyle = css`
  height: 29px;
  padding: 2px 14px;
  border: 1px solid ${uiColors.gray.base};
  border-radius: 14.5px;
  cursor: pointer;
  transition: background 200ms ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${uiColors.gray.dark1};
  font-size: 12px;
  line-height: 15px;
  position: relative;

  &:hover {
    background-color: ${uiColors.gray.light1};
    color: ${uiColors.gray.dark2};
  }

  &.lg-active {
    background-color: ${uiColors.gray.base};
    color: ${uiColors.white};

    &:hover {
      background-color: ${uiColors.gray.base};
      color: ${uiColors.white};
    }

    & > svg {
      transform: rotate(180deg);
      fill: white !important;
    }
  }
`;

const menuNameStyle = css`
  margin-right: 2px;
  margin-left: 2px;
`;

const nameStyle = css`
  font-size: 16px;
  color: ${uiColors.gray.dark1};
  font-weight: bolder;
  margin-top: 4px;
  margin-bottom: 2px;
  margin-right: 0px;
  margin-left: 0px;
`;

const truncate = css`
  width: 162px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const iconStyle = css`
  position: relative;
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

const menuItemTextStyle = css`
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
  margin: 0px;
`;

const descriptionStyle = css`
  margin: 0px;
  display: block;
  font-weight: normal;
  font-size: 12px;
  color: ${uiColors.gray.dark2};
  text-decoration: none;
`;

const menuItemPadding = css`
  padding-left: 20px;
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

export const ActiveProduct = {
  Atlas: 'atlas',
  University: 'university',
  Support: 'support',
} as const;

type ActiveProduct = typeof ActiveProduct[keyof typeof ActiveProduct];

interface SSOMenuProps {
  /**
   * Object that contains information about the active user. {name: 'string', email: 'string'}
   */
  user: { name: string; email: string };

  /**
   * MongoDB product that is currently active: ['atlas', 'university', 'support'].
   */
  activeProduct: ActiveProduct;

  /**
   * Callback invoked when user logs out.
   */
  onLogout?: React.MouseEventHandler;

  /**
   * Callback invoked when user switches products.
   */
  onProductChange?: React.MouseEventHandler;

  /**
   * Callback invoked when user views their MongoDB account.
   */
  onAccountClick?: React.MouseEventHandler;
}

/**
 * # SSOMenu
 *
 * ```
<SSOMenu
    user={{ name: 'Alex Smith', email: 'alex.smith@youwork.com' }}
    activeProduct="atlas"
    onAccountClick={() => console.log('Viewing account information')}
    onLogout={() => console.log('On logout')}
    onProductChange={() => console.log('Switching products')}
  />
 * ```
 * @param props.user Object that contains information about the active user. {name: 'string', email: 'string'}
 * @param props.activeProduct  MongoDB product that is currently active: ['atlas', 'university', 'support'].
 * @param props.onLogout Callback invoked when user logs out.
 * @param props.onAccountClick Callback invoked when user views their MongoDB account.
 * @param props.onProductChange Callback invoked when user switches products.
 *
 */
function SSOMenu({
  user: { name, email },
  activeProduct,
  onLogout,
  onProductChange,
  onAccountClick,
}: SSOMenuProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <Menu
      trigger={
        <button ref={triggerRef} type="button" className={menuButtonStyle}>
          <span className={menuNameStyle}>{name}</span>
          <Icon
            glyph="CaretDown"
            className={iconStyle}
            fill={uiColors.gray.dark1}
          />
        </button>
      }
    >
      <MenuGroup className={accountMenuGroupStyle}>
        <h3 className={cx(nameStyle, truncate)}>{name}</h3>
        <p className={descriptionStyle}>{email}</p>
        <Button
          size="small"
          onClick={onAccountClick}
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
            className={menuItemPadding}
            href={el.href}
          >
            <p className={menuItemTextStyle}>{el.displayName}</p>
            <p className={descriptionStyle}>{el.description}</p>
          </MenuItem>
        ))}
      </MenuGroup>
      <MenuItem
        active={false}
        onClick={onLogout}
        className={cx(
          logoutContainerHeight,
          menuItemTextStyle,
          menuItemPadding,
        )}
      >
        Logout
      </MenuItem>
    </Menu>
  );
}

SSOMenu.displayName = 'SSOMenu';

SSOMenu.propTypes = {
  user: PropTypes.object,
  activeProduct: PropTypes.oneOf(['atlas', 'support', 'university']),
  onLogout: PropTypes.func,
  onProductChange: PropTypes.func,
  onAccountClick: PropTypes.func,
};

export default SSOMenu;
