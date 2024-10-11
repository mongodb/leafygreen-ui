import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Chart } from '.';
import { Axis } from '../Axis';

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
  </Chart>
);

export const Basic: StoryFn<typeof Chart> = Template.bind({});
Basic.args = {};
