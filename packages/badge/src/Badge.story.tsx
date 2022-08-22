import { ComponentStory, Meta } from '@storybook/react';
import React from 'react';
import Badge from './Badge';
import defaultArgTypes from '../../../stories/defaultArgTypes';

export default {
  title: 'Components/Badge',
  component: Badge,
  args: {
    darkMode: false,
  },
  argTypes: {
    darkMode: defaultArgTypes.darkMode,
  },
} as Meta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'Badge',
};
