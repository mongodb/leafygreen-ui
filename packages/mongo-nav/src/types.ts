const Product = {
  Account: 'account',
  Charts: 'charts',
  Cloud: 'cloud',
  Realm: 'realm',
  Support: 'support',
  University: 'university',
} as const;

type Product = typeof Product[keyof typeof Product];

export { Product };

const NavItem = {
  Billing: 'billing',
  Support: 'support',
  AccessManager: 'accessManager',
  AllClusters: 'allClusters',
  Admin: 'admin',
  OrgSettings: 'orgSettings',
  UserSettings: 'userSettings',
} as const;

type NavItem = typeof NavItem[keyof typeof NavItem];

export { NavItem };

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

export interface AccountInterface {
  email: string;
  firstName: string;
  lastName: string;
  openInvitations?: number;
  username?: string;
}

export interface ProjectInterface {
  projectId: string;
  projectName: string;
  planType: PlanType;
  orgId: string;
}

export interface CurrentProjectInterface extends ProjectInterface {
  alertsOpen: number;
  chartsActivated: boolean;
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

export interface URLSInterface {
  userMenu?: {
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
    invite?: string;
  };
  onPrem?: {
    profile?: string;
    mfa?: string;
    personalization?: string;
    invitations?: string;
    organizations?: string;
    featureRequest?: string;
  };
}

export interface HostsInterface {
  account?: string;
  charts?: string;
  cloud?: string;
  realm?: string;
  support?: string;
  university?: string;
}
