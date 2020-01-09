import React from 'react';
import { storiesOf } from '@storybook/react';
import MongoSelect, { Variant, PlanType } from './MongoSelect';

const generateId = () =>
  Math.random()
    .toString(36)
    .substring(7);

const organizationData = [
  { orgId: generateId(), orgName: 'GlobalWork', planType: PlanType.Atlas },
  { orgId: generateId(), orgName: 'LocalWork', planType: PlanType.Atlas },
  { orgId: generateId(), orgName: 'Pizza on Demand', planType: PlanType.Atlas },
  { orgId: generateId(), orgName: 'YouWork', planType: PlanType.Atlas },
  {
    orgId: generateId(),
    orgName: 'YouWork Enterprise',
    planType: PlanType.Cloud,
  },
  {
    orgId: generateId(),
    orgName: 'Dave Enterprise',
    planType: PlanType.Cloud,
  },
  {
    orgId: generateId(),
    orgName: 'Dave Rob Enterprise',
    planType: PlanType.Cloud,
  },
  {
    orgId: generateId(),
    orgName: 'Brooke Design Systems',
    planType: PlanType.Cloud,
  },
  {
    orgId: generateId(),
    orgName: 'Harry Wolff Design Systems',
    planType: PlanType.Cloud,
  },
  {
    orgId: generateId(),
    orgName: 'Fred Design Systems',
    planType: PlanType.Cloud,
  },
];

const projectData = [
  {
    projectId: generateId(),
    projectName: 'Core',
    orgId: generateId(),
    planType: PlanType.Atlas,
  },
  {
    projectId: generateId(),
    projectName: 'London',
    orgId: generateId(),
    planType: PlanType.Atlas,
  },
  {
    projectId: generateId(),
    projectName: 'Madrid',
    orgId: generateId(),
    planType: PlanType.Atlas,
  },
  {
    projectId: generateId(),
    projectName: 'Toronto',
    orgId: generateId(),
    planType: PlanType.Atlas,
  },
  {
    projectId: generateId(),
    projectName: 'Vancouver',
    orgId: generateId(),
    planType: PlanType.Atlas,
  },
];

storiesOf('MongoSelect', module)
  .add('Organization', () => (
    <MongoSelect
      variant={Variant.Organization}
      data={organizationData}
      selected={organizationData[4]}
      constructOrganizationURL={orgID =>
        `https://cloud.mongodb.com/organizations/${orgID}`
      }
    />
  ))
  .add('Project', () => (
    <MongoSelect
      variant={Variant.Project}
      data={projectData}
      selected={projectData[0]}
      constructProjectURL={(orgID, projectID) =>
        `https://cloud.mongodb.com/organizations/${orgID}/${projectID}`
      }
    />
  ));
