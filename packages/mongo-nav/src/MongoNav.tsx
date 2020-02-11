import React from 'react';
import OrgNav from './org-nav/index';
import ProjectNav from './project-nav/index';
import { Product, URLSInterface, HostsInterface, NavItem, Mode } from './types';
import devModeData from './data';
import defaultsDeep from 'lodash/defaultsDeep';

const defaultHosts: Required<HostsInterface> = {
  account: 'https://account.mongodb.com',
  cloud: 'https://cloud.mongodb.com',
  university: 'https://university.mongodb.com',
  support: 'https://support.mongodb.com',
  charts: 'https://charts.mongodb.com',
  stitch: 'https://stitch.mongodb.com',
};

interface MongoNavInterface {
  /**
   * Describes what product is currently active
   */
  activeProduct: Product;

  /**
   * Determines what nav item is currently active
   */
  activeNav?: NavItem;

  /**
   * Describes whether or not user is an `admin`
   */
  admin?: boolean;

  /**
   * Callback invoked when user types into organization picker
   */
  onOrganizationChange: React.ChangeEventHandler;

  /**
   * Callback invoked when user types into project picker
   */
  onProjectChange: React.ChangeEventHandler;

  /**
   *  Function to determine destination URL when user selects a organization from the organization picker
   */
  constructOrganizationURL?: (orgID: string) => string;

  /**
   *  Function to determine destination URL when user selects a project from the project picker
   */
  constructProjectURL?: (orgID: string, projID: string) => string;

  /**
   * Determines whether the project navigation should be shown
   */
  showProjNav?: boolean;

  /**
   * Object where keys are MDB products and values are the desired hostURL override for that product, to enable `<MongoNav />` to work across all environments
   */
  hosts?: HostsInterface;

  /**
   * Object to enable custom overrides for every `href` used in `<MongoNav />`.
   */
  urls?: URLSInterface;

  /**
   * Describes what environment the component is being used in
   * By default the value is set to `production`
   */
  mode?: Mode;
}

/**
 * # MongoNav
 *
 * MongoNav component
 *
 * ```
<MongoNav
  mode='dev'
  activeProduct="cloud"
  activeNav="accessManager"
  onOrganizationChange={onOrganizationChange}
  onProjectChange={onProjectChange}
  admin={true}
/>
```
 * @param props.activeProduct Describes what product is currently active.
 * @param props.activeNav Determines what nav item is currently active.
 * @param props.hosts Object where keys are MDB products and values are the desired hostURL override for that product, to enable `<MongoNav />` to work across all environments.
 * @param props.onOrganizationChange Callback invoked when user types into organization picker.
 * @param props.onProjectChange Callback invoked when user types into project picker.
 * @param props.urls Object to enable custom overrides for every `href` used in `<MongoNav />`.
 * @param props.showProjectNav Determines whether the project navigation should be shown.
 * @param props.admin Describes whether or not user is an `admin`.
 * @param props.constructOrganizationURL Function to determine destination URL when user selects a organization from the organization picker.
 * @param props.constructProjectURL Function to determine destination URL when user selects a project from the project picker.
 * @param props.mode Describes what environment the component is being used in, defaults to `production`
 */
export default function MongoNav({
  activeProduct,
  activeNav,
  onOrganizationChange,
  onProjectChange,
  mode = Mode.Production,
  showProjNav = true,
  admin = false,
  hosts: hostsProp,
  urls: urlsProp,
  constructOrganizationURL: constructOrganizationURLProp,
  constructProjectURL: constructProjectURLProp,
}: MongoNavInterface) {
  let data;

  if (mode === Mode.Dev) {
    data = devModeData;
  }

  if (!data) {
    // Eventually this logic will be more robust, but for an alpha version will return null without data
    return null;
  }

  const {
    account,
    currentOrganization,
    currentProject,
    organizations,
    projects,
  } = data;

  const hosts = defaultsDeep(hostsProp, defaultHosts);

  const defaultURLS: Required<URLSInterface> = {
    userMenu: {
      cloud: {
        userPreferences: `${hosts.cloud}/v2#/preferences/personalization`,
        organizations: `${hosts.cloud}/v2#/preferences/organizations`,
        invitations: `${hosts.cloud}/v2#/preferences/invitations`,
        mfa: `${hosts.cloud}/v2#/preferences/2fa`,
      },
      university: {
        videoPreferences: `${hosts.university}`,
      },
      support: {
        userPreferences: `${hosts.support}/profile`,
      },
      account: {
        homepage: `${hosts.account}/account/profile/overview`,
      },
    },
    mongoSelect: {
      viewAllProjects: `${hosts.cloud}/v2#/org/${data.currentProject.orgId}/projects`,
      viewAllOrganizations: `${hosts.cloud}/v2#/preferences/organizations`,
      newProject: `${hosts.cloud}/v2#/org/${data.currentProject.orgId}/projects/create`,
      orgSettings: `${hosts.cloud}/v2#/org/${data.currentOrganization.orgId}/settings/general`,
    },
    orgNav: {
      settings: `${hosts.cloud}/v2#/org/${data.currentOrganization.orgId}/settings/general`,
      accessManager: `${hosts.cloud}/v2#/org/${data.currentOrganization.orgId}/access/users`,
      support: `${hosts.cloud}/v2#/org/${data.currentOrganization.orgId}/support`,
      billing: `${hosts.cloud}/v2#/org/${data.currentOrganization.orgId}/billing/overview`,
      allClusters: `${hosts.cloud}/v2#/clusters`,
      admin: `${hosts.cloud}/v2/admin#general/overview/servers`,
    },
    projectNav: {
      settings: `${hosts.cloud}/v2/${data.currentProject.projectId}#settings/groupSettings`,
      accessManager: `${hosts.cloud}/v2/${data.currentProject.projectId}#access`,
      support: `${hosts.cloud}/v2/${data.currentProject.projectId}#info/support`,
      integrations: `${hosts.cloud}/v2/${data.currentProject.projectId}#integrations`,
      alerts: `${hosts.cloud}/v2/${data.currentProject.projectId}#alerts`,
      activityFeed: `${hosts.cloud}/v2/${data.currentProject.projectId}#activity`,
    },
  };

  const constructedURLS = defaultsDeep(urlsProp, defaultURLS);

  const defaultOrgURL = (orgId: string) =>
    `${hosts.cloud}/v2#/org/${orgId}/projects`;
  const constructOrganizationURL =
    constructOrganizationURLProp != null ? constructOrganizationURLProp : defaultOrgURL;

  const defaultProjectURL = (projectId: string) =>
    `${hosts.cloud}/v2#/${projectId}`;
  const constructProjectURL = constructProjectURLProp != null ? constructProjectURLProp : defaultProjectURL;

  return (
    <>
      <OrgNav
        account={account}
        activeProduct={activeProduct}
        current={currentOrganization}
        data={organizations}
        constructOrganizationURL={constructOrganizationURL}
        urls={constructedURLS}
        activeNav={activeNav}
        onOrganizationChange={onOrganizationChange}
        admin={admin}
        hosts={hosts}
      />
      {showProjNav && (
        <ProjectNav
          activeProduct={activeProduct}
          current={currentProject}
          data={projects}
          constructProjectURL={constructProjectURL}
          urls={constructedURLS}
          alerts={currentProject.alertsOpen}
          onProjectChange={onProjectChange}
          hosts={hosts}
        />
      )}
    </>
  );
}
