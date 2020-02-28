import React, { useEffect } from 'react';
import OrgNav from './org-nav/index';
import ProjectNav from './project-nav/index';
import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import {
  Product,
  URLSInterface,
  HostsInterface,
  NavItem,
  Mode,
  DataInterface,
  ErrorCode,
  OnPremInterface,
} from './types';
import { dataFixtures, hostDefaults } from './data';
import defaultsDeep from 'lodash/defaultsDeep';

const ErrorCodeMap = {
  401: ErrorCode.NO_AUTHORIZATION,
};

const navContainerStyle = css`
  background-color: ${uiColors.white};
  box-shadow: 0 3px 7px 0 rgba(67, 117, 151, 0.08);
  z-index: 0;
  position: relative;
`;

interface MongoNavInterface {
  /**
   * Describes what product is currently active.
   */
  activeProduct: Product;

  /**
   * Determines what nav item is currently active.
   */
  activeNav?: NavItem;

  /**
   * Describes whether or not user is an `admin`.
   */
  admin?: boolean;

  /**
   * Callback invoked when user types into organization picker.
   */
  onOrganizationChange: React.ChangeEventHandler;

  /**
   * Callback invoked when user types into project picker.
   */
  onProjectChange: React.ChangeEventHandler;

  /**
   *  Function to determine destination URL when user selects a organization from the organization picker, see also `hosts`.
   */
  constructOrganizationURL?: (orgID: string) => string;

  /**
   *  Function to determine destination URL when user selects a project from the project picker, see also `hosts`.
   */
  constructProjectURL?: (orgID: string, projID: string) => string;

  /**
   * Determines whether the project navigation should be shown.
   */
  showProjNav?: boolean;

  /**
   * Object where keys are MDB products and values are the desired hostURL override for that product, to enable `<MongoNav />` to work across all environments.
   */
  hosts?: HostsInterface;

  /**
   * Object to enable custom overrides for every `href` used in `<MongoNav />`.
   */
  urls?: URLSInterface;

  /**
   * Describes what environment the component is being used in.
   * By default the value is set to `production`.
   */
  mode?: Mode;

  /**
   * Function that is passed an error code as a string, so that consuming application can handle fetch failures.
   */
  onError?: (error: ErrorCode) => void;

  /**
   * Callback that receives the response of the fetched data, having been converted from JSON into an object.
   */
  onSuccess?: (response: DataInterface) => void;

  /**
   * Callback executed when user logs out
   */
  onLogout?: React.MouseEventHandler;

