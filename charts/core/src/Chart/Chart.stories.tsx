import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Chart } from '.';
import { Axis } from '../Axis';
import { Line } from '../Line';

export default {
  title: 'Charts/Core/Chart',
  component: Chart,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

const Template: StoryFn<typeof Chart> = props => (
  <Chart>
    <Axis x={{ type: 'value' }} y={{ type: 'value' }} />
    <Line
      name="some series"
      data={[
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5],
        [6, 6],
      ]}
    />
    <Line
      name="another series"
      data={[
        [0, 7],
        [1, 6],
        [2, 5],
        [3, 4],
        [4, 3],
        [5, 2],
        [6, 1],
      ]}
    />
  </Chart>
);

export const Basic: StoryFn<typeof Chart> = Template.bind({});
Basic.args = {};
