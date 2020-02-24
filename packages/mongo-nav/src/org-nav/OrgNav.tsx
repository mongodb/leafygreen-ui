import React, { useState } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { LogoMark } from '@leafygreen-ui/logo';
import { useViewportSize } from '@leafygreen-ui/hooks';
import Tooltip from '@leafygreen-ui/tooltip';
import Badge from '@leafygreen-ui/badge';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { OrgNavLink } from '../helpers/index';
import { breakpoints, facepaint } from '../breakpoints';
import {
  AccountInterface,
  OrganizationInterface,
  Product,
  URLSInterface,
  NavItem,
  CurrentOrganizationInterface,
  HostsInterface,
  OrgPaymentLabel,
} from '../types';
import { OrgSelect } from '../mongo-select/index';
import UserMenu, { UserMenuTrigger } from '../user-menu/index';

export const orgNavHeight = 60;

const navContainer = css`
  height: ${orgNavHeight}px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 13px;
  line-height: 15px;
  color: ${uiColors.gray.dark3};
  border-bottom: 1px solid ${uiColors.gray.light2};
  box-sizing: border-box;
`;

const leftSideContainer = css`
  display: flex;
  align-items: center;
`;

const orgSelectContainer = css`
  margin-left: 20px;
  margin-right: 20px;
`;

const disabledOrgSelect = css`
  cursor: default;
  pointer-events: none;
`;

const ulContainer = css`
  list-style: none;
  display: flex;
  align-items: center;
  padding-inline-start: 0px;
  margin: 0; // browser default overrides
`;

const supportContainer = css`
  ${facepaint({
    marginRight: ['16px', '16px', '24px'],
    marginLeft: ['16px', '16px', '24px'],
  })}
`;

const rightLinkMargin = css`
  ${facepaint({
    marginRight: ['16px', '16px', '24px'],
  })}
`;

const accessManagerMenuContainer = css`
  padding: 16px;
  width: 220px;
`;

const accessManagerMenuItem = css`
  font-size: 14px;
  color: ${uiColors.gray.dark2};
  line-height: 19.6px;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const onPremMenuWrapper = css`
  display: inline-block;
  position: relative;
  z-index: 0;
`;

const versionStyle = css`
  color: ${uiColors.green.base};
  display: inline-block;
  font-size: 10px;
  ${facepaint({
    marginRight: ['96px', '24px', '24px'],
  })}
