# Mongo Nav

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/mongo-nav.svg)

## Example

```js
<MongoNav
  data={data}
  activeProduct="cloud"
  activeNav="accessManager"
  onOrganizationChange={onOrganizationChange}
  onProjectChange={onProjectChange}
  admin={true}
/>
```

## Properties

| Prop                       | Type                                                                                 | Description                                                                                                                                               | Default                                                            |
| -------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `activeProduct`            | `'cloud' | 'stitch' | 'charts' | 'support' | 'university'`                           | Describes what product is currently active                                                                                                                |                                                                    |
| `activeNav`                | `'accessManager' | 'admin' | 'allClusters' | 'billing' | 'orgSettings' |'support' |` | Determines what nav item is currently active                                                                                                              |                                                                    |
| `admin`                    | `boolean`                                                                            | Describes whether or not user is an `admin`                                                                                                               | `false`                                                            |
| `mode`                     | `production` or `dev`                                                                | Describes what environment the component is being used in, defaults to `production`                                                                       | `production`                                                       |
| `onOrganizationChange`     | `Function`                                                                           | Callback invoked when user types into organization picker                                                                                                 | `() => {}`                                                         |
| `onProjectChange`          | `Function`                                                                           | Callback invoked when user types into project picker                                                                                                      | `() => {}`                                                         |
| `constructOrganizationURL` | `(orgId) => string`                                                                  | Function to determine destination URL when user selects an organization from the organization picker                                                      | `(orgId) => 'https://cloud.mongodb.com/v2#/org/${orgId}/projects'` |
| `constructProjectURL`      | `(orgId, projId) => string`                                                          | Function to determine destination URL when user selects a project from the project picker                                                                 | `(orgId, projId) => 'https://cloud.mongodb.com/v2#/${projectId}'`  |
| `showProjNav`              | `boolean`                                                                            | Determines whether the project navigation should be shown                                                                                                 | `true`                                                             |
| `hosts`                    | `{cloud: '', stitch: '', charts: '', account: '', university: '', support: ''}`      | Object where keys are MDB products and values are the desired hostURL override for that product, to enable `<MongoNav />` to work across all environments |
| `urls`                     | `URLInterface` (see below for type)                                                  | Object to enable custom overrides for every `href` used in `<MongoNav />`                                                                                 |
| `onError`                  | `(response) => {}`                                                                   | Function that is passed an error code, so that consuming application can handle fetch failures                                                            | `() => {}`                                                         |
| `onSuccess`                | `(response) => {}`                                                                   | Callback that receives the response of the fetched data                                                                                                   | `() => {}`                                                         |

### DataInterface

````js
interface DataInterface {
  account: {email: string, firstName: string, lastName: string, openInvitations: number, username: string};
  currentOrganization: {orgId: string, orgName: string, planType: 'cloud' | 'atlas' | 'onprem', paymentStatus: 'embargoed' | 'embargo confirmed' | 'ok' | 'warning'  'suspended' | 'closing' | 'admin suspended' |'dead' |'locked' |'closed' };
  currentProject: {projectId: string, projectName: string, planType: 'cloud' | 'atlas' | 'onprem', orgId: string, alertsOpen: number, chartsActivated: boolean};
  organizations: Array<{orgId: string, orgName: string, planType: 'cloud' | 'atlas' | 'onprem' }>;
  projects: Array<{projectId: string, projectName: string, planType: 'cloud' | 'atlas' | 'onprem', orgId: string}>
}```

### URLInterface
```js
export interface URLSInterface {
  mongoMenu?: {
    cloud?: {
      userPreferences: string;
      organizations: string;
      invitations: string;
      mfa: string;
    };
    university?: {
      videoPreferences: string;
    };
    support?: {
      userPreferences: string;
    };
    account?: {
      homepage?: string;
    };
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
  };
}
````
