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
   * Data passed to create MongoNav
   */
  data: DataInterface;

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
}

/**
 * # MongoNav
 *
 * MongoNav component
 *
 * ```
<MongoNav
  data={data}
  activeProduct="cloud"
  activeNav="accessManager"
  onOrganizationChange={onOrganizationChange}
  onProjectChange={onProjectChange}
  admin={true}
/>
```
 * @param props.activeProduct Describes what product is currently active.
 * @param props.activeNav Determines what nav item is currently active.
 * @param props.data  Data passed to create MongoNav.
 * @param props.hosts Object where keys are MDB products and values are the desired hostURL override for that product, to enable `<MongoNav />` to work across all environments.
 * @param props.onOrganizationChange Callback invoked when user types into organization picker.
 * @param props.onProjectChange Callback invoked when user types into project picker.
 * @param props.urls Object to enable custom overrides for every `href` used in `<MongoNav />`.
 * @param props.showProjectNav Determines whether the project navigation should be shown.
 * @param props.admin Describes whether or not user is an `admin`.
 * @param props.constructOrganizationURL Function to determine destination URL when user selects a organization from the organization picker.
 * @param props.constructProjectURL Function to determine destination URL when user selects a project from the project picker.
 */
export default function MongoNav({
  activeProduct,
  activeNav,
  data,
  hosts,
  onOrganizationChange,
  onProjectChange,
  urls,
  showProjNav = true,
  admin = false,
  constructOrganizationURL: constructOrganizationURLProp,
  constructProjectURL: constructProjectURLProp,
}: MongoNavInterface) {
  const accountHost = hosts?.account ?? `https://account.mongodb.com`;
  const cloudHost = hosts?.cloud ?? `https://cloud.mongodb.com`;
  const universityHost = hosts?.university ?? `https://university.mongodb.com`;
  const supportHost = hosts?.support ?? `https://support.mongodb.com`;

  const defaultOrgURL = (orgId: string) =>
    `${cloudHost}/v2#/org/${orgId}/projects`;
  const constructOrganizationURL =
    constructOrganizationURLProp ?? defaultOrgURL;

  const defaultProjectURL = (projectId: string) =>
    `${cloudHost}/v2#/${projectId}`;
  const constructProjectURL = constructProjectURLProp ?? defaultProjectURL;

  const constructedUrls: Required<URLSInterface> = {
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
        mfa: urls?.mongoMenu?.cloud?.mfa ?? `${cloudHost}/v2#/preferences/2fa`,
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
        homepage:
          urls?.mongoMenu?.account?.homepage ??
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
        hosts={hosts}
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
          hosts={hosts}
        />
      )}
    </>
  );
}
