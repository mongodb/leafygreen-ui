import React from 'react';
import { StoryFn } from '@storybook/react';

import { ProgressBar } from '.';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBar,
};

const Template: StoryFn<typeof ProgressBar> = props => (
  <ProgressBar {...props} />
);

export const TestExample = Template.bind({});
TestExample.args = {
  label: 'Label',
  value: 50,
  maxValue: 100,
  size: 'default',
  variant: 'success',
  showIcon: true,
  description: 'Helper text',
};
