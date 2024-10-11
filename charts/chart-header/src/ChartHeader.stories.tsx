import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';
import { ChartHeader } from './ChartHeader/ChartHeader';

export default {
  title: 'Charts/Core/ChartHeader',
  component: ChartHeader,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

const Template: StoryFn<typeof ChartHeader> = props => (
  <ChartHeader {...props} />
);

export const Basic: StoryFn<typeof ChartHeader> = Template.bind({});
Basic.args = {
  label: 'Basic Chart Header',
  expandButtonProps: {
    show: true,
    onClick: () => alert('Expand Clicked'),
  },
  closeButtonProps: {
    show: true,
    onClick: () => alert('Close Clicked'),
  },
  resetButtonProps: {
    show: true,
    onClick: () => alert('Reset Clicked'),
  },
};
