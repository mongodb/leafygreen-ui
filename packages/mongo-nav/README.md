# Mongo Nav

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/mongo-nav.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/mongonav--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/mongo-nav @leafygreen-ui/leafygreen-provider
```

### NPM

```shell
npm install @leafygreen-ui/mongo-nav @leafygreen-ui/leafygreen-provider@1.1.0
```

## Peer Dependencies

| Package                              | Version  |
| ------------------------------------ | -------- |
| `@leafygreen-ui/leafygreen-provider` | `^1.1.0` |

## Example

```js
<MongoNav
  mode="dev"
  activeProduct="cloud"
  activeNav="accessManager"
  onOrganizationChange={onOrganizationChange}
  onProjectChange={onProjectChange}
  admin={true}
/>
```

## Properties

| Prop                       | Type                                                                            | Description                                                                                                                                                                                                                                                                                                                              | Default                                                   |
| -------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `activeProduct`            | `'cloud'` \| `'realm'` \| `'charts'`                                            | Describes what product is currently active                                                                                                                                                                                                                                                                                               |                                                           |
| `activeNav`                | `ActiveNavElement`                                                              | Determines what nav item is currently active                                                                                                                                                                                                                                                                                             |                                                           |
| `admin`                    | `boolean`                                                                       | Describes whether or not user is an `admin`                                                                                                                                                                                                                                                                                              | `false`                                                   |
| `mode`                     | `'production'` \| `'dev'`                                                       | Describes what environment the component is being used in                                                                                                                                                                                                                                                                                | `'production'`                                            |
| `onOrganizationChange`     | `({value: string, setData: Function, event: React.ChangeEvent}) => void`        | Callback invoked when user types in the OrgSelect filter box. The function receives an object as its argument with three keys. The first is the current value of the filter box, the second is a Function that allows the consumer to control what data is rendered based on the current search, and the final is the `ChangeEvent`.     |                                                           |
| `onProjectChange`          | `({value: string, setData: Function, event: React.ChangeEvent}) => void`        | Callback invoked when user types in the ProjectSelect filter box. The function receives an object as its argument with three keys. The first is the current value of the filter box, the second is a Function that allows the consumer to control what data is rendered based on the current search, and the final is the `ChangeEvent`. |                                                           |
| `constructOrganizationURL` | `(Organization) => string`                                                      | Function that allows consumers to determine destination URL when user selects an organization from the organization picker, see also `hosts`                                                                                                                                                                                             | `(org) => '${hosts.cloud}/v2#/org/${org.orgId}/projects'` |
| `constructProjectURL`      | `(Project) => string`                                                           | Function that allows consumers to determine destination URL when user selects a project from the project picker, see also `hosts`                                                                                                                                                                                                        | `(project) => '${hosts.cloud}/v2#/${project.projectId}'`  |
| `showProjectNav`           | `boolean`                                                                       | Determines whether the project navigation should be shown                                                                                                                                                                                                                                                                                | `true`                                                    |
| `hosts`                    | `{cloud: '', realm: '', charts: '', account: '', university: '', support: ''}`  | Object where keys are MDB products and values are the desired hostURL override for that product, to enable `<MongoNav />` to work across all environments                                                                                                                                                                                |                                                           |
| `urls`                     | `URLInterface`                                                                  | Object to enable custom overrides for every `href` used in `<MongoNav />`                                                                                                                                                                                                                                                                |                                                           |
| `onError`                  | `(ErrorCode) => {}`,                                                            | Function that is passed an error code as a string, so that consuming application can handle fetch failures                                                                                                                                                                                                                               | `() => {}`                                                |
| `onSuccess`                | `(response) => {}`                                                              | Callback that receives the response of the fetched data, having been converted from JSON into an object                                                                                                                                                                                                                                  | `() => {}`                                                |
| `onPrem`                   | `{enabled: boolean, mfa: boolean, version: string}`                             | onPrem config object with three keys: enabled, version and mfa                                                                                                                                                                                                                                                                           | `{enabled: false, mfa: false, version: ''}`               |
| `onPrem.enabled`           | `boolean`                                                                       | Determines whether or not a user is onPrem                                                                                                                                                                                                                                                                                               | `false`                                                   |
| `onPrem.mfa`               | `boolean`                                                                       | Determines if an onPrem user has multi-factor authentication enabled                                                                                                                                                                                                                                                                     | `false`                                                   |
| `onPrem.version`           | `string`                                                                        | Describes the version of Ops Manager that an `onPrem` user is using                                                                                                                                                                                                                                                                      | `''`                                                      |
| `activeOrgId`              | `string`                                                                        | ID for active organization, will trigger a POST request to cloud to update current active organization.                                                                                                                                                                                                                                  |                                                           |
| `activeProjectId`          | `string`                                                                        | ID for active project, will trigger a POST request to cloud to update current active project.                                                                                                                                                                                                                                            |                                                           |
| `className`                | `string`                                                                        | Applies a className to the root element                                                                                                                                                                                                                                                                                                  |                                                           |
| `loadData`                 | `boolean`                                                                       | Determines whether or not the component will fetch data from cloud                                                                                                                                                                                                                                                                       | `true`                                                    |
| `onElementClick`           | `(type: 'logout', 'cloud', 'realm', 'charts', event: React.MouseEvent => void)` | Click EventHandler that receives a `type` as its first argument and the associated `MouseEvent` as its second. This prop provides a hook into product link and logout link clicks and allows consuming applications to handle routing internally                                                                                         | `() => {}`                                                |
| `dataFixtures`             | `DataInterface`                                                                 | Allows consumers to control fixture data when in dev mode                                                                                                                                                                                                                                                                                |                                                           |
| `activePlatform`           | `'account'` \| `'cloud'` \| `'support'` \|`'university'`                        | Describes what platform is currently active                                                                                                                                                                                                                                                                                              |                                                           |
| `alertPollingInterval`     | `number`                                                                        | Defines interval for alert polling                                                                                                                                                                                                                                                                                                       | `600e3 // 10 minutes`                                     |

