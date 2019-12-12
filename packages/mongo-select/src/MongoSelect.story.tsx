import React from 'react';
import { storiesOf } from '@storybook/react';
import MongoSelect, { Variant } from '.';

const organizationData = [
  { name: 'GlobalWork', product: 'Atlas' },
  { name: 'LocalWork', product: 'Atlas' },
  { name: 'Pizza on Demand', product: 'Atlas' },
  { name: 'YouWork', product: 'Atlas' },
  { name: 'YouWork Enterprise', product: 'Cloud Manager' },
  { name: 'Dave Enterprise', product: 'Cloud Manager' },
  { name: 'Dave Rob Enterprise', product: 'Cloud Manager' },
  { name: 'Brooke Design Systems', product: 'Cloud Manager' },
  { name: 'Harry Wolff Design Systems', product: 'Cloud Manager' },
  { name: 'Fred Design Systems', product: 'Cloud Manager' },
];

const projectData = [
  { name: 'Core', details: { clusters: 2, apps: 1, dashboards: 4 } },
  { name: 'London', details: { dashboards: 20 } },
  { name: 'Madrid', details: { clusters: 30, apps: 1 } },
  { name: 'Toronto', details: { dashboards: 10 } },
  { name: 'Vancouver', details: { clusters: 3, apps: 2 } },
];

storiesOf('MongoSelect', module)
  .add('Organization', () => (
    <MongoSelect
      variant={Variant.Organization}
      data={organizationData}
      selected="YouWork"
    />
  ))
  .add('Project', () => (
    <MongoSelect variant={Variant.Project} data={projectData} selected="Core" />
  ));
