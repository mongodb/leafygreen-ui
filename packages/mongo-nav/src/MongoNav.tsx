import React, { useEffect } from 'react';
import OrgNav from './org-nav/index';
import ProjectNav from './project-nav/index';
import Loading from './Loading';
import {
  Product,
  URLSInterface,
  HostsInterface,
  NavItem,
  Mode,
  DataInterface,
  ErrorCode,
} from './types';
import fixtureData from './data';

const ErrorCodeMap = {
  401: ErrorCode.NO_AUTHORIZATION,
};

export interface MongoNavInterface {
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

  /**
   * Function that is passed an error code, so that consuming application can handle fetch failures
   */
  onError?: (error: ErrorCode) => void;

  /**
   * Callback that receives the response of the fetched data
   */
  onSuccess?: (response: DataInterface) => void;
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
 * @param props.onSuccess Callback that receives the response of the fetched data
 * @param props.onError Function that is passed an error code, so that consuming application can handle fetch failures
 */
export default function MongoNav({
  activeProduct,
  activeNav,
  hosts,
  onOrganizationChange,
  onProjectChange,
  urls,
  mode = Mode.Production,
  showProjNav = true,
  admin = false,
  constructOrganizationURL: constructOrganizationURLProp,
  constructProjectURL: constructProjectURLProp,
  onError = () => {},
  onSuccess = () => {},
}: MongoNavInterface) {
  const [data, setData] = React.useState<DataInterface | undefined>(undefined);

  const accountHost = hosts?.account ?? `https://account.mongodb.com`;
  const cloudHost = hosts?.cloud ?? `https://cloud.mongodb.com`;
  const universityHost = hosts?.university ?? `https://university.mongodb.com`;
  const supportHost = hosts?.support ?? `https://support.mongodb.com`;

  const endpointURI = `${cloudHost}/user/shared`;

  function getProductionData() {
    return fetch(endpointURI, {
      credentials: 'include',
      method: 'GET',
      mode: 'cors',
    });
  }

  function getFixtureData() {
    return new Promise(resolve => {
      setTimeout(() => {
        onSuccess?.(fixtureData);

        resolve(fixtureData);
      }, 10);
    });
  }

  async function handleResponse(response: Response) {
    const { ok, status } = response;

    if (ok) {
      const data = await response.json();
      setData(data);
      onSuccess?.(data);
    } else {
      onError?.(ErrorCodeMap[status as 401]); //typecasting for now until we have more types to handle
      console.error(ErrorCodeMap[status as 401]);
    }
  }

  useEffect(() => {
    if (mode === Mode.Dev) {
      getFixtureData().then(data => setData(data as DataInterface));
    } else {
      getProductionData()
        .then(handleResponse)
        .catch(console.error);
    }
  }, [mode, endpointURI]);

  if (data?.account == null) {
    // Eventually this logic will be more robust, but for this version we will return the placeholder <Loading /> component
    return <Loading />;
  }

  const {
    account,
    currentOrganization,
    currentProject,
    organizations,
    projects,
  } = data;

  const sanitizedHosts: Required<HostsInterface> = {
    account: accountHost,
    cloud: cloudHost,
    university: universityHost,
    support: supportHost,
    charts: hosts?.charts ?? `https://charts.mongodb.com`,
    stitch: hosts?.stitch ?? `https://stitch.mongodb.com`,
  };

  const defaultOrgURL = (orgId: string) =>
    `${cloudHost}/v2#/org/${orgId}/projects`;
  const constructOrganizationURL =
    constructOrganizationURLProp ?? defaultOrgURL;

  const defaultProjectURL = (projectId: string) =>
    `${cloudHost}/v2#/${projectId}`;
  const constructProjectURL = constructProjectURLProp ?? defaultProjectURL;

  const constructedURLs: Required<URLSInterface> = {
    userMenu: {
      cloud: {
        userPreferences:
          urls?.userMenu?.cloud?.userPreferences ??
          `${cloudHost}/v2#/preferences/personalization`,
        organizations:
          urls?.userMenu?.cloud?.organizations ??
          `${cloudHost}/v2#/preferences/organizations`,
        invitations:
          urls?.userMenu?.cloud?.invitations ??
          `${cloudHost}/v2#/preferences/invitations`,
        mfa: urls?.userMenu?.cloud?.mfa ?? `${cloudHost}/v2#/preferences/2fa`,
      },
      university: {
        videoPreferences:
          urls?.userMenu?.university?.videoPreferences ?? `${universityHost}`,
      },
      support: {
        userPreferences:
          urls?.userMenu?.support?.userPreferences ?? `${supportHost}/profile`,
      },
      account: {
        homepage:
          urls?.userMenu?.account?.homepage ??
          `${accountHost}/account/profile/overview`,
      },
    },
    mongoSelect: {
      viewAllProjects:
        urls?.mongoSelect?.viewAllProjects ??
        `${cloudHost}/v2#/org/${data.currentProject?.orgId}/projects`,
      viewAllOrganizations:
        urls?.mongoSelect?.viewAllOrganizations ??
        `${cloudHost}/v2#/preferences/organizations`,
      newProject:
        urls?.mongoSelect?.newProject ??
        `${cloudHost}/v2#/org/${data.currentProject?.orgId}/projects/create`,
      orgSettings:
        urls?.mongoSelect?.newProject ??
        `${cloudHost}/v2#/org/${data.currentOrganization?.orgId}/settings/general`,
    },
    orgNav: {
      settings:
        urls?.orgNav?.settings ??
        `${cloudHost}/v2#/org/${data.currentOrganization?.orgId}/settings/general`,
      accessManager:
        urls?.orgNav?.accessManager ??
        `${cloudHost}/v2#/org/${data.currentOrganization?.orgId}/access/users`,
      support:
        urls?.orgNav?.support ??
        `${cloudHost}/v2#/org/${data.currentOrganization?.orgId}/support`,
      billing:
        urls?.orgNav?.billing ??
        `${cloudHost}/v2#/org/${data.currentOrganization?.orgId}/billing/overview`,
      allClusters: urls?.orgNav?.allClusters ?? `${cloudHost}/v2#/clusters`,
      admin:
        urls?.orgNav?.admin ?? `${cloudHost}/v2/admin#general/overview/servers`,
    },
    projectNav: {
      settings:
        urls?.projectNav?.settings ??
        `${cloudHost}/v2/${data.currentProject?.projectId}#settings/groupSettings`,
      accessManager:
        urls?.projectNav?.accessManager ??
        `${cloudHost}/v2/${data.currentProject?.projectId}#access`,
      support:
        urls?.projectNav?.support ??
        `${cloudHost}/v2/${data.currentProject?.projectId}#info/support`,
      integrations:
        urls?.projectNav?.integrations ??
        `${cloudHost}/v2/${data.currentProject?.projectId}#integrations`,
      alerts:
        urls?.projectNav?.alerts ??
        `${cloudHost}/v2/${data.currentProject?.projectId}#alerts`,
      activityFeed:
        urls?.projectNav?.activityFeed ??
        `${cloudHost}/v2/${data.currentProject?.projectId}#activity`,
    },
  };

  return (
    <>
      <OrgNav
        account={account}
        activeProduct={activeProduct}
        current={currentOrganization}
        data={organizations}
        constructOrganizationURL={constructOrganizationURL}
        urls={constructedURLs}
        activeNav={activeNav}
        onOrganizationChange={onOrganizationChange}
        admin={admin}
        hosts={sanitizedHosts}
      />
      {showProjNav && currentProject && (
        <ProjectNav
          activeProduct={activeProduct}
          current={currentProject}
          data={projects}
          constructProjectURL={constructProjectURL}
          urls={constructedURLs}
          alerts={currentProject?.alertsOpen}
          onProjectChange={onProjectChange}
          hosts={sanitizedHosts}
        />
      )}
    </>
  );
}
