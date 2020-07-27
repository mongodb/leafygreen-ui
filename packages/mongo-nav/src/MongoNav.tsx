import React, { useEffect, useState, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import OrgNav from './org-nav';
import ProjectNav from './project-nav';
import defaultsDeep from 'lodash/defaultsDeep';
import OnElementClickProvider from './on-element-click-provider';
import { css, cx } from '@leafygreen-ui/emotion';
import { useObjectDependency } from '@leafygreen-ui/hooks';
import { uiColors } from '@leafygreen-ui/palette';
import { dataFixtures as defaultDataFixtures, hostDefaults } from './data';
import {
  Product,
  URLS,
  Mode,
  DataInterface,
  ErrorCode,
  PostBodyInterface,
  MongoNavInterface,
  OrganizationInterface,
  ProjectInterface,
  HostsInterface,
  Platform,
  Environment,
  ActiveNavElement,
} from './types';

const ErrorCodeMap: Record<number, ErrorCode> = {
  401: ErrorCode.NO_AUTHORIZATION,
} as const;

type UseMongoNavData = Pick<
  MongoNavInterface,
  | 'mode'
  | 'activeOrgId'
  | 'activeProjectId'
  | 'loadData'
  | 'dataFixtures'
  | 'onSuccess'
  | 'onError'
> & {
  hosts: Required<NonNullable<MongoNavInterface['hosts']>>;
  reload: boolean;
};

function useMongoNavData({
  hosts,
  mode,
  activeOrgId,
  activeProjectId,
  loadData,
  dataFixtures,
  onSuccess,
  onError,
  reload,
}: UseMongoNavData): DataInterface | undefined {
  const [data, setData] = useState<DataInterface | undefined>(undefined);

  const endpointURI = `${hosts.cloud}/user/shared`;
  const body: PostBodyInterface | null = useObjectDependency(
    activeProjectId || activeOrgId ? { activeProjectId, activeOrgId } : null,
  );

  const mergedData = useObjectDependency(
    mode === Mode.Dev ? defaultsDeep(dataFixtures, defaultDataFixtures) : null,
  );

  const handlerRef = useRef({ onSuccess, onError });
  handlerRef.current = { onSuccess, onError };

  useEffect(() => {
    if (!loadData) {
      setData(undefined);
    } else if (mergedData) {
      setData(mergedData);
      handlerRef.current.onSuccess?.(mergedData);
    } else {
      const handleResponse = (response: Response) => {
        if (!response.ok) {
          const mappedStatus = ErrorCodeMap[response.status];
          handlerRef.current.onError?.(mappedStatus);
          console.error(mappedStatus);
        } else {
          response
            .json()
            .then(data => {
              setData(data);
              handlerRef.current.onSuccess?.(data);
            })
            .catch(console.error);
        }
      };

      const controller = new AbortController();

      const fetchProductionData = () => {
        const configObject: RequestInit = {
          credentials: 'include',
          mode: 'cors',
          method: 'GET',
          signal: controller.signal,
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
      };

      fetchProductionData()
        .then(handleResponse)
        .catch(error => {
          if (error?.name !== 'AbortError') {
            console.error(error);
          }
        });

      return () => {
        controller.abort();
      };
    }
  }, [mergedData, endpointURI, body, loadData, reload]);

  return data;
}

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
 * @param props.activePlatform Determines which platform is active
 * @param props.alertPollingInterval Defines interval for alert polling
 */
const MongoNav = React.forwardRef(
  (
    {
      activeProduct,
      activeNav,
      onOrganizationChange,
      onProjectChange,
      activeOrgId,
      activeProjectId,
      className,
      environment = Environment.Commercial,
      activePlatform = Platform.Cloud,
      mode = Mode.Production,
      loadData = true,
      showProjectNav = true,
      onError = () => {},
      onSuccess = () => {},
      onElementClick = () => {},
      onPrem = { mfa: false, enabled: false, version: '' },
      alertPollingInterval = 600e3, // 10 minutes
      admin: adminProp,
      hosts: hostsProp,
      urls: urlsProp,
      constructOrganizationURL: constructOrganizationURLProp,
      constructProjectURL: constructProjectURLProp,
      dataFixtures,
      ...rest
    }: MongoNavInterface,
    ref: React.Ref<any>,
  ) => {
    const [reload, setReloadToggle] = useState(false);

    useImperativeHandle(ref, () => ({
      reloadData: () => {
        setReloadToggle(curr => !curr);
      },
    }));

    const shouldShowProjectNav = showProjectNav && !onPrem.enabled;
    const hosts: Required<HostsInterface> = defaultsDeep(
      hostsProp,
      hostDefaults(environment === Environment.Government),
    );

    const data = useMongoNavData({
      hosts,
      mode,
      activeOrgId,
      activeProjectId,
      loadData,
      dataFixtures,
      onSuccess,
      onError,
      reload,
    });

    const admin = (adminProp ?? data?.account?.admin) === true;

    const currentOrgId = data?.currentOrganization?.orgId;
    const currentProjectId = data?.currentProject?.projectId;

    const defaultURLS: Omit<URLS, 'userMenu'> = {
      mongoSelect: {
        viewAllProjects: `${hosts.cloud}/v2#/org/${currentOrgId}/projects`,
        viewAllOrganizations: `${hosts.cloud}/v2#/preferences/organizations`,
        newProject: `${hosts.cloud}/v2#/org/${currentOrgId}/projects/create`,
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
        invite: `${hosts.cloud}/v2/${currentProjectId}#access/invite`,
        realm: `${hosts.realm}/groups/${currentProjectId}/apps`,
        charts: data?.currentProject?.chartsActivated
          ? `${hosts.cloud}/charts/${currentProjectId}`
          : `${hosts.cloud}/v2/${currentProjectId}#charts`,
      },
      onPrem: {
        profile: `${hosts.cloud}/v2#/account/profile`,
        mfa: `${hosts.cloud}/v2#/account/2fa`,
        personalization: `${hosts.cloud}/v2#/account/personalization`,
        invitations: `${hosts.cloud}/v2#/account/invitations`,
        organizations: `${hosts.cloud}/v2#/account/organizations`,
        publicApiAccess: `${hosts.cloud}/v2#/account/publicApi`,
        featureRequest: 'https://feedback.mongodb.com',
      },
    };

    const urls: URLS = defaultsDeep(urlsProp, defaultURLS);

    const defaultOrgURL = ({ orgId }: OrganizationInterface) =>
      `${hosts.cloud}/v2#/org/${orgId}/projects`;
    const constructOrganizationURL =
      constructOrganizationURLProp ?? defaultOrgURL;

    const defaultProjectURL = ({ projectId }: ProjectInterface) =>
      `${hosts.cloud}/v2/${projectId}#`;
    const constructProjectURL = constructProjectURLProp ?? defaultProjectURL;

    const filteredProjects = data?.projects?.filter(project => {
      return project.orgId === data.currentProject?.orgId;
    });

    return (
      <OnElementClickProvider onElementClick={onElementClick}>
        <section className={cx(navContainerStyle, className)} {...rest}>
          <OrgNav
            account={data?.account}
            current={data?.currentOrganization}
            data={data?.organizations}
            constructOrganizationURL={constructOrganizationURL}
            urls={urls}
            activeNav={activeNav}
            onOrganizationChange={onOrganizationChange}
            admin={admin}
            hosts={hosts}
            mode={mode}
            currentProjectName={data?.currentProject?.projectName}
            currentProjectId={currentProjectId}
            onPremEnabled={onPrem.enabled}
            onPremVersion={onPrem.version}
            onPremMFA={onPrem.mfa}
            showProjectNav={shouldShowProjectNav}
            activePlatform={activePlatform}
            environment={environment}
          />

          {shouldShowProjectNav && (
            <ProjectNav
              mode={mode}
              activeProduct={activeProduct}
              alertPollingInterval={alertPollingInterval}
              activeNav={activeNav}
              admin={admin}
              current={data?.currentProject}
              data={filteredProjects}
              constructProjectURL={constructProjectURL}
              urls={urls}
              onProjectChange={onProjectChange}
              hosts={hosts}
              environment={environment}
            />
          )}
        </section>
      </OnElementClickProvider>
    );
  },
);

MongoNav.displayName = 'MongoNav';

MongoNav.propTypes = {
  activeProduct: PropTypes.oneOf(Object.values(Product)),
  activeNav: PropTypes.oneOf(Object.values(ActiveNavElement)),
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
  // @ts-expect-error
  onPrem: PropTypes.shape({
    mfa: PropTypes.bool,
    enabled: PropTypes.bool,
    version: PropTypes.string,
  }),

  onElementClick: PropTypes.func,
  activeOrgId: PropTypes.string,
  activeProjectId: PropTypes.string,
};

export default MongoNav;
