import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { LineProps } from './Line';
import { makeLineData } from './testUtils';
import { Chart, Grid, Line, XAxis, XAxisProps, YAxis, YAxisProps } from '.';

export default {
  title: 'Charts/Core',
  component: Chart,
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    data: {
      control: 'object',
      description: 'Data to plot in chart',
      table: {
        category: 'Chart',
      },
    },
    verticalGridLines: {
      control: 'boolean',
      description: 'Show vertical grid lines',
      name: 'Vertical',
      table: {
        category: 'Grid',
      },
    },
    horizontalGridLines: {
      control: 'boolean',
      description: 'Show horizontal grid lines',
      name: 'Horizontal',
      table: {
        category: 'Grid',
      },
    },
    xAxisType: {
      control: 'select',
      options: ['time', 'value', 'category', 'log'],
      description: 'Type of x-axis',
      name: 'Type',
      table: {
        category: 'XAxis',
      },
    },
    xAxisFormatter: {
      control: 'text',
      description: 'X-axis formatter',
      name: 'Formatter',
      table: {
        category: 'XAxis',
      },
    },
    xAxisLabel: {
      control: 'text',
      description: 'X-axis label',
      name: 'Label',
      table: {
        category: 'XAxis',
      },
    },
    yAxisType: {
      control: 'select',
      options: ['time', 'value', 'category', 'log'],
      description: 'Type of y-axis',
      name: 'Type',
      table: {
        category: 'YAxis',
      },
    },
    yAxisFormatter: {
      control: 'text',
      description: 'Y-axis formatter',
      name: 'Formatter',
      table: {
        category: 'YAxis',
      },
    },
    yAxisLabel: {
      control: 'text',
      description: 'Y-axis label',
      name: 'Label',
      table: {
        category: 'YAxis',
      },
    },
    onChartReady: {
      action: 'onChartReady',
      description: 'Callback when chart is ready',
      table: {
        disable: true,
      },
    },
  },
  decorator: (Instance, context) => {
    return <Instance darkMode={context?.args.darkMode} />;
  },
};

interface StoryChartProps {
  data: Array<LineProps>;
  verticalGridLines: boolean;
  horizontalGridLines: boolean;
  xAxisType: XAxisProps['type'];
  yAxisType: YAxisProps['type'];
  xAxisFormatter: string;
  yAxisFormatter: string;
  xAxisLabel: string;
  yAxisLabel: string;
}

const Template: React.FC<StoryChartProps> = props => {
  const {
    data,
    verticalGridLines,
    horizontalGridLines,
    xAxisType,
    xAxisFormatter,
    yAxisType,
    yAxisFormatter,
    xAxisLabel,
    yAxisLabel,
  } = props;

  return (
    <Chart {...props}>
      <Grid vertical={verticalGridLines} horizontal={horizontalGridLines} />
      <XAxis type={xAxisType} formatter={xAxisFormatter} label={xAxisLabel} />
      <YAxis type={yAxisType} formatter={yAxisFormatter} label={yAxisLabel} />
      {data.map(({ name, data }) => (
        <Line name={name} data={data} key={name} />
      ))}
    </Chart>
  );
};

export const LiveExample: StoryFn<StoryChartProps> = Template.bind({});
LiveExample.args = {
  data: makeLineData(10),
  horizontalGridLines: true,
  verticalGridLines: false,
  xAxisType: 'time',
  yAxisType: 'value',
  xAxisFormatter: '{hh}:{mm}',
  yAxisFormatter: '{value}GB',
};