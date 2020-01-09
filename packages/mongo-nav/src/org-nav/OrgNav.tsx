import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { LogoMark } from '@leafygreen-ui/logo';
import Tooltip from '@leafygreen-ui/tooltip';
import {
  AccountInterface,
  OrganizationInterface,
  Product,
  OverridesInterface,
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
  current: OrganizationInterface;
  data: Array<OrganizationInterface>;
  constructOrganizationURL: (orgID: string) => string;
  overrides?: OverridesInterface;
}

export default function OrgNav({
  account,
  activeProduct,
  current,
  data,
  constructOrganizationURL,
  overrides = {
    hosts: {},
    urls: {},
  },
}: OrgNav) {
  const { urls, hosts } = overrides;
  const baseURL = hosts?.cloud ?? `https://cloud.mongodb.com`;

  return (
    <nav className={navContainer}>
      <div className={leftSideContainer}>
        <LogoMark height={30} />
        <MongoSelect
          className={orgSelectContainer}
          data={data}
          current={current}
          constructOrganizationURL={constructOrganizationURL}
          variant="organization"
          overrides={overrides}
        />
        <ul className={ulContainer}>
          <li role="none">
            <Tooltip
              align="bottom"
              justify="middle"
              variant="dark"
              trigger={
                <a
                  href={
                    urls?.orgNav?.accessManager ??
                    `${baseURL}/${current.orgId}#access`
                  }
                  className={linkText}
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
                    `${baseURL}/${current.orgId}#info/support`
                  }
                  className={linkText}
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
                  href={urls?.orgNav?.billing ?? `${baseURL}/billing/overview`}
                  className={linkText}
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
