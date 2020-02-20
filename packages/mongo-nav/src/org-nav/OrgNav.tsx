import React, { useState } from 'react';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { LogoMark } from '@leafygreen-ui/logo';
import { useViewportSize } from '@leafygreen-ui/hooks';
import Tooltip from '@leafygreen-ui/tooltip';
import Badge from '@leafygreen-ui/badge';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import { Menu } from '@leafygreen-ui/menu';
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
} from '../types';

import { OrgSelect } from '../mongo-select/index';
import UserMenu from '../user-menu/index';

const navContainer = css`
  height: 60px;
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

const ulContainer = css`
  list-style: none;
  display: flex;
  align-items: center;
  padding-inline-start: 0px;
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

export const Colors = {
  Lightgray: 'lightgray',
  Green: 'green',
  Yellow: 'yellow',
  Red: 'red',
} as const;

export type Colors = typeof Colors[keyof typeof Colors];

const paymentStatusMap: { readonly [K in Colors]: Array<string> } = {
  [Colors.Lightgray]: ['embargoed', 'embargo confirmed'],
  [Colors.Green]: ['ok'],
  [Colors.Yellow]: ['warning', 'suspended', 'closing'],
  [Colors.Red]: ['dead', 'locked', 'closed'],
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
}: OrgNav) {
  const [open, setOpen] = useState(false);
  const { orgNav } = urls;
  const { width: viewportWidth } = useViewportSize();
  const isTablet = viewportWidth < breakpoints.medium;
  const isMobile = viewportWidth < breakpoints.small;

  let paymentVariant: Colors | undefined;
  let key: Colors;

  for (key in paymentStatusMap) {
    if (!current?.paymentStatus) {
      paymentVariant = undefined;
    } else if (paymentStatusMap[key].includes(current?.paymentStatus)) {
      paymentVariant = key;
    }
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
          data={data}
          current={current}
          constructOrganizationURL={constructOrganizationURL}
          urls={urls}
          onChange={onOrganizationChange}
          isActive={activeNav === 'orgSettings'}
        />

        <ul className={ulContainer}>
          {!isTablet && paymentVariant && current?.paymentStatus && (
            <li>
              <Badge
                className={css`
                  margin-right: 25px;
                `}
                variant={paymentVariant}
              >
                {current.paymentStatus.toUpperCase()}
              </Badge>
            </li>
          )}
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
                >
                  Access Manager
                </OrgNavLink>

                <Menu
                  open={open}
                  setOpen={setOpen}
                  trigger={
                    <IconButton ariaLabel="Dropdown" active={open}>
                      <Icon glyph={open ? 'CaretUp' : 'CaretDown'} />
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
                >
                  Support
                </OrgNavLink>
              </li>

              <li role="none">
                <OrgNavLink
                  href={orgNav.billing}
                  isActive={activeNav === 'billing'}
                >
                  Billing
                </OrgNavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      <div>
        {!isMobile && (
          <OrgNavLink
            href={orgNav.allClusters}
            isActive={activeNav === 'allClusters'}
            className={rightLinkMargin}
          >
            All Clusters
          </OrgNavLink>
        )}

        {!isTablet && admin && (
          <OrgNavLink
            href={orgNav.admin}
            isActive={activeNav === 'admin'}
            className={rightLinkMargin}
          >
            Admin
          </OrgNavLink>
        )}

        <UserMenu
          account={account}
          activeProduct={activeProduct}
          urls={urls}
          hosts={hosts}
        />
      </div>
    </nav>
  );
}
