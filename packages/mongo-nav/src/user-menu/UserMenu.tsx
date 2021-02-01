import React, { useState } from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash/defaultsDeep';
import Badge from '@leafygreen-ui/badge';
import Button from '@leafygreen-ui/button';
import ArrowRightIcon from '@leafygreen-ui/icon/dist/ArrowRight';
import BellIcon from '@leafygreen-ui/icon/dist/Bell';
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
  ActiveNavElement,
  URLS,
  UserMenuURLS,
  HostsInterface,
  NavElement,
  Platform,
  Environment,
} from '../types';
import { hostDefaults } from '../data';
import { useOnElementClick } from '../on-element-click-provider';
import {
  CloudIcon,
  SupportIcon,
  UniversityIcon,
  MegaphoneIcon,
  DevHubIcon,
  DocsIcon,
} from '../helpers/Icons';

const subMenuContainer = createDataProp('sub-menu-container');
const menuItemContainer = createDataProp('menu-item-container');

const triggerWrapper = css`
  display: inline-block;
  position: relative;
  z-index: 0;
  font-family: 'Akzidenz', Helvetica, Arial, sans-serif;
`;

const truncate = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const menuStyle = css`
  width: 300px;
  font-weight: normal;
  overflow: auto;
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

const mfaBannerStyle = css`
  padding: 8px;
  display: flex;
  font-size: 12px;
  line-height: 14px;
  justify-content: space-around;
  background-color: ${uiColors.yellow.light3};
  color: ${uiColors.yellow.dark2};
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
  align-items: center;
  ${subMenuContainer.selector}:hover &,
  ${menuItemContainer.selector}:hover & {
    color: ${uiColors.blue.dark2};
  }
`;

const activePlatformLinkStyle = css`
  color: ${uiColors.gray.light1};
`;

const productLinkIconStyle = css`
  height: 10px;
  width: 10px;
  opacity: 0;
  transform: translate3d(-3px, 0, 0px);
  transition: all 100ms ease-in;
  ${subMenuContainer.selector}:hover &,
  ${menuItemContainer.selector}:hover & {
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
  product: 'cloud' | 'university' | 'support' | 'developer' | 'docs';
  isGovernment?: boolean;
}

function Description({
  isActive,
  product,
  isGovernment = false,
}: DescriptionProps) {
  return (
    <div
      className={cx(productLinkStyle, {
        [activePlatformLinkStyle]: isActive,
      })}
    >
      {isGovernment && product === 'cloud'
        ? 'cloud.mongodbgov.com'
        : `${product}.mongodb.com`}
      <ArrowRightIcon size="small" className={productLinkIconStyle} />
    </div>
  );
}

interface UserMenuProps {
  /**
   * Object that contains information about the active user.
   * {firstName: 'string', lastName: 'string', email: 'string'}
   */
  account?: AccountInterface;

  /**
   * Determines what nav item is currently active.
   */
  activeNav?: NavElement;

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
   * Shape: { userMenu:{ cloud: { userPreferences, organizations, invitations, mfa }, university: { universityPreferences }, support: { userPreferences }, account: { homepage } }}
   */
  urls?: URLS | { userMenu: UserMenuURLS };

  /**
   * Object that supplies host overrides to UserMenu component.
   * Shape: { cloud, realm, charts, account, university, support }
   * Defaults to the production homepages of each product
   */
  hosts?: HostsInterface;

  /**
   * MongoDB platform that is currently active.
   * Possible values: ['account', 'cloud',  'support', 'university', 'devHub']
   */
  activePlatform?: Platform;

  /**
   * Describes the environment that the consumer is in: `commercial` or `government`
   */
  environment?: Environment;
}

