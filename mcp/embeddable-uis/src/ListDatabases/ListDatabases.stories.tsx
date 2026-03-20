import React from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { ListDatabases } from './ListDatabases';
import { Database, ListDatabasesProps } from './ListDatabases.types';

const mockDatabases: Array<Database> = [
  { name: 'admin', size: 40960 },
  { name: 'config', size: 73728 },
  { name: 'local', size: 81920 },
  { name: 'sample_airbnb', size: 52428800 },
  { name: 'sample_analytics', size: 9437184 },
  { name: 'sample_geospatial', size: 1048576 },
  { name: 'sample_mflix', size: 104857600 },
  { name: 'sample_restaurants', size: 7340032 },
  { name: 'sample_supplies', size: 1048576 },
  { name: 'sample_training', size: 62914560 },
  { name: 'sample_weatherdata', size: 2621440 },
];

const meta: StoryMetaType<typeof ListDatabases> = {
  title: 'MCP/Embeddable UIs/ListDatabases',
  component: ListDatabases,
  argTypes: {
    darkMode: { control: 'boolean' },
  },
  args: {
    databases: mockDatabases,
    darkMode: false,
  },
  parameters: {
    default: 'LiveExample',
  },
};

export default meta;

const Template: StoryFn<ListDatabasesProps> = args => (
  <ListDatabases {...args} />
);

export const LiveExample = Template.bind({});
LiveExample.args = {
  databases: mockDatabases,
  darkMode: false,
};

export const DarkMode = Template.bind({});
DarkMode.args = {
  databases: mockDatabases,
  darkMode: true,
};
DarkMode.parameters = {
  backgrounds: { default: 'dark' },
};

export const EmptyList = Template.bind({});
EmptyList.args = {
  databases: [],
  darkMode: false,
};

export const SingleDatabase = Template.bind({});
SingleDatabase.args = {
  databases: [{ name: 'production', size: 1073741824 }],
  darkMode: false,
};
