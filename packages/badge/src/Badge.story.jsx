import React from 'react';
import Badge from './Badge';

export default {
  title: 'Packages/Badge',
  component: Badge,
};

const Template = ({ label, ...args }) => <Badge {...args}>{label}</Badge>;

export const Basic = Template.bind({})
Basic.parameters = { controls: { exclude: ['children'] }}
Basic.args = { 
  label: 'Badge' 
};