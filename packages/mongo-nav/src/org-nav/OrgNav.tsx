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
  OverridesInterface,
  NavItem,
  CurrentOrganizationInterface,
} from '../types';

import MongoSelect from '../mongo-select/index';
import MongoMenu from '../mongo-menu/index';

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
`;

const leftSideContainer = css`
  display: flex;
  align-items: center;
`;

const orgSelectContainer = css`
  margin-left: 20px;
  margin-right: 30px;
`;

const ulContainer = css`
  list-style: none;
  display: flex;
  align-items: center;
  padding-inline-start: 0px;
`;

const linkText = css`
  text-decoration: none;
  color: ${uiColors.gray.dark3};
`;

const activeLink = css`
  font-weight: bold;
  color: ${uiColors.green.base};
`;

const supportContainer = css`
  margin-left: 30px;
  margin-right: 30px;
`;

interface OrgNav {
  account: AccountInterface;
  activeProduct: Product;
  current: CurrentOrganizationInterface;
  data: Array<OrganizationInterface>;
  constructOrganizationURL: (orgID: string) => string;
  overrides?: OverridesInterface;
  activeNav?: NavItem;
  onOrganizationChange?: React.ChangeEventHandler;
}

export default function OrgNav({
  account,
  activeNav,
  activeProduct,
  current,
  data,
  constructOrganizationURL,
  onOrganizationChange,
  overrides = {
    hosts: {},
    urls: {},
  },
}: OrgNav) {
  const { urls, hosts } = overrides;
  const baseURL = hosts?.cloud ?? `https://cloud.mongodb.com`;

  const paymentStatusMap = {
    lightgray: ['embargoed', 'embargo confirmed'],
    green: ['ok'],
    yellow: ['warning', 'suspended', 'closing'],
    red: ['dead', 'locked', 'closed'],
  };

  let variant: string;

  for (const key in paymentStatusMap) {
    if (paymentStatusMap[key].includes(current.paymentStatus)) {
      variant = key;
    }
  }

  return (
    <nav className={navContainer} aria-label="organization navigation">
      <div className={leftSideContainer}>
        <LogoMark height={30} />
        <MongoSelect
          className={orgSelectContainer}
          data={data}
          current={current}
          constructOrganizationURL={constructOrganizationURL}
          variant="organization"
          overrides={overrides}
          onChange={onOrganizationChange}
        />
        <ul className={ulContainer}>
          {current.paymentStatus && (
            <li>
              <Badge
                className={css`
                  margin-right: 25px;
                `}
                variant={variant}
              >
                {current.paymentStatus.toUpperCase()}
              </Badge>
            </li>
          )}
          <li role="none">
            <Tooltip
              align="bottom"
              justify="middle"
              variant="dark"
              trigger={
                <a
                  href={
                    urls?.orgNav?.accessManager ??
                    `${baseURL}/v2#/org/${current.orgId}/access/users`
                  }
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
                  href={
                    urls?.orgNav?.support ??
                    `${baseURL}/v2#/org/${current.orgId}/support`
                  }
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
                  href={
                    urls?.orgNav?.billing ??
                    `${baseURL}/v2#/org/${current.orgId}/billing/overview`
                  }
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
        </ul>
      </div>
      <MongoMenu
        account={account}
        activeProduct={activeProduct}
        overrides={overrides}
      />
    </nav>
  );
}
