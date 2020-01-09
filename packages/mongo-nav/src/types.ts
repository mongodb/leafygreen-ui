const ActiveProduct = {
  Account: 'account',
  Cloud: 'cloud',
  Support: 'support',
  University: 'university',
} as const;

type ActiveProduct = typeof ActiveProduct[keyof typeof ActiveProduct];

export { ActiveProduct };

export interface AccountInterface {
  email: string;
  firstName: string;
  lastName: string;
  openInvitations: number;
  username: string;
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

export interface OrganizationInterface {
  orgId: string;
  orgName: string;
  planType: PlanType;
}
export interface DataInterface {
  account: AccountInterface;
  alertsOpen: number;
  chartsActivated: boolean;
  currentOrganization: OrganizationInterface;
  currentProject: ProjectInterface;
  organizations: Array<OrganizationInterface>;
  projects: Array<ProjectInterface>;
}
