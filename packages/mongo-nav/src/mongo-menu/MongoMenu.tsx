import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Badge from '@leafygreen-ui/badge';
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
import { AccountInterface, OverridesInterface, Product } from '../types';

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

const subMenuItemStyle = css`
  display: flex;
  justify-content: space-between;
`;

const logoutContainer = css`
  height: 56px;
  background-color: ${uiColors.gray.light3};
`;

const SubMenuItemNames = {
  userPreferences: 'User Preferences',
  invitations: 'Invitations',
  organizations: 'Organizations',
  videoPreferences: 'Video Preferences',
  tfa: 'Two-Factor Authorization',
};

type SubMenuItemNames = typeof SubMenuItemNames[keyof typeof SubMenuItemNames];

interface SubMenuItemInterface {
  title: string;
  relative: string;
  absolute: string;
}

interface SubMenuInterface {
  displayName: 'Atlas' | 'University' | 'Cloud Support';
  href:
    | 'https://cloud.mongodb.com'
    | 'https://university.mongodb.com'
    | 'https://support.mongodb.com';
  description: string;
  slug: Product;
  subMenuItems: { [key: string]: SubMenuItemInterface };
  glyph: Glyph;
}

const subMenus: Array<SubMenuInterface> = [
  {
    displayName: 'Atlas',
    description: 'cloud.mongodb.com',
    href: 'https://cloud.mongodb.com',
    slug: 'cloud',
    subMenuItems: {
      userPreferences: {
        title: 'User Preferences',
        relative: '/v2#/preferences/personalization',
        absolute: 'https://cloud.mongodb.com/v2#/preferences/personalization',
      },
      invitations: {
        title: 'Invitations',
        relative: '/v2#/preferences/invitations',
        absolute: 'https://cloud.mongodb.com/v2#/preferences/invitations',
      },
      organizations: {
        title: 'Organizations',
        relative: '/v2#/preferences/organizations',
        absolute: 'https://cloud.mongodb.com/v2#/preferences/organizations',
      },
      tfa: {
        title: 'Two-Factor Authorization',
        relative: '/v2#/preferences/2fa',
        absolute: 'https://cloud.mongodb.com/v2#/preferences/2fa',
      },
    },
    glyph: 'Cloud',
  },
  {
    displayName: 'University',
    description: 'university.mongodb.com',
    href: 'https://university.mongodb.com',
    slug: 'university',
    subMenuItems: {
      videoPreferences: {
        title: 'Video Preferences',
        absolute: 'xx',
        relative: 'yy',
      },
    },
    glyph: 'Laptop',
  },
  {
    displayName: 'Cloud Support',
    description: 'support.mongodb.com',
    href: 'https://support.mongodb.com',
    slug: 'support',
    subMenuItems: {
      userPreferences: {
        title: 'User Preferences',
        absolute: 'https://support.mongodb.com/profile',
        relative: '/profile',
      },
    },
    glyph: 'Support',
  },
];

type Glyph = keyof typeof glyphs;

interface MongoMenuProps {
  /**
   * Object that contains information about the active user. {firstName: 'string', lastName: 'string', email: 'string'}
   */
  account: AccountInterface;

  /**
   * MongoDB product that is currently active: ['cloud', 'university', 'support'].
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

  overrides?: OverridesInterface;
}

function MongoMenu({
  account: { firstName, lastName, email, openInvitations },
  activeProduct,
  onLogout = () => {},
  onProductChange = () => {},
  overrides = { hosts: {}, urls: {} },
}: MongoMenuProps) {
  const [open, setOpen] = useState(false);
  const { hosts, urls } = overrides;

  const name = `${firstName} ${lastName}`;

  const isAccount = activeProduct === 'account';
  const accountURL =
    urls?.mongoMenu?.account?.accountURL ?? hosts?.cloud
      ? `${hosts?.cloud}/account/profile/overview`
      : 'https://cloud.mongodb.com/account/profile/overview';

  const renderSubMenu = ({
    slug,
    href,
    displayName,
    glyph,
    subMenuItems,
    description,
  }: SubMenuInterface) => {
    const isActive = slug === activeProduct;

    const renderSubMenuItems = (subMenuItem: SubMenuItemNames) => {
      let menuItemHref;

      const subMenuItemContent =
        subMenuItems[subMenuItem]?.title === 'Invitations' &&
        openInvitations ? (
          <span className={subMenuItemStyle}>
            {subMenuItems[subMenuItem]?.title}{' '}
            <Badge variant="blue">{openInvitations}</Badge>
          </span>
        ) : (
          subMenuItems[subMenuItem]?.title
        );

      if (urls?.mongoMenu?.[slug]?.[subMenuItem]) {
        menuItemHref = urls?.mongoMenu?.[slug]?.[subMenuItem];
      } else if (hosts?.[slug]) {
        menuItemHref = `${hosts?.[slug] + subMenuItems[subMenuItem]?.relative}`;
      } else {
        menuItemHref = subMenuItems[subMenuItem]?.absolute;
      }

      return (
        <MenuItem key={subMenuItems[subMenuItem]?.title} href={menuItemHref}>
          {subMenuItemContent}
        </MenuItem>
      );
    };

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
        {Object.keys(subMenuItems).map(renderSubMenuItems)}
      </SubMenu>
    );
  };

  return (
    <div className={triggerWrapper}>
      <MongoMenuTrigger open={open} name={firstName} setOpen={setOpen} />

      <Menu open={open} setOpen={setOpen} className={menuStyle}>
        <div className={headerStyle}>
          <div className={logoMarkBackground}>
            <LogoMark height={30} />
          </div>

          <h3 className={cx(nameStyle, truncate)}>{name}</h3>

          <p className={cx(descriptionStyle, truncate)}>{email}</p>

          <FocusableMenuItem>
            <Button
              href={isAccount ? undefined : accountURL}
              disabled={isAccount}
              as={isAccount ? 'button' : 'a'}
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