_Any other properties will be spread on the root element_

##### ActiveNavElement

```typescript
type ActiveNavElement = {
  | 'orgNavOrgSettings'
  | 'orgNavAccessManagerDropdown'
  | 'orgNavSupport'
  | 'orgNavBilling'
  | 'orgNavAdmin'
  | 'orgNavAllClusters'
  | 'orgNavDropdownOrgAccessManager'
  | 'orgNavDropdownProjectAccessManager'
  | 'projectNavInvite'
  | 'projectNavActivityFeed'
  | 'projectNavAlerts'
  | 'projectNavProjectSettings'
  | 'projectNavProjectSupport'
  | 'projectNavProjectIntegrations'
  | 'userMenuCloudMFA'
  | 'userMenuCloudInvitations'
  | 'userMenuCloudOrganizations'
  | 'userMenuCloudUserPreferences'
  | 'userMenuCloudOther'
  | 'userMenuOnPremProfile'
  | 'userMenuOnPremTwoFactorAuth'
  | 'userMenuOnPremPersonalization'
  | 'userMenuOnPremInvitations'
  | 'userMenuOnPremOrganizations'
  | 'userMenuOnPremPublicApiAccess'
  | 'userMenuOnPremPublicApiAccess'
}
```

##### URLInterface

```typescript
export interface URLSInterface {
  userMenu?: {
    cloud?: {
      userPreferences: string;
      organizations: string;
      invitations: string;
      mfa: string;
    };
    university?: {
      universityPreferences: string;
    };
    support?: {
      userPreferences: string;
    };
    account?: {
      homepage?: string;
    };
    logout?: string;
  };
  mongoSelect?: {
    viewAllProjects?: string;
    viewAllOrganizations?: string;
    newProject?: string;
    orgSettings?: string;
  };
  orgNav?: {
    settings?: string;
    accessManager?: string;
    support?: string;
    billing?: string;
    allClusters?: string;
    admin?: string;
  };
  projectNav?: {
    settings?: string;
    accessManager?: string;
    support?: string;
    integrations?: string;
    alerts?: string;
    activityFeed?: string;
    invite?: string;
    realm?: string;
    charts?: string;
  };
  onPrem?: {
    profile?: string;
    mfa?: string;
    personalization?: string;
    invitations?: string;
    organizations?: string;
    publicApiAccess?: string;
    featureRequest?: string;
  };
}
```

##### DataInterface

```typescript
export interface AccountInterface {
  email: string;
  firstName: string;
  lastName: string;
  hasLegacy2fa?: boolean;
  openInvitations?: number;
  username?: string;
  admin?: boolean;
}

export interface ProjectInterface {
  projectId: string;
  projectName: string;
  planType?: PlanType;
  orgId?: string;
}

export interface CurrentProjectInterface extends ProjectInterface {
  alertsOpen: number;
  chartsActivated: boolean;
  status?: ProjectStatus;
}

export interface OrganizationInterface {
  orgId: string;
  orgName: string;
  planType: PlanType;
}

export interface CurrentOrganizationInterface extends OrganizationInterface {
  paymentStatus?: OrgPaymentLabel;
}

export interface DataInterface {
  readonly account: AccountInterface;
  currentOrganization?: CurrentOrganizationInterface;
  currentProject?: CurrentProjectInterface;
  readonly organizations: Array<OrganizationInterface>;
  readonly projects: Array<ProjectInterface>;
}
```

## Imperative API Handle

We have customized the ref instance value that is exposed to components wrapping `MongoNav`, such that the instance's current property contains a `reloadData` key. Invoking `reloadData` triggers a refetch of data from MongoNav.

## Example

```js
const mongoNavRef = React.useRef(null);

const onClick = () => {
  mongooNavRef.current.reloadData();
};

<MongoNav
  ref={mongoNavRef}
  mode="dev"
  activeProduct="cloud"
  activeNav="accessManager"
  onOrganizationChange={onOrganizationChange}
  onProjectChange={onProjectChange}
  admin={true}
/>;
```
