const Product = {
  Account: 'account',
  Cloud: 'cloud',
  Support: 'support',
  University: 'university',
} as const;

type Product = typeof Product[keyof typeof Product];

export { Product };

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

enum SubMenuItems {
  userPreferences = 'User Preferences',
  invitations = 'Invitations',
  organizations = 'Organizations',
  videoPreferences = 'Video Preferences',
  tfa = 'Two-Factor Authorization',
  accountURL = 'accountURL',
}

export interface OverridesInterface {
  urls?: {
    mongoMenu?: { [k in Product]?: { [k in SubMenuItems]?: string } };
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
    cloud?: string;
    university?: string;
    support?: string;
    realm?: string;
    charts?: string;
  };
}
