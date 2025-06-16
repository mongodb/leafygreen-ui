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
  type: 'determinate',
  label: 'Label',
  value: 27,
  maxValue: 200,
  valueType: 'percentage',
  size: 'default',
  variant: 'warning',
  showIcon: true,
  description: 'Helper text',
};
