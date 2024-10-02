import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { LineChart } from '.';
import { getSeriesOptionsSample } from './utils/getSeriesOptionsSample';

export default {
  title: 'Charts/LineChart',
  component: LineChart,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

const Template: StoryFn<typeof LineChart> = props => <LineChart {...props} />;

console.log(getSeriesOptionsSample(2));

export const Basic: StoryFn<typeof LineChart> = Template.bind({});
Basic.args = {
  series: getSeriesOptionsSample(7),
};
