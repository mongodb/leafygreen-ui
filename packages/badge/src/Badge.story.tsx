import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { storybookArgTypes } from '@leafygreen-ui/lib';

import Badge from './Badge/Badge';

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