/**
 * # UserMenu
 *
 * UserMenu component
 *
 * ```
<UserMenu
  account={account}
  activePlatform="cloud"
  onLogout={onLogout}
  onProductChange={onProductChange}
  urls={urls}
  hosts={hosts}
/>
```
* @param props.account Object that contains information about the active user.
*   {firstName: 'string', lastName: 'string', email: 'string'}
* @param props.activeNav Determines what nav item is currently active.
* @param props.onLogout Callback fired when a user logs out.
* @param props.onProductChange Callback invoked after the user clicks a product.
* @param props.hosts Object where keys are MDB products and values are the desired hostURL override for that product, to enable `<UserMenu />` to work across all environments.
* @param props.urls Object to enable custom overrides for every `href` used in `<UserMenu />`.
* @param props.activePlatform MongoDB platform that is currently active.
* @param props.environment Describes the environment that the consumer is in: `commercial` or `government`
*/
function UserMenu({
  account,
  activeNav,
  activePlatform,
  onLogout: onLogoutProp,
  urls: urlsProp,
  hosts: hostsProp,
  onProductChange = () => { },
  environment = Environment.Commercial,
}: UserMenuProps) {
  const hosts = defaultsDeep(
    hostsProp,
    hostDefaults(environment === Environment.Government),
  );
  const onElementClick = useOnElementClick();

  const onLogout = (e: React.MouseEvent) => {
    if (onLogoutProp) {
      return onLogoutProp(e);
    } else {
      return onElementClick(NavElement.Logout)(e);
    }
  };

  const defaultURLs = {
    userMenu: {
      cloud: {
        userPreferences: `${hosts.cloud}/v2#/preferences/personalization`,
        organizations: `${hosts.cloud}/v2#/preferences/organizations`,
        invitations: `${hosts.cloud}/v2#/preferences/invitations`,
        mfa: `${hosts.cloud}/v2#/preferences/2fa`,
      },
      university: {
        universityPreferences: `${hosts.university}/edit_profile`,
      },
      support: {
        userPreferences: `${hosts.support}/profile`,
      },
      account: {
        homepage: `${hosts.account}/account/profile/overview`,
      },
      logout: `${hosts.account}/account/login?signedOut=true`,
    },
  };

  const urls: typeof defaultURLs = defaultsDeep(urlsProp, defaultURLs);
  const userMenu = urls.userMenu;
  const cloudUrls = userMenu.cloud;

  const [open, setOpen] = useState(false);

  const name = account
    ? `${account.firstName ?? ''} ${account.lastName ?? ''}`
    : '';

  const isAccount = activePlatform === Platform.Account;
  const isCloud = activePlatform === Platform.Cloud;
  const isSupport = activePlatform === Platform.Support;
  const isUniversity = activePlatform === Platform.University;
  const isGovernment = environment === Environment.Government;
  const isDocs = activePlatform === Platform.Docs;
  const isDevHub = activePlatform === Platform.DevHub;

  const sharedProps = {
    target: '_blank',
    rel: 'noopener noreferrer',
    onClick: (e: React.MouseEvent) => {
      onProductChange(e);
      setOpen(false);
    },
  };

  const feedbackAnchorProps = {
    href: 'https://feedback.mongodb.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  const ariaHiddenProps = {
    'aria-hidden': true,
    alt: '',
    role: 'presentation',
  };

  const [triggerNode, setTriggerNode] = useState<HTMLDivElement | null>(null);

  let menuPositionTop = 0;

  if (triggerNode) {
    menuPositionTop = triggerNode.getBoundingClientRect().bottom + 10;
  }

  return (
    <div className={triggerWrapper}>
      <UserMenuTrigger
        open={open}
        name={account?.firstName ?? ''}
        setOpen={setOpen}
        data-testid="user-menu-trigger"
        ref={setTriggerNode}
      />
      <Menu
        open={open}
        setOpen={setOpen}
        className={cx(
          menuStyle,
          css(`max-height: calc(100vh - ${menuPositionTop}px - 10px);`),
        )}
        usePortal={false}
      >
        {account?.shouldSeeAccountMfaBanner && (
          <li role="none" className={mfaBannerStyle}>
            <BellIcon size="small" />
            MFA is now available for your MongoDB Account!
          </li>
        )}
        <li role="none" className={headerStyle}>
          <div className={logoMarkBackground}>
            <LogoMark height={30} />
          </div>

          <h3 className={cx(nameStyle, truncate)}>{name}</h3>

          <p className={cx(descriptionStyle, truncate)}>
            {account?.email ?? ''}
          </p>

          <FocusableMenuItem>
            <Button
              as={isAccount ? 'button' : 'a'}
              href={isAccount ? undefined : userMenu.account.homepage}
              disabled={isAccount}
              data-testid="user-menu-account-button"
            >
              Manage your MongoDB Account
            </Button>
          </FocusableMenuItem>
        </li>
        <MenuSeparator />

        {isCloud || isAccount ? (
          <SubMenu
            {...subMenuContainer.prop}
            {...sharedProps}
            active={isCloud}
            disabled={!account}
            href={hosts.cloud}
            description={
              <Description
                isActive={isCloud}
                product="cloud"
                isGovernment={isGovernment}
              />
            }
            title={isGovernment ? 'Cloud for Government' : 'Cloud'}
            glyph={<CloudIcon {...ariaHiddenProps} />}
            className={cx(subMenuContainerStyle, {
              [subMenuActiveContainerStyle]: isCloud,
            })}
          >
            <MenuItem
              as={cloudUrls.userPreferences ? 'a' : 'button'}
              href={cloudUrls.userPreferences}
              active={
                activeNav === ActiveNavElement.UserMenuCloudUserPreferences
              }
              data-testid="user-menuitem-cloud-user-preferences"
              onClick={onElementClick(NavElement.UserMenuCloudUserPreferences)}
            >
              User Preferences
            </MenuItem>
            <MenuItem
              as={cloudUrls.invitations ? 'a' : 'button'}
              href={cloudUrls.invitations}
              active={activeNav === ActiveNavElement.UserMenuCloudInvitations}
              data-testid="user-menuitem-cloud-invitations"
              onClick={onElementClick(NavElement.UserMenuCloudInvitations)}
            >
              <span className={subMenuItemStyle}>
                Invitations
                {(account?.openInvitations ?? 0) > 0 && (
                  <Badge variant="blue">{account?.openInvitations}</Badge>
                )}
              </span>
            </MenuItem>
            <MenuItem
              as={cloudUrls.organizations ? 'a' : 'button'}
              href={cloudUrls.organizations}
              active={activeNav === ActiveNavElement.UserMenuCloudOrganizations}
              data-testid="user-menuitem-cloud-organizations"
              onClick={onElementClick(NavElement.UserMenuCloudOrganizations)}
            >
              Organizations
            </MenuItem>
            {!isGovernment && account?.hasLegacy2fa && (
              <MenuItem
                as={cloudUrls.mfa ? 'a' : 'button'}
                href={cloudUrls.mfa}
                active={activeNav === ActiveNavElement.UserMenuCloudMFA}
                data-testid="user-menuitem-cloud-mfa"
                onClick={onElementClick(NavElement.UserMenuCloudMFA)}
              >
                Legacy 2FA
              </MenuItem>
            )}
          </SubMenu>
        ) : (
            <MenuItem
              {...menuItemContainer.prop}
              href={hosts.cloud}
              size="large"
              glyph={<CloudIcon {...ariaHiddenProps} />}
              description={
                <Description
                  isActive={false}
                  product="cloud"
                  isGovernment={isGovernment}
                />
              }
            >
              {isGovernment ? 'Cloud for Government' : 'Cloud'}
            </MenuItem>
          )}

        <SubMenu
          {...subMenuContainer.prop}
          {...sharedProps}
          active={isUniversity}
          disabled={!account}
          href={hosts.university}
          title="University"
          glyph={<UniversityIcon {...ariaHiddenProps} />}
          className={cx(subMenuContainerStyle, {
            [subMenuActiveContainerStyle]: isUniversity,
          })}
          description={
            <Description isActive={isUniversity} product="university" />
          }
        >
          <MenuItem
            as={userMenu.university.universityPreferences ? 'a' : 'button'}
            href={userMenu.university.universityPreferences}
            data-testid="user-menuitem-university-preferences"
          >
            University Preferences
          </MenuItem>
        </SubMenu>

        <MenuItem
          {...subMenuContainer.prop}
          {...sharedProps}
          size="large"
          active={isDocs}
          disabled={!account}
          href="https://docs.mongodb.com"
          title="Documentation"
          glyph={<DocsIcon {...ariaHiddenProps} />}
          className={cx(subMenuContainerStyle, {
            [subMenuActiveContainerStyle]: isDocs,
          }, css`background-color: ${uiColors.gray.light3}; border-top: 1px solid ${uiColors.gray.light2}`)}
          description={<Description isActive={isDocs} product="docs" />}
        >
          Documentation
        </MenuItem>

        <SubMenu
          {...subMenuContainer.prop}
          {...sharedProps}
          active={isDevHub}
          disabled={!account}
          href="https://developer.mongodb.com"
          title="Developer Hub"
          glyph={<DevHubIcon {...ariaHiddenProps} />}
          className={cx(subMenuContainerStyle, {
            [subMenuActiveContainerStyle]: isDevHub,
          })}
          description={<Description isActive={isDevHub} product="developer" />}
        >
          <MenuItem
            as="a"
            href="https://developer.mongodb.com/community/forums/"
            data-testid="user-menuitem-devhub-community"
          >
            Forums
          </MenuItem>
        </SubMenu>

        <SubMenu
          {...subMenuContainer.prop}
          {...sharedProps}
          active={isSupport}
          disabled={!account}
          href={hosts.support}
          title="Support"
          glyph={<SupportIcon {...ariaHiddenProps} />}
          description={<Description isActive={isSupport} product="support" />}
          className={cx(subMenuContainerStyle, {
            [subMenuActiveContainerStyle]: isSupport,
          })}
        >
          <MenuItem
            as={userMenu.support.userPreferences ? 'a' : 'button'}
            href={userMenu.support.userPreferences}
            data-testid="user-menuitem-support-user-preferences"
          >
            User Preferences
          </MenuItem>
        </SubMenu>
        <MenuSeparator />
        <MenuItem
          {...feedbackAnchorProps}
          size="large"
          glyph={<MegaphoneIcon {...ariaHiddenProps} />}
          data-testid="user-menuitem-feedback"
          onClick={onElementClick(NavElement.UserMenuFeedback)}
        >
          {isGovernment ? 'Feature Requests' : 'Give us feedback'}
        </MenuItem>
        <MenuSeparator />
        <MenuItem
          onClick={onLogout}
          href={userMenu.logout}
          as={userMenu.logout ? 'a' : 'button'}
          size="large"
          data-testid="user-menuitem-logout"
        >
          Log out
        </MenuItem>
      </Menu>
    </div>
  );
}

UserMenu.displayName = 'UserMenu';

UserMenu.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  activePlatform: PropTypes.oneOf([
    'account',
    'cloud',
    'support',
    'university',
    'devHub',
  ]),
  onLogout: PropTypes.func,
  onProductChange: PropTypes.func,
  onAccountClick: PropTypes.func,
};

export default UserMenu;
