import React, { useState } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { LogoMark } from '@leafygreen-ui/logo';
import { useViewportSize } from '@leafygreen-ui/hooks';
import Tooltip from '@leafygreen-ui/tooltip';
import Badge from '@leafygreen-ui/badge';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { Menu } from '@leafygreen-ui/menu';
import { OrgNavLink, OnPremUserMenu } from '../helpers/index';
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
import UserMenu from '../user-menu/index';

export const orgNavHeight = 60;

const navContainer = css`
  height: ${orgNavHeight}px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 13px;
  line-height: 15px;
  color: ${uiColors.gray.dark3};
  border-bottom: 1px solid ${uiColors.gray.light2};
  box-sizing: border-box;
`;

const orgSelectContainer = css`
  margin-left: 20px;
  margin-right: 20px;
`;

const disabledOrgSelect = css`
  cursor: default;
  pointer-events: none;
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
  onLogout?: React.MouseEventHandler;
  onPremEnabled?: boolean;
  onPremVersion?: string;
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
  onLogout,
  onPremEnabled,
  onPremVersion,
  onPremMFA = false,
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
    !onPremEnabled &&
    current?.paymentStatus &&
    paymentVariant &&
    (admin || paymentValues.includes(current.paymentStatus))
  ) {
    const badgeMargin = css`
      margin-right: 25px;
    `;

    badgeItem = (
      <Badge
        className={badgeMargin}
        variant={paymentVariant}
        data-testid="org-nav-payment-status"
      >
        {current.paymentStatus.split('_').join()}
      </Badge>
    );
  }

  const renderedUserMenu = onPremEnabled ? (
    <OnPremUserMenu
      onLogout={onLogout}
      name={account?.firstName ?? ''}
      open={onPremMenuOpen}
      setOpen={setOnPremMenuOpen}
      urls={urls}
      mfa={onPremMFA}
    />
  ) : (
    <UserMenu
      account={account}
      activeProduct={activeProduct}
      urls={urls}
      hosts={hosts}
      onLogout={onLogout}
    />
  );

  return (
    <nav
      className={navContainer}
      aria-label="organization navigation"
      data-testid="organization-nav"
    >
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
        disabled={disabled}
        isOnPrem={onPremEnabled}
      />

      {!disabled && (
        <>
          {badgeItem}

          {!isMobile && (
            <>
              <OrgNavLink
                href={current && orgNav.accessManager}
                isActive={activeNav === 'accessManager'}
                loading={!current}
                data-testid="org-nav-access-manager"
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
                      <strong>Organization Access:</strong> {current.orgName}
                    </p>

                    <p className={accessManagerMenuItem}>
                      <strong>Project Access:</strong>
                      {currentProjectName ?? 'None'}
                    </p>
                  </Menu>
                )}
              </IconButton>

              <OrgNavLink
                href={current && orgNav.support}
                isActive={activeNav === 'support'}
                loading={!current}
                className={supportContainer}
                data-testid="org-nav-support"
              >
                Support
              </OrgNavLink>

              {!onPremEnabled && (
                <OrgNavLink
                  href={current && orgNav.billing}
                  isActive={activeNav === 'billing'}
                  loading={!current}
                  data-testid="org-nav-billing"
                >
                  Billing
                </OrgNavLink>
              )}
            </>
          )}
        </>
      )}

      <div
        className={css`
          margin-left: auto;
        `}
      >
        {onPremEnabled && onPremVersion && (
          <span className={versionStyle} data-testid="org-nav-on-prem-version">
            {onPremVersion}
          </span>
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

        {!isTablet && admin && !onPremEnabled && (
          <OrgNavLink
            href={orgNav.admin}
            isActive={activeNav === 'admin'}
            className={rightLinkMargin}
            data-testid="org-nav-admin-link"
          >
            Admin
          </OrgNavLink>
        )}
      </div>

      {renderedUserMenu}
    </nav>
  );
}
