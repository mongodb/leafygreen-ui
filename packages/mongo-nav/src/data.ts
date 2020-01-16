import { PlanType } from './types';

export default {
  account: {
    email: 'harry.wolff@mongodb.com',
    firstName: 'Harry',
    lastName: 'Wolff',
    openInvitations: 1,
    username: 'harry.wolff@mongodb.com',
  },
  currentOrganization: {
    orgId: '5d729a93',
    orgName: 'yay',
    planType: PlanType.Atlas,
    paymentStatus: 'ok',
  },
  currentProject: {
    alertsOpen: 1,
    chartsActivated: false,
    orgId: '5d729a93',
    planType: PlanType.Cloud,
    projectId: '020019e',
    projectName: 'asdf',
  },
  organizations: [
    {
      orgId: '5d729a93',
      orgName: 'yay',
      planType: PlanType.Atlas,
    },
    {
      orgId: '5e0fa79',
      orgName: 'cool',
      planType: PlanType.Cloud,
    },
  ],
  projects: [
    {
      orgId: '5d729a93',
      planType: PlanType.Cloud,
      projectId: '020019e',
      projectName: 'asdf',
    },
    {
      orgId: '5e0fa79',
      planType: PlanType.Cloud,
      projectId: '00626a',
      projectName: "let's do this",
    },
  ],
};
