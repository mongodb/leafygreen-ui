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

const flexContainer = css`
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
  account?: AccountInterface;
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

  return (
    <nav
      className={navContainer}
      aria-label="organization navigation"
      data-testid="organization-nav"
    >
      <div className={flexContainer}>
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
          loading={!current}
          isOnPrem={isOnPrem}
        />
        {!disabled && (
          <ul className={ulContainer}>
            {!isTablet &&
              !isOnPrem &&
              current?.paymentStatus &&
              paymentVariant &&
              (admin || paymentValues.includes(current.paymentStatus)) && (
                <li>
                  <Badge
                    className={css`
                      margin-right: 25px;
                    `}
                    variant={paymentVariant}
                    data-testid="org-payment-status"
                  >
                    {current.paymentStatus.split('_').join()}
                  </Badge>
                </li>
              )}

            {!isMobile && (
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
                    href={current && orgNav.accessManager}
                    isActive={activeNav === 'accessManager'}
                    data-testid="org-access-manager"
                    loading={!current}
                  >
                    Access Manager
                  </OrgNavLink>

                  <IconButton
                    ariaLabel="Dropdown"
                    active={accessManagerOpen}
                    disabled={!current}
                  >
                    <Icon glyph={accessManagerOpen ? 'CaretUp' : 'CaretDown'} />
                    {current && (
                      <Menu
                        open={accessManagerOpen}
                        setOpen={setAccessManagerOpen}
                        className={accessManagerMenuContainer}
                      >
                        <p className={accessManagerMenuItem}>
                          <strong>Organization Access:</strong>{' '}
                          {current.orgName}
                        </p>

                        <p className={accessManagerMenuItem}>
                          <strong>Project Access:</strong>
                          {currentProjectName ?? 'None'}
                        </p>
                      </Menu>
                    )}
                  </IconButton>
                </li>

                <li role="none" className={supportContainer}>
                  <OrgNavLink
                    href={current && orgNav.support}
                    isActive={activeNav === 'support'}
                    data-testid="org-support"
                    loading={!current}
                  >
                    Support
                  </OrgNavLink>
                </li>

                {!isOnPrem && (
                  <li role="none">
                    <OrgNavLink
                      href={current && orgNav.billing}
                      isActive={activeNav === 'billing'}
                      data-testid="org-billing"
                      loading={!current}
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
      <div className={flexContainer}>
        {isOnPrem && version && (
          <div className={versionStyle} data-testid="onPrem-version">
            {version}
          </div>
        )}

        {!isMobile && (
          <OrgNavLink
            href={orgNav.allClusters}
            isActive={activeNav === 'allClusters'}
            className={rightLinkMargin}
            data-testid="all-clusters-link"
          >
            All Clusters
          </OrgNavLink>
        )}

        {!isTablet && admin && !isOnPrem && (
          <OrgNavLink
            href={orgNav.admin}
            isActive={activeNav === 'admin'}
            className={rightLinkMargin}
            data-testid="admin-link"
          >
            Admin
          </OrgNavLink>
        )}

        {isOnPrem ? (
          <div className={onPremMenuWrapper}>
            <UserMenuTrigger
              name={account?.firstName ?? ''}
              open={onPremMenuOpen}
              setOpen={setOnPremMenuOpen}
            />
            <Menu open={onPremMenuOpen} setOpen={setOnPremMenuOpen}>
              <MenuItem href={urls.onPrem.profile}>Profile</MenuItem>
              <MenuItem href={urls.onPrem.mfa}>
                Two-factor Authentication
              </MenuItem>
              <MenuItem href={urls.onPrem.personalization}>
                Personalization
              </MenuItem>
              <MenuItem href={urls.onPrem.invitations}>Invitations</MenuItem>
              <MenuItem href={urls.onPrem.organizations}>
                Organizations
              </MenuItem>
              <MenuItem href={urls.onPrem.featureRequest}>
                Feature Request
              </MenuItem>
              <MenuItem onClick={onLogout}>Sign Out</MenuItem>
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
