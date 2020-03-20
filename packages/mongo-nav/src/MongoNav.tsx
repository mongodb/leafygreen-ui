import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import OrgNav from './org-nav';
import ProjectNav from './project-nav';
import defaultsDeep from 'lodash/defaultsDeep';
import OnElementClickProvider from './on-element-click-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { dataFixtures, hostDefaults } from './data';
import {
  Product,
  URLSInterface,
  NavElement,
  Mode,
  DataInterface,
  ErrorCode,
  PostBodyInterface,
  MongoNavInterface,
} from './types';

const ErrorCodeMap: Record<number, ErrorCode> = {
  401: ErrorCode.NO_AUTHORIZATION,
} as const;

const navContainerStyle = css`
  background-color: ${uiColors.white};
  box-shadow: 0 3px 7px 0 rgba(67, 117, 151, 0.08);
  z-index: 0;
  position: relative;
`;

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
 * @param props.className Applies a className to the root element
 * @param props.onElementClick Click EventHandler that receives a `type` as its first argument and the associated `MouseEvent` as its second. This prop provides a hook into product link and logout link clicks and allows consuming applications to handle routing internally.
 * @param props.activeOrgId ID for active organization, will cause a POST request to cloud to update current active organization.
 * @param props.activeProjectId ID for active project, will cause a POST request to cloud to update current active project.
 * @param props.className Applies a className to the root element
 * @param props.loadData Determines whether or not the component will fetch data from cloud
 * @param props.alertsCount Overwrite number of alerts received from cloud endpoint
 */
