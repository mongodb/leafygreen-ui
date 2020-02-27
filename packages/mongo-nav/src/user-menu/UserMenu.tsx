import React, { useState } from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash/defaultsDeep';
import Badge from '@leafygreen-ui/badge';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
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
import UserMenuTrigger from './UserMenuTrigger';
import {
  AccountInterface,
  URLSInterface,
  Product,
  HostsInterface,
} from '../types';
import { hostDefaults } from '../data';

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

const subMenuItemStyle = css`
  display: flex;
  justify-content: space-between;
`;

const descriptionStyle = css`
  font-size: 12px;
  line-height: 14px;
  text-decoration: none;
  margin-top: 0px;
  margin-bottom: 16px;
  max-width: 100%;
`;

interface DescriptionProps {
  isActive: boolean;
  product: 'cloud' | 'university' | 'support';
}

function Description({ isActive, product }: DescriptionProps) {
  return (
    <div
      className={cx(productLinkStyle, {
        [activeProductLinkStyle]: isActive,
      })}
    >
      {`${product}.mongodb.com`}
      <Icon size="small" glyph="CaretRight" className={productLinkIconStyle} />
    </div>
  );
}

interface UserMenuProps {
  /**
   * Object that contains information about the active user. {firstName: 'string', lastName: 'string', email: 'string'}
   */
  account?: AccountInterface;

  /**
   * MongoDB product that is currently active: ['cloud', 'university', 'support'].
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
   * Object that supplies URL overrides to UserMenu component.
   * Shape: { userMenu:{ cloud: { userPreferences, organizations, invitations, mfa }, university: { videoPreferences }, support: { userPreferences }, account: { homepage } }}
   */
  urls?: URLSInterface;

  /**
   * Object that supplies host overrides to UserMenu component.
   * Shape: { cloud, realm, charts, account, university, support }
   * Defaults to the production homepages of each product
   */
  hosts?: HostsInterface;
}

/**
 * # UserMenu
 *
 * UserMenu component
 *
 * ```
<UserMenu
  account={account}
  activeProduct="cloud"
  onLogout={onLogout}
  onProductChange={onProductChange}
  urls={urls}
  hosts={hosts}
/>
```
 * @param props.account Object that contains information about the active user. {firstName: 'string', lastName: 'string', email: 'string'}
 * @param props.activeProduct MongoDB product that is currently active: ['cloud', 'university', 'support'].
 * @param props.onLogout Callback invoked after the user clicks log out.
 * @param props.onProductChange Callback invoked after the user clicks a product.
 * @param props.hosts Object where keys are MDB products and values are the desired hostURL override for that product, to enable `<UserMenu />` to work across all environments.
 * @param props.urls Object to enable custom overrides for every `href` used in `<UserMenu />`.
 */
