import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { LogoMark } from '@leafygreen-ui/logo';
import Tooltip from '@leafygreen-ui/tooltip';
import Badge from '@leafygreen-ui/badge';
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

const linkText = css`
  text-decoration: none;
  color: ${uiColors.gray.dark3};

  &:focus,
  &:hover {
    text-decoration: none;
    color: ${uiColors.gray.dark3};
  }
`;

const activeLink = css`
  font-weight: bold;
  color: ${uiColors.green.base};
`;

const supportContainer = css`
  margin-left: 30px;
  margin-right: 30px;
`;

const rightSideLinkStyle = css`
  margin-right: 30px;
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
}: OrgNav) {
  const { orgNav } = urls;
  const disabled = activeNav === 'preferences';

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
        <LogoMark height={30} />

        <OrgSelect
          className={cx(orgSelectContainer, { [disabledOrgSelect]: disabled })}
          data={data}
          current={current}
          constructOrganizationURL={constructOrganizationURL}
          urls={urls}
          onChange={onOrganizationChange}
          isActive={activeNav === 'orgSettings'}
          disabled={disabled}
        />

        {!disabled && (
          <ul className={ulContainer}>
            {paymentVariant && current?.paymentStatus && (
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
            {current && (
              <>
                <li role="none">
                  <Tooltip
                    align="bottom"
                    justify="middle"
                    variant="dark"
                    trigger={
                      <a
                        href={orgNav.accessManager}
                        className={cx(linkText, {
                          [activeLink]: activeNav === 'accessManager',
                        })}
                      >
                        Access Manager
                      </a>
                    }
                  >
                    Organization Access Manager
                  </Tooltip>
                </li>
                <li role="none" className={supportContainer}>
                  <Tooltip
                    align="bottom"
                    justify="middle"
                    variant="dark"
                    trigger={
                      <a
                        href={orgNav.support}
                        className={cx(linkText, {
                          [activeLink]: activeNav === 'support',
                        })}
                      >
                        Support
                      </a>
                    }
                  >
                    Organization Support
                  </Tooltip>
                </li>
                <li role="none">
                  <Tooltip
                    align="bottom"
                    justify="middle"
                    variant="dark"
                    trigger={
                      <a
                        href={orgNav.billing}
                        className={cx(linkText, {
                          [activeLink]: activeNav === 'billing',
                        })}
                      >
                        Billing
                      </a>
                    }
                  >
                    Billing
                  </Tooltip>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
      <div>
        <Tooltip
          align="bottom"
          justify="middle"
          variant="dark"
          trigger={
            <a
              href={orgNav.allClusters}
              className={cx(rightSideLinkStyle, linkText, {
                [activeLink]: activeNav === 'allClusters',
              })}
            >
              All Clusters
            </a>
          }
        >
          View all clusters across your organizations
        </Tooltip>

        {admin && (
          <a
            href={orgNav.admin}
            className={cx(rightSideLinkStyle, linkText, {
              [activeLink]: activeNav === 'admin',
            })}
          >
            Admin
          </a>
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
