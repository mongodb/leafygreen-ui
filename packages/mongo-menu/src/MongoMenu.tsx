import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@leafygreen-ui/button';
import Icon, { glyphs } from '@leafygreen-ui/icon';
import { LogoMark } from '@leafygreen-ui/logo';
import {
  Menu,
  SubMenu,
  MenuItem,
  MenuSeparator,
  FocusableMenuItem,
} from '@leafygreen-ui/menu';
import { createDataProp } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import MongoMenuTrigger from './MongoMenuTrigger';

const subMenuContainer = createDataProp('sub-menu-container');

const triggerWrapper = css`
  display: inline-block;
  position: relative;
  z-index: 0;
`;

const truncate = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const menuStyle = css`
  width: 300px;
`;

const headerStyle = css`
  padding: 24px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${uiColors.gray.dark3};
  color: ${uiColors.white};
  max-width: 100%;
`;

const logoMarkBackground = css`
  background-color: white;
  width: 43px;
  height: 43px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const nameStyle = css`
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
  margin: 0px;
  max-width: 100%;
`;

const subMenuContainerStyle = css`
  pointer-events: inherit;
`;

const subMenuActiveContainerStyle = css`
  pointer-events: none;
`;

const productLinkStyle = css`
  font-size: 12px;
  color: ${uiColors.blue.base};
  display: flex;
  align-items: flex-end;
  ${subMenuContainer.selector}:hover & {
    color: ${uiColors.blue.dark2};
  }
`;

const activeProductLinkStyle = css`
  color: ${uiColors.gray.light1};
`;

const productLinkIconStyle = css`
  opacity: 0;
  transform: translate3d(-3px, 0, 0px);
  transition: all 100ms ease-in;
  ${subMenuContainer.selector}:hover & {
    opacity: 1;
    transform: translate3d(3px, 0, 0px);
  }
`;

const descriptionStyle = css`
  font-size: 12px;
  line-height: 14px;
  text-decoration: none;
  margin-top: 0px;
  margin-bottom: 16px;
  max-width: 100%;
`;

const logoutContainer = css`
  height: 56px;
  background-color: ${uiColors.gray.light3};
`;

interface SubMenuInterface {
  displayName: 'Atlas' | 'University' | 'Cloud Support';
  href:
    | 'https://cloud.mongodb.com'
    | 'https://university.mongodb.com'
    | 'https://support.mongodb.com';
  description: string;
  slug: Product;
  subMenu: Array<string>;
  glyph: Glyph;
}

const subMenus: Array<SubMenuInterface> = [
  {
    displayName: 'Atlas',
    description: 'cloud.mongodb.com',
    href: 'https://cloud.mongodb.com',
    slug: 'atlas',
    subMenu: [
      'User Preferences',
      'Invitations',
      'Organizations',
      'Two-Factor Authorization',
    ],
    glyph: 'Cloud',
  },
  {
    displayName: 'University',
    description: 'university.mongodb.com',
    href: 'https://university.mongodb.com',
    slug: 'university',
    subMenu: ['Video Preferences'],
    glyph: 'Laptop',
  },
  {
    displayName: 'Cloud Support',
    description: 'support.mongodb.com',
    href: 'https://support.mongodb.com',
    slug: 'support',
    subMenu: ['User Preferences'],
    glyph: 'Support',
  },
];

const Product = {
  Atlas: 'atlas',
  University: 'university',
  Support: 'support',
} as const;

type Product = typeof Product[keyof typeof Product] | '';

export { Product };

type Glyph = keyof typeof glyphs;

interface MongoMenuProps {
  /**
   * Object that contains information about the active user. {name: 'string', email: 'string'}
   */
  user: { name: string; email: string };

  /**
   * MongoDB product that is currently active: ['atlas', 'university', 'support'].
   */
  activeProduct?: Product;

  /**
   * Callback invoked after the user clicks log out.
   */
  onLogout?: React.MouseEventHandler;

  /**
   * Callback invoked after the user clicks a product.
   */
  onProductChange?: React.MouseEventHandler;

  /**
   * URL passed to MongoDB Account button. If explicitly set to the
   * empty string, the button will be disabled and not render as a
   * link (e.g. for users already in the account app).
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
    accountURL="https://cloud.mongodb.com/account/profile"
  />
 * ```
 * @param props.user Object that contains information about the active user. {name: 'string', email: 'string'}
 * @param props.activeProduct  MongoDB product that is currently active: ['atlas', 'university', 'support'].
 * @param props.onLogout Callback invoked after the user clicks log out.
 * @param props.onProductChange Callback invoked after the user clicks a product.
 * @param props.accountURL URL (relative or absolute) linked to by the MongoDB Account button
 */
function MongoMenu({
  user: { name, email },
  accountURL = 'https://cloud.mongodb.com/v2#/account',
  activeProduct = '',
  onLogout = () => {},
  onProductChange = () => {},
}: MongoMenuProps) {
  const [open, setOpen] = useState(false);

  const renderSubMenu = ({
    slug,
    href,
    displayName,
    glyph,
    subMenu,
    description,
  }: SubMenuInterface) => {
    const isActive = slug === activeProduct;

    const subMenuDescription = (
      <div
        className={cx(productLinkStyle, {
          [activeProductLinkStyle]: isActive,
        })}
      >
        {description}
        <Icon
          size="small"
          glyph="CaretRight"
          className={productLinkIconStyle}
        />
      </div>
    );

    return (
      <SubMenu
        {...subMenuContainer.prop}
        key={displayName}
        active={isActive}
        href={href}
        description={subMenuDescription}
        target="_blank"
        rel="noopener noreferrer"
        title={displayName}
        glyph={glyph}
        onClick={e => {
          onProductChange(e);
          setOpen(false);
        }}
        className={cx(subMenuContainerStyle, {
          [subMenuActiveContainerStyle]: isActive,
        })}
      >
        {subMenu.map(sub => (
          <MenuItem key={sub}>{sub}</MenuItem>
        ))}
      </SubMenu>
    );
  };

  return (
    <div className={triggerWrapper}>
      <MongoMenuTrigger open={open} name={name} setOpen={setOpen} />

      <Menu open={open} setOpen={setOpen} className={menuStyle}>
        <div className={headerStyle}>
          <div className={logoMarkBackground}>
            <LogoMark height={30} />
          </div>

          <h3 className={cx(nameStyle, truncate)}>{name}</h3>

          <p className={cx(descriptionStyle, truncate)}>{email}</p>

          <FocusableMenuItem>
            <Button
              href={accountURL || undefined}
              disabled={!accountURL}
              as={accountURL ? 'a' : 'button'}
            >
              Manage your MongoDB Account
            </Button>
          </FocusableMenuItem>
        </div>
        <MenuSeparator />

        {subMenus.map(renderSubMenu)}

        <MenuSeparator />

        <MenuItem onClick={onLogout} className={logoutContainer}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

MongoMenu.displayName = 'MongoMenu';

const slugs = subMenus.map(mi => mi.slug);

MongoMenu.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  activeProduct: PropTypes.oneOf(slugs),
  onLogout: PropTypes.func,
  onProductChange: PropTypes.func,
  onAccountClick: PropTypes.func,
};

export default MongoMenu;
