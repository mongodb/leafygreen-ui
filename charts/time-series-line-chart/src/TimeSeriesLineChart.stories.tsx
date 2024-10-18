import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { TimeSeriesLineChart } from './TimeSeriesLineChart';
import { makeData } from './utils';

export default {
  title: 'Charts/TimeSeriesLineChart',
  component: TimeSeriesLineChart,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

const Template: StoryFn<typeof TimeSeriesLineChart> = props => (
  <TimeSeriesLineChart {...props} />
);

export const LiveExample: StoryFn<typeof TimeSeriesLineChart> = Template.bind(
  {},
);
LiveExample.args = {
  data: makeData(5),
};

export const AllLineColors: StoryFn<typeof TimeSeriesLineChart> = Template.bind(
  {},
);
AllLineColors.args = {
  data: makeData(15),
};
