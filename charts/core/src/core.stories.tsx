import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Chart } from './Chart';
import { Line } from './Line';
import { makeLineData } from './utils';

export default {
  title: 'Charts/Core',
  component: Chart,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    data: {
      control: {
        type: 'object',
      },
    },
  },
  decorator: (Instance, context) => {
    return <Instance darkMode={context?.args.darkMode} />;
  },
};

const Template: StoryFn<typeof Chart> = props => {
  return (
    <Chart {...props}>
      {makeLineData(10).map(({ name, data }) => (
        <Line name={name} data={data} key={name} />
      ))}
    </Chart>
  );
};

export const LiveExample: StoryFn = Template.bind({});
LiveExample.args = {};
