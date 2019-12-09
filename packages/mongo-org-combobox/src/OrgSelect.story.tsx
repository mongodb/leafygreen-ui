import React from 'react';
import { storiesOf } from '@storybook/react';
import OrgSelect from '.';

const data = [
  { name: 'GlobalWork', product: 'Atlas' },
  { name: 'LocalWork', product: 'Atlas' },
  { name: 'Pizza on Demand', product: 'Atlas' },
  { name: 'YouWork', product: 'Atlas' },
  { name: 'YouWork Enterprise', product: 'Cloud Manager' },
];

storiesOf('OrgSelect', module).add('Default', () => (
  <OrgSelect selected="YouWork" data={data} />
));