function UserMenu({
  account,
  activeProduct,
  onLogout = () => {},
  onProductChange = () => {},
  urls: urlsProp,
  hosts: hostsProp,
}: UserMenuProps) {
  const hosts = defaultsDeep(hostsProp, hostDefaults);

  // will make this logic more abstract, but wanted to get a quick fix in so that UserMenu can be consumed outside of MongoNav
  const defaultURLs = {
    userMenu: {
      cloud: {
        userPreferences: `${hosts.cloud}/v2#/preferences/personalization`,
        organizations: `${hosts.cloud}/v2#/preferences/organizations`,
        invitations: `${hosts.cloud}/v2#/preferences/invitations`,
        mfa: `${hosts.cloud}/v2#/preferences/2fa`,
      },
      university: {
        videoPreferences: `${hosts.university}`,
      },
      support: {
        userPreferences: `${hosts.support}/profile`,
      },
      account: {
        homepage: `${hosts.account}/account/profile/overview`,
      },
    },
  };

  const urls = defaultsDeep(urlsProp, defaultURLs);

  const [open, setOpen] = useState(false);

  const name = account
    ? `${account.firstName ?? ''} ${account.lastName ?? ''}`
    : '';

  const isAccount = activeProduct === 'account';
  const cloudProducts = ['cloud', 'stitch', 'charts'];
  const isCloud = cloudProducts.includes(activeProduct);
  const isSupport = activeProduct === 'support';
  const isUniversity = activeProduct === 'university';

  const sharedProps = {
    target: '_blank',
    rel: 'noopener noreferrer',
    onClick: (e: React.MouseEvent) => {
      onProductChange(e);
      setOpen(false);
    },
  };

  const { userMenu } = urls;

  const feedbackAnchorProps = {
    href: 'https://feedback.mongodb.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  return (
    <div className={triggerWrapper}>
      <UserMenuTrigger
        open={open}
        name={account?.firstName ?? ''}
        setOpen={setOpen}
        data-testid="user-menu-trigger"
      >
        <Menu open={open} setOpen={setOpen} className={menuStyle}>
          <div className={headerStyle}>
            <div className={logoMarkBackground}>
              <LogoMark height={30} />
            </div>

            <h3 className={cx(nameStyle, truncate)}>{name}</h3>

            <p className={cx(descriptionStyle, truncate)}>
              {account?.email ?? ''}
            </p>

            <FocusableMenuItem>
              <Button
                href={isAccount ? undefined : userMenu?.account?.homepage}
                disabled={isAccount}
                as={isAccount ? 'button' : 'a'}
              >
                Manage your MongoDB Account
              </Button>
            </FocusableMenuItem>
          </div>
          <MenuSeparator />

          <SubMenu
            {...subMenuContainer.prop}
            {...sharedProps}
            active={isCloud}
            href={hosts.cloud}
            description={<Description isActive={isCloud} product="cloud" />}
            title="Atlas"
            glyph={<Icon glyph="Cloud" size="xlarge" />}
            className={cx(subMenuContainerStyle, {
              [subMenuActiveContainerStyle]: isCloud,
            })}
          >
            <MenuItem href={userMenu?.cloud?.userPreferences}>
              User Preferences
            </MenuItem>
            <MenuItem
              href={userMenu?.cloud?.invitations}
              data-testid="user-menuitem-cloud-invitations"
            >
              <span className={subMenuItemStyle}>
                Invitations
                {(account?.openInvitations ?? 0) > 0 && (
                  <Badge variant="blue">{account?.openInvitations}</Badge>
                )}
              </span>
            </MenuItem>
            <MenuItem href={userMenu?.cloud?.organizations}>
              Organizations
            </MenuItem>
            <MenuItem href={userMenu?.cloud?.mfa}>
              Two-Factor Authorization
            </MenuItem>
          </SubMenu>

          <SubMenu
            {...subMenuContainer.prop}
            {...sharedProps}
            active={isUniversity}
            href={hosts.university}
            description={
              <Description isActive={isUniversity} product="university" />
            }
            title="University"
            glyph={<Icon glyph="Laptop" size="xlarge" />}
            className={cx(subMenuContainerStyle, {
              [subMenuActiveContainerStyle]: isUniversity,
            })}
          >
            <MenuItem href={userMenu?.university?.videoPreferences}>
              Video Preferences
            </MenuItem>
          </SubMenu>

          <SubMenu
            {...subMenuContainer.prop}
            {...sharedProps}
            active={isSupport}
            href={hosts.support}
            description={<Description isActive={isSupport} product="support" />}
            title="Support"
            glyph={<Icon glyph="Support" size="xlarge" />}
            className={cx(subMenuContainerStyle, {
              [subMenuActiveContainerStyle]: isSupport,
            })}
          >
            <MenuItem href={userMenu?.support?.userPreferences}>
              User Preferences
            </MenuItem>
          </SubMenu>

          <MenuSeparator />

          <MenuItem
            {...feedbackAnchorProps}
            size="large"
            glyph={<Icon glyph="Bell" size="xlarge" />}
          >
            Give us feedback
          </MenuItem>

          <MenuSeparator />

          <MenuItem onClick={onLogout} size="large">
            Logout
          </MenuItem>
        </Menu>
      </UserMenuTrigger>
    </div>
  );
}

UserMenu.displayName = 'UserMenu';

UserMenu.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  activeProduct: PropTypes.oneOf([
    'account',
    'cloud',
    'support',
    'university',
    'realm',
    'charts',
  ]),
  onLogout: PropTypes.func,
  onProductChange: PropTypes.func,
  onAccountClick: PropTypes.func,
};

export default UserMenu;
