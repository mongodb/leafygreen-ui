import {
  DataInterface,
  URLS,
  HostsInterface,
  OrganizationInterface,
  ProjectInterface,
} from './types';

export const dataFixtures: DataInterface = {
  account: {
    email: 'dev+only+mode@example.com',
    firstName: 'DevMode',
    lastName: 'Developer',
    shouldSeeAccountMfaBanner: true,
    hasLegacy2fa: true,
    openInvitations: 1,
    username: 'dev+only+mode@example.com',
    admin: false,
  },
  currentOrganization: {
    orgId: 'fakeOrgId1',
    orgName: 'Demo Organization',
    planType: 'atlas',
    paymentStatus: 'OK',
  },
  currentProject: {
    alertsOpen: 1,
    chartsActivated: false,
    orgId: 'fakeOrgId1',
    planType: 'atlas',
    projectId: 'fakeProjectId1',
    projectName: 'Demo Project 1',
    status: 'ACTIVE',
    useCNRegionsOnly: false,
  },
  organizations: [
    {
      orgId: 'fakeOrgId1',
      orgName: 'Demo Organization',
      planType: 'atlas',
    },
    {
      orgId: 'fakeOrgId2',
      orgName: 'Demo Organization 2',
      planType: 'cloud',
    },
  ],
  projects: [
    {
      orgId: 'fakeOrgId1',
      planType: 'atlas',
      projectId: 'fakeProjectId1',
      projectName: 'Demo Project 1',
    },
    {
      orgId: 'fakeOrgId2',
      planType: 'cloud',
      projectId: 'fakeProjectId2',
      projectName: 'Demo Project 2',
    },
  ],
};

export const urlFixtures: URLS = {
  userMenu: {
    cloud: {
      userPreferences: `https://cloud.mongodb.com/v2#/preferences/personalization`,
      organizations: `https://cloud.mongodb.com/v2#/preferences/organizations`,
      invitations: `https://cloud.mongodb.com/v2#/preferences/invitations`,
      mfa: `https://cloud.mongodb.com/v2#/preferences/2fa`,
    },
    university: {
      universityPreferences: `https://university.mongodb.com/override-test`,
    },
    support: {
      userPreferences: `https://support.mongodb.com/profile`,
    },
    account: {
      homepage: `https://account.mongodb.com/account/profile/overview`,
    },
    logout: `https://cloud.mongodb.com/user/signout`,
  },
  mongoSelect: {
    viewAllProjects: `https://cloud.mongodb.com/v2#/org/${dataFixtures.currentOrganization?.orgId}/projects`,
    newProject: `https://cloud.mongodb.com/v2#/org/${dataFixtures.currentOrganization?.orgId}/projects/create`,
    viewAllOrganizations: `https://cloud-dev.mongodb.com/v2#/preferences/organizations`,
    orgSettings: `https://cloud-dev.mongodb.com/v2#/org/${dataFixtures.currentOrganization?.orgId}/settings/general`,
  },
  orgNav: {
    leaf: `https://cloud.mongodb.com/v2#/org/${dataFixtures.currentOrganization?.orgId}/projects`,
    settings: `https://cloud.mongodb.com/v2#/org/${dataFixtures.currentOrganization?.orgId}/settings/general`,
    accessManager: `https://cloud.mongodb.com/v2#/org/${dataFixtures.currentOrganization?.orgId}/access/users`,
    support: `https://cloud.mongodb.com/v2#/org/${dataFixtures.currentOrganization?.orgId}/support`,
    billing: `https://cloud.mongodb.com/v2#/org/${dataFixtures.currentOrganization?.orgId}/billing/overview`,
    allClusters: `https://cloud.mongodb.com/v2#/clusters`,
    admin: `https://cloud.mongodb.com/v2/admin#general/overview/servers`,
  },
  projectNav: {
    settings: `https://cloud.mongodb.com/v2/${dataFixtures.currentProject?.projectId}#settings/groupSettings`,
    accessManager: `https://cloud.mongodb.com/v2/${dataFixtures.currentProject?.projectId}#access`,
    support: `https://cloud.mongodb.com/v2/${dataFixtures.currentProject?.projectId}#info/support`,
    integrations: `https://cloud.mongodb.com/v2/${dataFixtures.currentProject?.projectId}#integrations`,
    alerts: `https://cloud.mongodb.com/v2/${dataFixtures.currentProject?.projectId}#alerts`,
    activityFeed: `https://cloud.mongodb.com/v2/${dataFixtures.currentProject?.projectId}#activity`,
    invite: `https://cloud.mongodb.com/v2/${dataFixtures.currentProject?.projectId}#access/invite`,
    realm: `https://stitch.mongodb.com/groups/${dataFixtures.currentProject?.projectId}/apps`,
    charts: `https://cloud.mongodb.com/v2/${dataFixtures.currentProject?.projectId}#charts`,
  },
  onPrem: {
    profile: `https://cloud.mongodb.com/v2#/account/profile`,
    mfa: `https://cloud.mongodb.com/v2#/account/2fa`,
    personalization: `https://cloud.mongodb.com/v2#/account/personalization`,
    invitations: `https://cloud.mongodb.com/v2#/account/invitations`,
    organizations: `https://cloud.mongodb.com/v2#/account/organizations`,
    publicApiAccess: `https://cloud.mongodb.com/v2#/account/publicApi`,
    featureRequest: `https://feedback.mongodb.com`,
  },
};

export const hostDefaults = (
  isGovernment = false,
): Required<HostsInterface> => {
  return {
    account: 'https://account.mongodb.com',
    cloud: isGovernment
      ? 'https://cloud.mongodbgov.com'
      : 'https://cloud.mongodb.com',
    charts: 'https://charts.mongodb.com',
    realm: `https://realm.mongodb.com`,
    support: 'https://support.mongodb.com',
    university: 'https://university.mongodb.com',
  };
};

export const constructOrganizationURL = ({ orgId }: OrganizationInterface) =>
  `https://cloud.mongodb.com/v2#/org/${orgId}/projects`;

export const constructProjectURL = ({ projectId }: ProjectInterface) =>
  `https://cloud.mongodb.com/v2#/${projectId}`;
