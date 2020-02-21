import { DataInterface, URLSInterface, HostsInterface } from './types';

export const dataFixtures = {
  account: {
    email: 'dev+only+mode@example.com',
    firstName: 'DevMode',
    lastName: 'Developer',
    openInvitations: 1,
    username: 'dev+only+mode@example.com',
  },
  currentOrganization: {
    orgId: '5d729a93',
    orgName: 'Demo Organization',
    planType: 'atlas',
    paymentStatus: 'OK',
  },
  currentProject: {
    alertsOpen: 1,
    chartsActivated: false,
    orgId: '5d729a93',
    planType: 'cloud',
    projectId: '020019e',
    projectName: 'Test Project',
  },
  organizations: [
    {
      orgId: '5d729a93',
      orgName: 'Demo Organization',
      planType: 'atlas',
    },
    {
      orgId: '5e0fa79',
      orgName: 'Demo Organization 2',
      planType: 'cloud',
    },
  ],
  projects: [
    {
      orgId: '5d729a93',
      planType: 'cloud',
      projectId: '020019e',
      projectName: 'Demo Project 1',
    },
    {
      orgId: '5e0fa79',
      planType: 'cloud',
      projectId: '00626a',
      projectName: 'Demo Project 2',
    },
  ],
} as DataInterface;

export const urlDefaults: Required<URLSInterface> = {
  userMenu: {
    cloud: {
      userPreferences: `https://cloud.mongodb.com/v2#/preferences/personalization`,
      organizations: `https://cloud.mongodb.com/v2#/preferences/organizations`,
      invitations: `https://cloud.mongodb.com/v2#/preferences/invitations`,
      mfa: `https://cloud.mongodb.com/v2#/preferences/2fa`,
    },
    university: {
      videoPreferences: `https://university.mongodb.com/override-test`,
    },
    support: {
      userPreferences: `https://support.mongodb.com/profile`,
    },
    account: {
      homepage: `https://account.mongodb.com/account/profile/overview`,
    },
  },
  mongoSelect: {
    viewAllProjects: `https://cloud.mongodb.com/v2#/org/${dataFixtures.currentOrganization?.orgId}/projects`,
    newProject: `https://cloud.mongodb.com/v2#/org/${dataFixtures.currentOrganization?.orgId}/projects/create`,
    viewAllOrganizations: `https://cloud-dev.mongodb.com/v2#/preferences/organizations`,
    orgSettings: `https://cloud-dev.mongodb.com/v2#/org/${dataFixtures.currentOrganization?.orgId}/settings/general`,
  },
  orgNav: {
    settings: `https://cloud.mongodb.com/v2#/org/${dataFixtures.currentOrganization?.orgId}/settings/general`,
    accessManager: `https://cloud.mongodb.com/v2#/org/${dataFixtures.currentOrganization?.orgId}/access/users`,
    support: `https://cloud.mongodb.com/v2#/org/${dataFixtures.currentOrganization?.orgId}/support`,
    billing: `https://cloud.mongodb.com/v2#/org/${dataFixtures.currentOrganization?.orgId}/billing/overview`,
    allClusters: `https://cloud.mongodb.com/v2#/clusters`,
    admin: `https://cloud.mongodb.com/v2/admin#general/overview/servers`,
  },
  projectNav: {
    settings: `https://cloud.mongodb.com/v2/currentProjectId098#settings/groupSettings`,
    accessManager: `https://cloud.mongodb.com/v2/currentProjectId098#access`,
    support: `https://cloud.mongodb.com/v2/currentProjectId098#info/support`,
    integrations: `https://cloud.mongodb.com/v2/currentProjectId098#integrations`,
    alerts: `https://cloud.mongodb.com/v2/currentProjectId098#alerts`,
    activityFeed: `https://cloud.mongodb.com/v2/currentProjectId098#activity`,
  },
};

export const hostDefaults: Required<HostsInterface> = {
  account: 'https://account.mongodb.com',
  cloud: 'https://cloud.mongodb.com',
  charts: 'https://charts.mongodb.com',
  realm: 'https://stitch.mongodb.com',
  support: 'https://support.mongodb.com',
  university: 'https://university.mongodb.com',
};

export const constructOrganizationURL = (orgId: string) =>
  `https://cloud.mongodb.com/v2#/org/${orgId}/projects`;

export const constructProjectURL = (projectId: string) =>
  `https://cloud.mongodb.com/v2#/${projectId}`;
