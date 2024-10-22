import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { LineChart } from './LineChart';
import { makeData } from './utils';

export default {
  title: 'Charts/LineChart',
  component: LineChart,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

const Template: StoryFn<typeof LineChart> = ({ darkMode, ...rest }) => (
  <LeafyGreenProvider darkMode={darkMode}>
    <LineChart darkMode={darkMode} {...rest} />
  </LeafyGreenProvider>
);

export const LiveExample: StoryFn<typeof LineChart> = Template.bind({});
LiveExample.args = {
  data: makeData(1),
};