  /**
   * onPrem config object with three keys: enabled, version and mfa
   */
  onPrem?: OnPremInterface;
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
 * @param props.constructOrganizationURL Function to determine destination URL when user selects a organization from the organization picker, see also `hosts`.
 * @param props.constructProjectURL Function to determine destination URL when user selects a project from the project picker, see also `hosts`.
 * @param props.mode Describes what environment the component is being used in, defaults to `production`.
 * @param props.onSuccess Callback that receives the response of the fetched data, having been converted from JSON into an object.
 * @param props.onError Function that is passed an error code as a string, so that consuming application can handle fetch failures.
 * @param props.onPrem onPrem config object with three keys: enabled, version and mfa
 * @param props.onLogout Callback executed when user logs out
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
  onError = () => {},
  onSuccess = () => {},
  onLogout = () => {},
  onPrem = { mfa: false, enabled: false, version: '' },
}: MongoNavInterface) {
  const [data, setData] = React.useState<DataInterface | undefined>(undefined);

  const hosts = defaultsDeep(hostsProp, hostDefaults);
  const endpointURI = `${hosts.cloud}/user/shared`;

  function getProductionData() {
    return fetch(endpointURI, {
      credentials: 'include',
      method: 'GET',
    });
  }

  function getDataFixtures() {
    return new Promise(resolve => {
      resolve(dataFixtures);
      onSuccess?.(dataFixtures);
    });
  }

  async function handleResponse(response: Response) {
    if (!response.ok) {
      const status = response.status as 401; //typecasting for now until we have more types to handle
      onError?.(ErrorCodeMap[status]);
      console.error(ErrorCodeMap[status]);
    } else {
      const data = await response.json();
      setData(data);
      onSuccess?.(data);
    }
  }

  useEffect(() => {
    if (mode === Mode.Dev) {
      getDataFixtures().then(data => setData(data as DataInterface));
    } else {
      getProductionData()
        .then(handleResponse)
        .catch(console.error);
    }
  }, [mode, endpointURI]);

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
      viewAllProjects: `${hosts.cloud}/v2#/org/${data?.currentProject?.orgId}/projects`,
      viewAllOrganizations: `${hosts.cloud}/v2#/preferences/organizations`,
      newProject: `${hosts.cloud}/v2#/org/${data?.currentProject?.orgId}/projects/create`,
      orgSettings: `${hosts.cloud}/v2#/org/${data?.currentOrganization?.orgId}/settings/general`,
    },
    orgNav: {
      settings: `${hosts.cloud}/v2#/org/${data?.currentOrganization?.orgId}/settings/general`,
      accessManager: `${hosts.cloud}/v2#/org/${data?.currentOrganization?.orgId}/access/users`,
      support: `${hosts.cloud}/v2#/org/${data?.currentOrganization?.orgId}/support`,
      billing: `${hosts.cloud}/v2#/org/${data?.currentOrganization?.orgId}/billing/overview`,
      allClusters: `${hosts.cloud}/v2#/clusters`,
      admin: `${hosts.cloud}/v2/admin#general/overview/servers`,
    },
    projectNav: {
      settings: `${hosts.cloud}/v2/${data?.currentProject?.projectId}#settings/groupSettings`,
      accessManager: `${hosts.cloud}/v2/${data?.currentProject?.projectId}#access`,
      support: `${hosts.cloud}/v2/${data?.currentProject?.projectId}#info/support`,
      integrations: `${hosts.cloud}/v2/${data?.currentProject?.projectId}#integrations`,
      alerts: `${hosts.cloud}/v2/${data?.currentProject?.projectId}#alerts`,
      activityFeed: `${hosts.cloud}/v2/${data?.currentProject?.projectId}#activity`,
    },
    onPrem: {
      profile: `${hosts.cloud}/v2#/account/profile`,
      mfa: `${hosts.cloud}/v2#/preferences/2fa`,
      personalization: `${hosts.cloud}/v2#/account/personalization`,
      invitations: `${hosts.cloud}/v2#/preferences/invitations`,
      organizations: `${hosts.cloud}/v2#/preferences/organizations`,
      featureRequest: `https://feedback.mongodb.com`,
    },
  };

  const urls = defaultsDeep(urlsProp, defaultURLS);

  const defaultOrgURL = (orgId: string) =>
    `${hosts.cloud}/v2#/org/${orgId}/projects`;
  const constructOrganizationURL =
    constructOrganizationURLProp ?? defaultOrgURL;

  const defaultProjectURL = (projectId: string) =>
    `${hosts.cloud}/v2#/${projectId}`;
  const constructProjectURL = constructProjectURLProp ?? defaultProjectURL;

  return (
    <section className={navContainerStyle}>
      <OrgNav
        account={data?.account}
        activeProduct={activeProduct}
        current={data?.currentOrganization}
        data={data?.organizations}
        constructOrganizationURL={constructOrganizationURL}
        urls={urls}
        activeNav={activeNav}
        onOrganizationChange={onOrganizationChange}
        admin={admin}
        hosts={hosts}
        currentProjectName={data?.currentProject?.projectName}
        onLogout={onLogout}
        onPremEnabled={onPrem.enabled}
        onPremVersion={onPrem.version}
        onPremMFA={onPrem.mfa}
      />
      {showProjNav && !onPrem.enabled && (
        <ProjectNav
          activeProduct={activeProduct}
          current={data?.currentProject}
          data={data?.projects}
          constructProjectURL={constructProjectURL}
          urls={urls}
          alerts={data?.currentProject?.alertsOpen}
          onProjectChange={onProjectChange}
          hosts={hosts}
        />
      )}
    </section>
  );
}
