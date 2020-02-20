import { DataInterface } from './types';

export default {
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
