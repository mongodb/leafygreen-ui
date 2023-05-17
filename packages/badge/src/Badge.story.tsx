import React from 'react';
import { ComponentStory } from '@storybook/react';

import { storybookArgTypes, StoryMetaType } from '@leafygreen-ui/lib';

import Badge from './Badge/Badge';

const meta: StoryMetaType<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    default: 'Basic',
  },
  args: {
    darkMode: false,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};
export default meta;

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'Badge',
};
