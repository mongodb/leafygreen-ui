import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { Chart, Line, Grid } from '.';
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
    verticalGridLines: {
      control: {
        type: 'boolean',
      },
    },
    horizontalGridLines: {
      control: {
        type: 'boolean',
      },
    },
  },
  decorator: (Instance, context) => {
    return <Instance darkMode={context?.args.darkMode} />;
  },
};

interface StoryChartProps {
  data: Array<{
    name: string;
    data: Array<[Date, number]>;
  }>;
  verticalGridLines: boolean;
  horizontalGridLines: boolean;
}

const Template: StoryFn<StoryChartProps> = props => {
  const { data, verticalGridLines, horizontalGridLines } = props;
  return (
    <Chart {...props}>
      <Grid vertical={verticalGridLines} horizontal={horizontalGridLines} />
      {props.data.map(({ name, data }) => (
        <Line name={name} data={data} key={name} />
      ))}
    </Chart>
  );
};

export const LiveExample: StoryFn = Template.bind({});
LiveExample.args = {
  data: makeLineData(10),
  horizontalGridLines: true,
  verticalGridLines: false,
};
