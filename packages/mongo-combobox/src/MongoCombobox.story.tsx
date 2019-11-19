import React from 'react';
import { storiesOf } from '@storybook/react';
import MongoCombobox from '.';

const data = [
  { name: 'GlobalWork', product: 'Atlas' },
  { name: 'LocalWork', product: 'Atlas' },
  { name: 'Pizza on Demand', product: 'Atlas' },
  { name: 'YouWork', product: 'Atlas' },
  { name: 'YouWork Enterprise', product: 'Cloud Manager' },
];

storiesOf('MongoCombobox', module).add('Default', () => (
  <MongoCombobox
    selected="YouWork"
    title="Select an Organization"
    data={data}
    placeholder="Search by Organization"
  />
));
