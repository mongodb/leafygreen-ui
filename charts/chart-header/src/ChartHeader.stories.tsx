import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';
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
    onClick: action('expand-clicked'),
  },
  closeButtonProps: {
    show: true,
    onClick: action('close-clicked'),
  },
  resetButtonProps: {
    show: true,
    onClick: action('reset-clicked'),
  },
};
