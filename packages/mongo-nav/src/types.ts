import { RecursivePartial } from '@leafygreen-ui/lib';

const NavElement = {
  OrgNavOrgSettings: 'orgNavOrgSettings',
  OrgNavAccessManagerDropdown: 'orgNavAccessManagerDropdown',
  OrgNavSupport: 'orgNavSupport',
  OrgNavBilling: 'orgNavBilling',
  OrgNavAdmin: 'orgNavAdmin',
  OrgNavAllClusters: 'orgNavAllClusters',
  Logout: 'logout',
  OrgNavLeaf: 'leaf',
  OrgNavOrgSelectTrigger: 'orgNavOrgSelectTrigger',
  OrgNavOrgSelectSearch: 'orgNavOrgSelectSearch',
  OrgNavViewAllOrganizations: 'orgNavViewAllOrganizations',
  OrgNavDropdownOrgAccessManager: 'orgNavDropdownOrgAccessManager',
  OrgNavDropdownProjectAccessManager: 'orgNavDropdownProjectAccessManager',
  OrgNavDropdownMoreMenu: 'orgNavDropdownMoreMenu',
  ProjectNavProjectSelectTrigger: 'projectNavProjectSelectTrigger',
  ProjectNavProjectSelectSearch: 'projectNavProjectSelectSearch',
  ProjectNavViewAllProjects: 'projectNavViewAllProjects',
  ProjectNavAddProject: 'projectNavAddProject',
  ProjectNavProjectDropdown: 'projectNavProjectDropdown',
  ProjectNavProjectSettings: 'projectNavProjectSettings',
  ProjectNavProjectSupport: 'projectNavProjectSupport',
  ProjectNavProjectIntegrations: 'projectNavProjectIntegrations',
  ProjectNavCloud: 'projectNavCloud',
  ProjectNavRealm: 'projectNavRealm',
  ProjectNavCharts: 'projectNavCharts',
  ProjectNavInvite: 'projectNavInvite',
  ProjectNavActivityFeed: 'projectNavActivityFeed',
  ProjectNavAlerts: 'projectNavAlerts',
  UserMenuTrigger: 'userMenuTrigger',
  UserMenuFeedback: 'userMenuFeedback',
  UserMenuCloudMFA: 'userMenuCloudMFA',
  UserMenuCloudInvitations: 'userMenuCloudInvitations',
  UserMenuCloudOrganizations: 'userMenuCloudOrganizations',
  UserMenuCloudUserPreferences: 'userMenuCloudUserPreferences',
  UserMenuCloudOther: 'userMenuCloudOther',
  UserMenuOnPremProfile: 'userMenuOnPremProfile',
  UserMenuOnPremTwoFactorAuth: 'userMenuOnPremTwoFactorAuth',
  UserMenuOnPremPersonalization: 'userMenuOnPremPersonalization',
  UserMenuOnPremInvitations: 'userMenuOnPremInvitations',
  UserMenuOnPremOrganizations: 'userMenuOnPremOrganizations',
  UserMenuOnPremPublicApiAccess: 'userMenuOnPremPublicApiAccess',
  UserMenuOnPremFeatureRequest: 'userMenuOnPremFeatureRequest',
  UserMenuOnPremSignOut: 'userMenuOnPremSignOut',
  UserMenuOnPremOther: 'userMenuOnPremOther',
} as const;

type NavElement = typeof NavElement[keyof typeof NavElement];

export { NavElement };

