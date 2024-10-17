import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { TimeSeriesLineChart } from './TimeSeriesLineChart';
import { generateData } from './testUtils';

export default {
  title: 'Charts/TimeSeriesLineChart',
  component: TimeSeriesLineChart,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

const Template: StoryFn<typeof TimeSeriesLineChart> = props => (
  <TimeSeriesLineChart data={generateData(5)} />
);

export const Basic: StoryFn<typeof TimeSeriesLineChart> = Template.bind({});
Basic.args = {};