function MongoNav({
  activeProduct,
  activeNav,
  onOrganizationChange,
  onProjectChange,
  mode = Mode.Production,
  loadData = true,
  showProjectNav = true,
  admin = false,
  hosts: hostsProp,
  urls: urlsProp,
  constructOrganizationURL: constructOrganizationURLProp,
  constructProjectURL: constructProjectURLProp,
  onError = () => {},
  onSuccess = () => {},
  onElementClick = (_type: NavElement, _event: React.MouseEvent) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
  onPrem = { mfa: false, enabled: false, version: '' },
  activeOrgId,
  activeProjectId,
  className,
  alertsCount,
  ...rest
}: MongoNavInterface) {
  const shouldShowProjectNav = showProjectNav && !onPrem.enabled;
  const [data, setData] = React.useState<DataInterface | undefined>(undefined);
  const hosts = defaultsDeep(hostsProp, hostDefaults);
  const endpointURI = `${hosts.cloud}/user/shared`;

  const currentOrgId = data?.currentOrganization?.orgId;
  const currentProjectId = data?.currentProject?.projectId;

  const defaultURLS: Required<URLSInterface> = {
    userMenu: {
      cloud: {
        userPreferences: `${hosts.cloud}/v2#/preferences/personalization`,
        organizations: `${hosts.cloud}/v2#/preferences/organizations`,
        invitations: `${hosts.cloud}/v2#/preferences/invitations`,
        mfa: `${hosts.cloud}/v2#/preferences/2fa`,
      },
      university: {
        universityPreferences: `${hosts.university}/edit_profile`,
      },
      support: {
        userPreferences: `${hosts.support}/profile`,
      },
      account: {
        homepage: `${hosts.account}/account/profile/overview`,
      },
    },
    mongoSelect: {
      viewAllProjects: `${hosts.cloud}/v2#/org/${currentProjectId}/projects`,
      viewAllOrganizations: `${hosts.cloud}/v2#/preferences/organizations`,
      newProject: `${hosts.cloud}/v2#/org/${currentProjectId}/projects/create`,
      orgSettings: `${hosts.cloud}/v2#/org/${currentOrgId}/settings/general`,
    },
    orgNav: {
      leaf: currentOrgId ? `${hosts.cloud}/v2#/org/${currentOrgId}/` : `/`,
      settings: `${hosts.cloud}/v2#/org/${currentOrgId}/settings/general`,
      accessManager: `${hosts.cloud}/v2#/org/${currentOrgId}/access/users`,
      support: `${hosts.cloud}/v2#/org/${currentOrgId}/support`,
      billing: `${hosts.cloud}/v2#/org/${currentOrgId}/billing/overview`,
      allClusters: `${hosts.cloud}/v2#/clusters`,
      admin: `${hosts.cloud}/v2/admin#general/overview/servers`,
    },
    projectNav: {
      settings: `${hosts.cloud}/v2/${currentProjectId}#settings/groupSettings`,
      accessManager: `${hosts.cloud}/v2/${currentProjectId}#access`,
      support: `${hosts.cloud}/v2/${currentProjectId}#info/support`,
      integrations: `${hosts.cloud}/v2/${currentProjectId}#integrations`,
      alerts: `${hosts.cloud}/v2/${currentProjectId}#alerts`,
      activityFeed: `${hosts.cloud}/v2/${currentProjectId}#activity`,
      invite: `${hosts.cloud}/v2/${currentProjectId}#access/add`,
      charts: data?.currentProject?.chartsActivated
        ? `${hosts.cloud}/charts/${currentProjectId}`
        : `${hosts.cloud}/v2/${currentProjectId}#charts`,
    },
    onPrem: {
      profile: `${hosts.cloud}/v2#/account/profile`,
      mfa: `${hosts.cloud}/v2#/preferences/2fa`,
      personalization: `${hosts.cloud}/v2#/account/personalization`,
      invitations: `${hosts.cloud}/v2#/preferences/invitations`,
      organizations: `${hosts.cloud}/v2#/preferences/organizations`,
      featureRequest: 'https://feedback.mongodb.com',
    },
  };

  const urls = defaultsDeep(urlsProp, defaultURLS);

  const defaultOrgURL = (orgId: string) =>
    `${hosts.cloud}/v2#/org/${orgId}/projects`;
  const constructOrganizationURL =
    constructOrganizationURLProp ?? defaultOrgURL;

  const defaultProjectURL = (projectId: string) =>
    `${hosts.cloud}/v2/${projectId}#`;
  const constructProjectURL = constructProjectURLProp ?? defaultProjectURL;

  function fetchProductionData(body?: PostBodyInterface) {
    const configObject: RequestInit = {
      credentials: 'include',
      mode: 'cors',
      method: 'GET',
    };

    if (body) {
      Object.assign(configObject, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return fetch(endpointURI, configObject);
  }

  async function getDataFixtures() {
    onSuccess?.(dataFixtures);
    return dataFixtures;
  }

  async function handleResponse(response: Response) {
    if (!response.ok) {
      const mappedStatus = ErrorCodeMap[response.status];
      onError?.(mappedStatus);
      console.error(mappedStatus);
    } else {
      const data = await response.json();
      setData(data);
      onSuccess?.(data);
    }
  }

  useEffect(() => {
    if (!loadData) {
      setData(undefined);
    } else if (mode === Mode.Dev) {
      getDataFixtures().then(data => setData(data as DataInterface));
    } else {
      let body: PostBodyInterface | undefined;

      if (activeProjectId || activeOrgId) {
        body = { activeProjectId, activeOrgId };
      }

      fetchProductionData(body)
        .then(handleResponse)
        .catch(console.error);
    }
  }, [mode, endpointURI, activeOrgId, activeProjectId, loadData]);

  const filteredProjects = data?.projects?.filter(project => {
    return project.orgId === data.currentProject?.orgId;
  });

  return (
    <OnElementClickProvider onElementClick={onElementClick}>
      <section {...rest} className={cx(navContainerStyle, className)}>
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
          onPremEnabled={onPrem.enabled}
          onPremVersion={onPrem.version}
          onPremMFA={onPrem.mfa}
        />

        {shouldShowProjectNav && (
          <ProjectNav
            activeProduct={activeProduct}
            activeNav={activeNav}
            current={data?.currentProject}
            data={filteredProjects}
            constructProjectURL={constructProjectURL}
            urls={urls}
            alerts={alertsCount ?? data?.currentProject?.alertsOpen}
            onProjectChange={onProjectChange}
            hosts={hosts}
          />
        )}
      </section>
    </OnElementClickProvider>
  );
}

MongoNav.displayName = 'MongoNav';

MongoNav.propTypes = {
  activeProduct: PropTypes.oneOf(Object.values(Product)),
  activeNav: PropTypes.oneOf(Object.values(NavElement)),
  hosts: PropTypes.objectOf(PropTypes.string),
  onOrganizationChange: PropTypes.func,
  onProjectChange: PropTypes.func,
  urls: PropTypes.objectOf(PropTypes.object),
  showProjectNav: PropTypes.bool,
  admin: PropTypes.bool,
  constructOrganizationURL: PropTypes.func,
  constructProjectURL: PropTypes.func,
  mode: PropTypes.oneOf(Object.values(Mode)),
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onPrem: PropTypes.shape({
    mfa: PropTypes.bool,
    enabled: PropTypes.bool,
    version: PropTypes.string,
  }),
  onElementClick: PropTypes.func,
  activeOrgId: PropTypes.string,
  activeProjectId: PropTypes.string,
  alertsCount: PropTypes.number,
};

export default MongoNav;
