import React from 'react';
import Badge from './Badge';

export default {
  title: 'Packages/Badge',
  component: Badge,
  parameters: { 
    controls: { exclude: ['children'] }
  }
};

const Template = ({ label, ...args }) => <Badge {...args}>{label}</Badge>;

export const Basic = Template.bind({})
Basic.args = { 
  label: 'Badge' 
};