import { ComponentStory, Meta } from '@storybook/react';
import React from 'react';
import Badge from './Badge';

export default {
  title: 'Packages/Badge',
  component: Badge,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    className: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'Badge',
};
