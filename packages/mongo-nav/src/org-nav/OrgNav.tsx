import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { LogoMark } from '@leafygreen-ui/logo';
import MongoMenu from '@leafygreen-ui/mongo-menu';
import Tooltip from '@leafygreen-ui/tooltip';

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
  width: 180px;
  border: 1px solid black;
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
  user: { firstName: string; lastName: string; email: string; userID: string };
  activeProduct: 'cloud' | 'university' | 'support';
  overrides?: {
    urls?: {
      mongomenu?: {
        cloud?: { [key: string]: string };
        university?: { [key: string]: string };
        support?: { [key: string]: string };
      };
      mongoSelect?: {
        viewAllProjects?: string;
        viewAllOrganizations?: string;
        newProject?: string;
      };
    };
    hosts?: {
      cloud?: string;
      university?: string;
      support?: string;
      realm?: string;
      charts?: string;
    };
  };
}

export default function OrgNav({
  user,
  activeProduct,
  overrides = {
    hosts: {},
    urls: {},
  },
}: OrgNav) {
  const { hosts, urls } = overrides;
  const baseURL = `${window.location.href.split('/')[0]}/v2#/org/${
    user.userID
  }`;

  return (
    <nav className={navContainer}>
      <div className={leftSideContainer}>
        <LogoMark height={30} />
        <span className={orgSelectContainer}>org select</span>
        <ul className={ulContainer}>
          <li role="none">
            <Tooltip
              align="bottom"
              justify="middle"
              variant="dark"
              trigger={
                <a href={`${baseURL}#access`} className={linkText}>
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
                <a href={`${baseURL}#info/support`} className={linkText}>
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
                <a href={`${baseURL}/billing/overview`} className={linkText}>
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
        user={{ name: 'Brooke', email: 'brooke@brooke.com' }}
        activeProduct={'support'}
      />
    </nav>
  );
}