const ActiveNavElement = {
  OrgNavOrgSettings: NavElement.OrgNavOrgSettings,
  OrgNavAccessManagerDropdown: NavElement.OrgNavAccessManagerDropdown,
  OrgNavSupport: NavElement.OrgNavSupport,
  OrgNavBilling: NavElement.OrgNavBilling,
  OrgNavAdmin: NavElement.OrgNavAdmin,
  OrgNavAllClusters: NavElement.OrgNavAllClusters,
  OrgNavDropdownOrgAccessManager: NavElement.OrgNavDropdownOrgAccessManager,
  OrgNavDropdownProjectAccessManager:
    NavElement.OrgNavDropdownProjectAccessManager,
  ProjectNavInvite: NavElement.ProjectNavInvite,
  ProjectNavActivityFeed: NavElement.ProjectNavActivityFeed,
  ProjectNavAlerts: NavElement.ProjectNavAlerts,
  ProjectNavProjectSettings: NavElement.ProjectNavProjectSettings,
  ProjectNavProjectSupport: NavElement.ProjectNavProjectSupport,
  ProjectNavProjectIntegrations: NavElement.ProjectNavProjectIntegrations,
  UserMenuCloudMFA: NavElement.UserMenuCloudMFA,
  UserMenuCloudInvitations: NavElement.UserMenuCloudInvitations,
  UserMenuCloudOrganizations: NavElement.UserMenuCloudOrganizations,
  UserMenuCloudUserPreferences: NavElement.UserMenuCloudUserPreferences,
  UserMenuCloudOther: NavElement.UserMenuCloudOther,
  UserMenuOnPremProfile: NavElement.UserMenuOnPremProfile,
  UserMenuOnPremTwoFactorAuth: NavElement.UserMenuOnPremTwoFactorAuth,
  UserMenuOnPremPersonalization: NavElement.UserMenuOnPremPersonalization,
  UserMenuOnPremInvitations: NavElement.UserMenuOnPremInvitations,
  UserMenuOnPremOrganizations: NavElement.UserMenuOnPremOrganizations,
  UserMenuOnPremPublicApiAccess: NavElement.UserMenuOnPremPublicApiAccess,
  UserMenuOnPremOther: NavElement.UserMenuOnPremOther,
} as const;

type ActiveNavElement = typeof ActiveNavElement[keyof typeof ActiveNavElement];

export { ActiveNavElement };

const Product = {
  Charts: 'charts',
  Cloud: 'cloud',
  Realm: 'realm',
} as const;

type Product = typeof Product[keyof typeof Product];

export { Product };

const Platform = {
  University: 'university',
  Support: 'support',
  Cloud: 'cloud',
  Account: 'account',
};

type Platform = typeof Platform[keyof typeof Platform];

export { Platform };

