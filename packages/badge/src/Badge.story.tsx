import { ComponentStory, Meta } from '@storybook/react';
import React from 'react';
import Badge from './Badge';

export default {
  title: 'Packages/Badge',
  component: Badge,
} as Meta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = args => <Badge {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: 'Badge',
};
