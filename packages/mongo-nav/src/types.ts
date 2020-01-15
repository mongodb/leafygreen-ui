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
  OM: 'OM',
} as const;

type PlanType = typeof PlanType[keyof typeof PlanType];

export { PlanType };

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
export interface DataInterface {
  account: AccountInterface;
  currentOrganization: OrganizationInterface;
  currentProject: CurrentProjectInterface;
  organizations: Array<OrganizationInterface>;
  projects: Array<ProjectInterface>;
}

export interface OverridesInterface {
  urls?: {
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
      accessManager?: string;
      support?: string;
      billing?: string;
    };
    projectNav?: {
      settings?: string;
      accessManager?: string;
      support?: string;
      integrations?: string;
      alerts?: string;
      activityFeed?: string;
    };
  };
  hosts?: {
    [k in Product]?: string;
  };
}