const Mode = {
  Dev: 'dev',
  Production: 'production',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

export { Mode };

const Variant = {
  Organization: 'organization',
  Project: 'project',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

const PlanType = {
  Cloud: 'cloud',
  Atlas: 'atlas',
  OnPrem: 'onprem',
} as const;

type PlanType = typeof PlanType[keyof typeof PlanType];

export { PlanType };

const ErrorCode = {
  NO_AUTHORIZATION: 'NO_AUTHORIZATION',
};

type ErrorCode = typeof ErrorCode[keyof typeof ErrorCode];

export { ErrorCode };

const Environment = {
  Commercial: 'commercial',
  Government: 'government',
};

type Environment = typeof Environment[keyof typeof Environment];

export { Environment };

export interface PostBodyInterface {
  activeProjectId?: string;
  activeOrgId?: string;
}

const OrgPaymentLabel = {
  Embargoed: 'EMBARGOED',
  EmbargoConfirmed: 'EMBARGO_CONFIRMED',
  Ok: 'OK',
  Warning: 'WARNING',
  Suspended: 'SUSPENDED',
  Closing: 'CLOSING',
  AdminSuspended: 'ADMIN_SUSPENDED',
  Dead: 'DEAD',
  Locked: 'LOCKED',
  Closed: 'CLOSED',
} as const;

type OrgPaymentLabel = typeof OrgPaymentLabel[keyof typeof OrgPaymentLabel];

export { OrgPaymentLabel };

const ProjectStatus = {
  Active: 'ACTIVE',
  Dead: 'DEAD',
  Closing: 'CLOSING',
  Closed: 'CLOSED',
};

type ProjectStatus = typeof ProjectStatus[keyof typeof ProjectStatus];

export { ProjectStatus };

export interface AccountInterface {
  email: string;
  firstName: string;
  lastName: string;
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

export interface OnPremInterface {
  mfa?: boolean;
  version?: string;
  enabled?: boolean;
}

export interface UserMenuURLS {
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
}

interface MongoSelectURLS {
  viewAllProjects?: string;
  viewAllOrganizations?: string;
  newProject?: string;
  orgSettings?: string;
}

interface OrgNavURLS {
  leaf?: string;
  settings?: string;
  accessManager?: string;
  support?: string;
  billing?: string;
  allClusters?: string;
  admin?: string;
}

interface ProjectNavURLS {
  settings?: string;
  accessManager?: string;
  support?: string;
  integrations?: string;
  alerts?: string;
  activityFeed?: string;
  invite?: string;
  realm?: string;
  charts?: string;
}

interface OnPremURLS {
  profile?: string;
  mfa?: string;
  personalization?: string;
  invitations?: string;
  organizations?: string;
  publicApiAccess?: string;
  featureRequest?: string;
}

export interface URLSProp {
  userMenu?: UserMenuURLS;
  mongoSelect?: MongoSelectURLS;
  orgNav?: OrgNavURLS;
  projectNav?: ProjectNavURLS;
  onPrem?: OnPremURLS;
}

export interface URLS {
  userMenu: UserMenuURLS;
  mongoSelect: MongoSelectURLS;
  orgNav: OrgNavURLS;
  projectNav: ProjectNavURLS;
  onPrem: Required<OnPremURLS>;
}

export interface HostsInterface {
  account?: string;
  charts?: string;
  cloud?: string;
  realm?: string;
  support?: string;
  university?: string;
}

export interface OnChangeInterface {
  value: string;
  setData: Function;
  event: React.ChangeEvent;
}

export interface MongoNavInterface {
  /**
   * Describes what product is currently active.
   */
  activeProduct?: Product;

  /**
   * Determines what nav item is currently active.
   */
  activeNav?: ActiveNavElement;

  /**
   * Describes whether or not user is an `admin`.
   */
  admin?: boolean;

  /**
   * Callback invoked when user types into organization picker. Receives value of input as first argument and ChangeEvent as the second.
   */
  onOrganizationChange?: (OnChangeInterface: OnChangeInterface) => void;

  /**
   * Callback invoked when user types into project picker. Receives value of input as first argument and ChangeEvent as the second.
   */
  onProjectChange?: (OnChangeInterface: OnChangeInterface) => void;

  /**
   *  Function to determine destination URL when user selects a organization from the organization picker, see also `hosts`.
   */
  constructOrganizationURL?: (organization: OrganizationInterface) => string;

  /**
   *  Function to determine destination URL when user selects a project from the project picker, see also `hosts`.
   */
  constructProjectURL?: (project: ProjectInterface) => string;

  /**
   * Determines whether the project navigation should be shown.
   */
  showProjectNav?: boolean;

  /**
   * Object where keys are MDB products and values are the desired hostURL override for that product, to enable `<MongoNav />` to work across all environments.
   */
  hosts?: HostsInterface;

  /**
   * Object to enable custom overrides for every `href` used in `<MongoNav />`.
   */
  urls?: URLSProp;

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
   * onPrem config object with three keys: enabled, version and mfa
   */
  onPrem?: OnPremInterface;

  /**
   * ID for active organization, will cause a POST request to cloud to update
   * current active organization.
   */
  activeOrgId?: string;

  /**
   * ID for active project, will cause a POST request to cloud to update
   * current active project.
   */
  activeProjectId?: string;

  /**
   * Applies a className to the root element
   */
  className?: string;

  /**
   * Click EventHandler that receives a `type` as its first argument and the associated `MouseEvent` as its second
   * This prop provides a hook into product link and logout link clicks and allows consuming applications to handle routing internally
   */
  onElementClick?: (type: NavElement, event: React.MouseEvent) => void;

  /**
   * Determines whether or not the component will fetch data from cloud
   */
  loadData?: boolean;

  /**
   * Control fixtureData when in `dev` mode
   */
  dataFixtures?: RecursivePartial<DataInterface>;

  /**
   * Describes what platform is currently active.
   */
  activePlatform?: Platform;

  /**
   * Defines interval for alert polling
   */
  alertPollingInterval?: number;

  /**
   * Describes the environment that the consumer is in: `commercial` or `government`
   */
  environment?: Environment;
}
