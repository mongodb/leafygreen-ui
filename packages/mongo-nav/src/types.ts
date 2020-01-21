const Product = {
  Account: 'account',
  Charts: 'charts',
  Cloud: 'cloud',
  Stitch: 'stitch',
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
};

type NavItem = typeof NavItem[keyof typeof NavItem] | '';

export { NavItem };

export interface AccountInterface {
  email: string;
  firstName: string;
  lastName: string;
  openInvitations?: number;
  username?: string;
}

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

const OrgPaymentLabel = {
  Embargoed: 'embargoed',
  EmbargoConfirmed: 'embargo confirmed',
  Ok: 'ok',
  Warning: 'warning',
  Suspended: 'suspended',
  Closing: 'closing',
  AdminSuspended: 'admin suspended',
  Dead: 'dead',
  Locked: 'locked',
  Closed: 'closed',
};

type OrgPaymentLabel = typeof OrgPaymentLabel[keyof typeof OrgPaymentLabel];

export { OrgPaymentLabel };

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
  readonly currentOrganization: CurrentOrganizationInterface;
  readonly currentProject: CurrentProjectInterface;
  readonly organizations: Array<OrganizationInterface>;
  readonly projects: Array<ProjectInterface>;
}

export interface URLSInterface {
  mongoMenu?: {
    cloud?: {
      userPreferences: string;
      organizations: string;
      invitations: string;
      tfa: string;
    };
    university?: {
      videoPreferences: string;
    };
    support?: {
      userPreferences: string;
    };
    account?: {
      accountURL?: string;
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

export interface HostsInterface {
  account?: string;
  charts?: string;
  cloud?: string;
  stitch?: string;
  support?: string;
  university?: string;
}
