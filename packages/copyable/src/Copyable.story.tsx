import React from 'react';
import { StoryFn } from '@storybook/react';

import { storybookArgTypes, StoryMetaType } from '@leafygreen-ui/lib';

import Copyable from '.';

const meta: StoryMetaType<typeof Copyable> = {
  title: 'Components/Copyable',
  component: Copyable,
  parameters: {
    default: 'Basic',
  },
  args: {
    copyable: true,
    shouldTooltipUsePortal: true,
    darkMode: false,
  },
  argTypes: {
    copyable: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
    shouldTooltipUsePortal: { control: 'boolean' },
    children: storybookArgTypes.children,
    darkMode: storybookArgTypes.darkMode,
  },
};

export default meta;

const Template: StoryFn<typeof Copyable> = args => (
  <div>
    <Copyable {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  label: 'Label',
  description: 'Description',
  children: 'npm install @leafygreen-ui/copyable',
};

export const LongText = Template.bind({});
LongText.args = {
  label: 'Label',
  description: 'Description',
  children: 'npm install @leafygreen-ui/leafygreen-provider',
};
