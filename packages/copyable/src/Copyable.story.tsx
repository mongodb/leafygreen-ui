import { ComponentStory } from '@storybook/react';
import React from 'react';
import Copyable from '.';

export default {
  title: 'Packages/Copyable',
  component: Copyable,
  args: {
    isCopyable: true,
  },
};

const Template: ComponentStory<typeof Copyable> = args => (
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
