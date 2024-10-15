import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Chart } from './Chart';
import { Axis } from './Axis';
import { Line } from './Line';
import { Grid } from './Grid';

export default {
  title: 'Charts/Core/Chart',
  component: Chart,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
  },
};

const Template: StoryFn<typeof Chart> = props => (
  <Chart>
    {/* <Axis x={{ type: 'value' }} y={{ type: 'value' }} />
    <Grid horizontal /> */}
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
      name="another 0"
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
    <Line
      name="another 1"
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
    <Line
      name="another 2"
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
    <Line
      name="another 3"
      data={[
        [0, 14],
        [1, 15],
        [2, 16],
        [3, 17],
        [4, 18],
        [5, 19],
        [6, 20],
      ]}
    />
    <Line
      name="another 4"
      data={[
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
        [4, 2],
        [5, 2],
        [6, 2],
      ]}
    />
    <Line
      name="another 5"
      data={[
        [0, 12],
        [1, 13],
        [2, 14],
        [3, 15],
        [4, 16],
        [5, 17],
        [6, 18],
      ]}
    />
  </Chart>
);

export const Basic: StoryFn<typeof Chart> = Template.bind({});
Basic.args = {};
