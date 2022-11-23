import { ComponentStory, Meta } from '@storybook/react';
import React from 'react';
import Badge from './Badge/Badge';
import { storybookArgTypes } from '@leafygreen-ui/lib';

export default {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    controls: {
      exclude: ['className'],
    },
  },
  args: {
    darkMode: false,
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
} as Meta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'Badge',
};
