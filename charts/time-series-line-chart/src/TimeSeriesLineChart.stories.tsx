import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { TimeSeriesLineChart } from './TimeSeriesLineChart';
import { makeData } from './utils';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

export default {
  title: 'Charts/TimeSeriesLineChart',
  component: TimeSeriesLineChart,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

const Template: StoryFn<typeof TimeSeriesLineChart> = ({
  darkMode,
  ...rest
}) => (
  <LeafyGreenProvider darkMode={darkMode}>
    <TimeSeriesLineChart darkMode={darkMode} {...rest} />
  </LeafyGreenProvider>
);

export const LiveExample: StoryFn<typeof TimeSeriesLineChart> = Template.bind(
  {},
);
LiveExample.args = {
  data: makeData(1),
};