`;

export const Colors = {
  Lightgray: 'lightgray',
  Green: 'green',
  Yellow: 'yellow',
  Red: 'red',
} as const;

export type Colors = typeof Colors[keyof typeof Colors];

const paymentStatusMap: { readonly [K in Colors]: Array<string> } = {
  [Colors.Lightgray]: [
    OrgPaymentLabel.Embargoed,
    OrgPaymentLabel.EmbargoConfirmed,
  ],
  [Colors.Green]: [OrgPaymentLabel.Ok],
  [Colors.Yellow]: [
    OrgPaymentLabel.Warning,
    OrgPaymentLabel.Suspended,
    OrgPaymentLabel.Closing,
  ],
  [Colors.Red]: [
    OrgPaymentLabel.Dead,
    OrgPaymentLabel.AdminSuspended,
    OrgPaymentLabel.Locked,
    OrgPaymentLabel.Closed,
  ],
};

interface OrgNav {
  account: AccountInterface;
  activeProduct: Product;
  current?: CurrentOrganizationInterface;
  data?: Array<OrganizationInterface>;
  constructOrganizationURL: (orgID: string) => string;
  urls: Required<URLSInterface>;
  activeNav?: NavItem;
  onOrganizationChange: React.ChangeEventHandler;
  admin: boolean;
  hosts: Required<HostsInterface>;
  currentProjectName?: string;
  isOnPrem?: boolean;
  onLogout?: React.MouseEventHandler;
  version?: string;
  onPremMFA?: boolean;
}

export default function OrgNav({
  account,
  activeNav,
  activeProduct,
  current,
  data,
  constructOrganizationURL,
  onOrganizationChange,
  urls,
  admin,
  hosts,
  currentProjectName,
  isOnPrem,
  onLogout,
  version,
  onPremMFA,
}: OrgNav) {
  const [accessManagerOpen, setAccessManagerOpen] = useState(false);
  const [onPremMenuOpen, setOnPremMenuOpen] = useState(false);
  const { orgNav } = urls;
  const { width: viewportWidth } = useViewportSize();
  const isTablet = viewportWidth < breakpoints.medium;
  const isMobile = viewportWidth < breakpoints.small;
  const disabled = activeNav === 'userSettings';

  let paymentVariant: Colors | undefined;
  let key: Colors;

  for (key in paymentStatusMap) {
    if (!current?.paymentStatus) {
      paymentVariant = undefined;
    } else if (paymentStatusMap[key].includes(current?.paymentStatus)) {
      paymentVariant = key;
    }
  }

  const paymentValues: Array<OrgPaymentLabel> = [
    OrgPaymentLabel.Suspended,
    OrgPaymentLabel.Locked,
    OrgPaymentLabel.AdminSuspended,
  ];

  let badgeItem: React.ReactElement | null = null;

  if (
    !isTablet &&
    !isOnPrem &&
    current?.paymentStatus &&
    paymentVariant &&
    (admin || paymentValues.includes(current.paymentStatus))
  ) {
    badgeItem = (
      <li>
        <Badge
          className={css`
            margin-right: 25px;
          `}
          variant={paymentVariant}
          data-testid="org-nav-payment-status"
        >
          {current.paymentStatus.split('_').join()}
        </Badge>
      </li>
    );
  }

  return (
    <nav
      className={navContainer}
      aria-label="organization navigation"
      data-testid="organization-nav"
    >
      <div className={leftSideContainer}>
        <Tooltip
          align="bottom"
          justify="start"
          variant="dark"
          trigger={
            <span>
              <LogoMark height={30} />
            </span>
          }
        >
          View the Organization Home
        </Tooltip>

        <OrgSelect
          className={cx(orgSelectContainer, { [disabledOrgSelect]: disabled })}
          data={data}
          current={current}
          constructOrganizationURL={constructOrganizationURL}
          urls={urls}
          onChange={onOrganizationChange}
          isActive={activeNav === 'orgSettings'}
          disabled={disabled}
          isOnPrem={isOnPrem}
        />
        {!disabled && (
          <ul className={ulContainer}>
            {badgeItem}

            {!isMobile && current && (
              <>
                <li
                  role="none"
                  className={css`
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  `}
                >
                  <OrgNavLink
                    href={orgNav.accessManager}
                    isActive={activeNav === 'accessManager'}
                    data-testid="org-nav-access-manager"
                  >
                    Access Manager
                  </OrgNavLink>

                  <Menu
                    open={accessManagerOpen}
                    setOpen={setAccessManagerOpen}
                    trigger={
                      <IconButton
                        ariaLabel="Dropdown"
                        active={accessManagerOpen}
                      >
                        <Icon
                          glyph={accessManagerOpen ? 'CaretUp' : 'CaretDown'}
                        />
                      </IconButton>
                    }
                    className={accessManagerMenuContainer}
                  >
                    <p className={accessManagerMenuItem}>
                      <strong>Organization Access:</strong> {current.orgName}
                    </p>

                    <p className={accessManagerMenuItem}>
                      <strong>Project Access:</strong>
                      {currentProjectName ?? 'None'}
                    </p>
                  </Menu>
                </li>

                <li role="none" className={supportContainer}>
                  <OrgNavLink
                    href={orgNav.support}
                    isActive={activeNav === 'support'}
                    data-testid="org-nav-support"
                  >
                    Support
                  </OrgNavLink>
                </li>

                {!isOnPrem && (
                  <li role="none">
                    <OrgNavLink
                      href={orgNav.billing}
                      isActive={activeNav === 'billing'}
                      data-testid="org-nav-billing"
                    >
                      Billing
                    </OrgNavLink>
                  </li>
                )}
              </>
            )}
          </ul>
        )}
      </div>
      <div>
        {isOnPrem && version && (
          <div className={versionStyle} data-testid="org-nav-on-prem-version">
            {version}
          </div>
        )}

        {!isMobile && (
          <OrgNavLink
            href={orgNav.allClusters}
            isActive={activeNav === 'allClusters'}
            className={rightLinkMargin}
            data-testid="org-nav-all-clusters-link"
          >
            All Clusters
          </OrgNavLink>
        )}

        {!isTablet && admin && !isOnPrem && (
          <OrgNavLink
            href={orgNav.admin}
            isActive={activeNav === 'admin'}
            className={rightLinkMargin}
            data-testid="org-nav-admin-link"
          >
            Admin
          </OrgNavLink>
        )}

        {isOnPrem ? (
          <div className={onPremMenuWrapper}>
            <UserMenuTrigger
              name={account.firstName}
              open={onPremMenuOpen}
              setOpen={setOnPremMenuOpen}
              data-testid="om-user-menu-trigger"
            />
            <Menu open={onPremMenuOpen} setOpen={setOnPremMenuOpen}>
              <MenuItem
                href={urls.onPrem.profile}
                data-testid="om-user-menuitem-profile"
              >
                Profile
              </MenuItem>
              {onPremMFA ? (
                <MenuItem
                  href={urls.onPrem.mfa}
                  data-testid="om-user-menuitem-mfa"
                >
                  Two-factor Authentication
                </MenuItem>
              ) : (
                <></> // Have to fix typing in Menu to allow for a non-React Element here
              )}
              <MenuItem
                href={urls.onPrem.personalization}
                data-testid="om-user-menuitem-personalization"
              >
                Personalization
              </MenuItem>
              <MenuItem
                href={urls.onPrem.invitations}
                data-testid="om-user-menuitem-invitations"
              >
                Invitations
              </MenuItem>
              <MenuItem
                href={urls.onPrem.organizations}
                data-testid="om-user-menuitem-organizations"
              >
                Organizations
              </MenuItem>
              <MenuItem
                href={urls.onPrem.featureRequest}
                data-testid="om-user-menuitem-feature-request"
              >
                Feature Request
              </MenuItem>
              <MenuItem
                onClick={onLogout}
                data-testid="om-user-menuitem-sign-out"
              >
                Sign Out
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <UserMenu
            account={account}
            activeProduct={activeProduct}
            urls={urls}
            hosts={hosts}
            onLogout={onLogout}
          />
        )}
      </div>
    </nav>
  );
}
