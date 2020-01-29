import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import MongoMenuTrigger from './MongoMenuTrigger';
import {
  AccountInterface,
  URLSInterface,
  Product,
  HostsInterface,
} from '../types';

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

const logoutContainer = css`
  height: 56px;
  background-color: ${uiColors.gray.light3};
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

interface MongoMenuProps {
  /**
   * Object that contains information about the active user. {firstName: 'string', lastName: 'string', email: 'string'}
   */
  account: AccountInterface;

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

  urls: Required<URLSInterface>;

  hosts: Required<HostsInterface>;
}

function MongoMenu({
  account: { firstName, lastName, email, openInvitations },
  activeProduct,
  onLogout = () => {},
  onProductChange = () => {},
  urls,
  hosts,
}: MongoMenuProps) {
  const [open, setOpen] = useState(false);

  const name = `${firstName} ${lastName}`;

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

  const { mongoMenu } = urls;

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
              href={isAccount ? undefined : mongoMenu?.account?.homepage}
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
          glyph="Cloud"
          className={cx(subMenuContainerStyle, {
            [subMenuActiveContainerStyle]: isCloud,
          })}
        >
          <MenuItem href={mongoMenu?.cloud?.userPreferences}>
            User Preferences
          </MenuItem>
          <MenuItem href={mongoMenu?.cloud?.invitations}>
            {openInvitations ? (
              <span className={subMenuItemStyle}>
                Invitations <Badge variant="blue">{openInvitations}</Badge>
              </span>
            ) : (
              'Invitations'
            )}
          </MenuItem>
          <MenuItem href={mongoMenu?.cloud?.organizations}>
            Organizations
          </MenuItem>
          <MenuItem href={mongoMenu?.cloud?.mfa}>
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
          glyph="Laptop"
          className={cx(subMenuContainerStyle, {
            [subMenuActiveContainerStyle]: isUniversity,
          })}
        >
          <MenuItem href={mongoMenu?.university?.videoPreferences}>
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
          glyph="Support"
          className={cx(subMenuContainerStyle, {
            [subMenuActiveContainerStyle]: isSupport,
          })}
        >
          <MenuItem href={mongoMenu?.support?.userPreferences}>
            User Preferences
          </MenuItem>
        </SubMenu>

        <MenuSeparator />

        <MenuItem onClick={onLogout} className={logoutContainer}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

MongoMenu.displayName = 'MongoMenu';

MongoMenu.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  activeProduct: PropTypes.oneOf([
    'account',
    'cloud',
    'support',
    'university',
    'stitch',
    'charts',
  ]),
  onLogout: PropTypes.func,
  onProductChange: PropTypes.func,
  onAccountClick: PropTypes.func,
};

export default MongoMenu;
