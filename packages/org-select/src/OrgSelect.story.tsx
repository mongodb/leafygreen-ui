import React from 'react';
import { storiesOf } from '@storybook/react';
import OrgSelect from '.';

const data = [
  { name: 'GlobalWork', product: 'Atlas' },
  { name: 'LocalWork', product: 'Atlas' },
  { name: 'Pizza on Demand', product: 'Atlas' },
  { name: 'YouWork', product: 'Atlas' },
  { name: 'YouWork Enterprise', product: 'Cloud Manager' },
  { name: 'Dave Enterprise', product: 'Cloud Manager' },
  { name: 'Dave Rob Enterprise', product: 'Cloud Manager' },
  { name: 'BRooke Design Systems', product: 'Cloud Manager' },
  { name: 'Harry Wolff Design Systems', product: 'Cloud Manager' },
  { name: 'Fred Design Systems', product: 'Cloud Manager' },
];

storiesOf('OrgSelect', module).add('Default', () => (
  <OrgSelect selected="YouWork" data={data} />
));
