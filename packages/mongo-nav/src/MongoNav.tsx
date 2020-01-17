import React from 'react';
import OrgNav from './org-nav/index';
import ProjectNav from './project-nav/index';
import {
  DataInterface,
  Product,
  URLSInterface,
  HostsInterface,
  NavItem,
} from './types';

interface MongoNavInterface {
  activeProduct: Product;
  activeNav?: NavItem;
  admin?: boolean;
  data: DataInterface;
  onOrganizationChange: React.ChangeEventHandler;
  onProjectChange: React.ChangeEventHandler;
  constructOrganizationURL?: (orgID: string) => string;
  constructProjectURL?: (orgID: string, projID: string) => string;
  showProjNav?: boolean;
  hosts?: HostsInterface;
  urls?: URLSInterface;
}

export default function MongoNav({
  activeProduct,
  activeNav,
  admin = false,
  data,
  showProjNav = true,
  onOrganizationChange,
  onProjectChange,
  hosts,
  urls,
  constructOrganizationURL = orgId =>
    `https://cloud.mongodb.com/v2#/org/${orgId}/projects`,
  constructProjectURL = (orgId, projectId) =>
    `https://cloud.mongodb.com/v2#/${projectId}`,
}: MongoNavInterface) {
  const accountHost = hosts?.account ?? `https://account.mongodb.com`;
  const cloudHost = hosts?.cloud ?? `https://cloud.mongodb.com`;
  // @ts-ignore
  const chartsHost = hosts?.charts ?? `https://charts.mongodb.com`; //eslint-disable-line
  const universityHost = hosts?.university ?? `https://university.mongodb.com`;
  const supportHost = hosts?.support ?? `https://support.mongodb.com`;

  const constructedUrls = {
    mongoMenu: {
      cloud: {
        userPreferences:
          urls?.mongoMenu?.cloud?.userPreferences ??
          `${cloudHost}/v2#/preferences/personalization`,
        organizations:
          urls?.mongoMenu?.cloud?.organizations ??
          `${cloudHost}/v2#/preferences/organizations`,
        invitations:
          urls?.mongoMenu?.cloud?.invitations ??
          `${cloudHost}/v2#/preferences/invitations`,
        tfa: urls?.mongoMenu?.cloud?.tfa ?? `${cloudHost}/v2#/preferences/2fa`,
      },
      university: {
        videoPreferences:
          urls?.mongoMenu?.university?.videoPreferences ?? `${universityHost}`,
      },
      support: {
        userPreferences:
          urls?.mongoMenu?.support?.userPreferences ?? `${supportHost}/profile`,
      },
      account: {
        accountURL:
          urls?.mongoMenu?.account?.accountURL ??
          `${accountHost}/account/profile/overview`,
      },
    },
    mongoSelect: {
      viewAllProjects:
        urls?.mongoSelect?.viewAllProjects ??
        `${cloudHost}/v2#/org/${data.currentProject.orgId}/projects`,
      viewAllOrganizations:
        urls?.mongoSelect?.viewAllOrganizations ??
        `${cloudHost}/v2#/preferences/organizations`,
      newProject:
        urls?.mongoSelect?.newProject ??
        `${cloudHost}/v2#/org/${data.currentProject.orgId}/projects/create`,
      orgSettings:
        urls?.mongoSelect?.newProject ??
        `${cloudHost}/v2#/org/${data.currentOrganization.orgId}/settings/general`,
    },
    orgNav: {
      settings:
        urls?.orgNav?.settings ??
        `${cloudHost}/v2#/org/${data.currentOrganization.orgId}/settings/general`,
      accessManager:
        urls?.orgNav?.accessManager ??
        `${cloudHost}/v2#/org/${data.currentOrganization.orgId}/access/users`,
      support:
        urls?.orgNav?.support ??
        `${cloudHost}/v2#/org/${data.currentOrganization.orgId}/support`,
      billing:
        urls?.orgNav?.billing ??
        `${cloudHost}/v2#/org/${data.currentOrganization.orgId}/billing/overview`,
      allClusters: urls?.orgNav?.allClusters ?? `${cloudHost}/v2#/clusters`,
      admin:
        urls?.orgNav?.admin ?? `${cloudHost}/v2/admin#general/overview/servers`,
    },
    projectNav: {
      settings:
        urls?.projectNav?.settings ??
        `${cloudHost}/v2/${data.currentProject.projectId}#settings/groupSettings`,
      accessManager:
        urls?.projectNav?.accessManager ??
        `${cloudHost}/v2/${data.currentProject.projectId}#access`,
      support:
        urls?.projectNav?.support ??
        `${cloudHost}/v2/${data.currentProject.projectId}#info/support`,
      integrations:
        urls?.projectNav?.integrations ??
        `${cloudHost}/v2/${data.currentProject.projectId}#integrations`,
      alerts:
        urls?.projectNav?.alerts ??
        `${cloudHost}/v2/${data.currentProject.projectId}#alerts`,
      activityFeed:
        urls?.projectNav?.activityFeed ??
        `${cloudHost}/v2/${data.currentProject.projectId}#activity`,
    },
  };

  return (
    <>
      <OrgNav
        account={data.account}
        activeProduct={activeProduct}
        current={data.currentOrganization}
        data={data.organizations}
        constructOrganizationURL={constructOrganizationURL}
        urls={constructedUrls}
        activeNav={activeNav}
        onOrganizationChange={onOrganizationChange}
        admin={admin}
      />
      {showProjNav && (
        <ProjectNav
          activeProduct={activeProduct}
          current={data.currentProject}
          data={data.projects}
          constructProjectURL={constructProjectURL}
          urls={constructedUrls}
          alerts={data.currentProject.alertsOpen}
          onProjectChange={onProjectChange}
        />
      )}
    </>
  );
}
