import React from 'react';
import { StoryFn } from '@storybook/react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';

import { LineChart } from '.';

export default {
  title: 'Charts/LineChart',
  component: LineChart,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

const Template: StoryFn<typeof LineChart> = props => (
  <div style={{ height: '360px', width: '100%' }}>
    <LineChart {...props} />
  </div>
);

export const Basic: StoryFn<typeof LineChart> = Template.bind({});
