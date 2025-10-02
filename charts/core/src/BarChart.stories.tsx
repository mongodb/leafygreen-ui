import React from 'react';
import { Legend } from '@lg-charts/legend';
import { SeriesProvider } from '@lg-charts/series-provider';
import type { StoryObj } from '@storybook/react';

import { Bar, BarProps, Chart, ChartGrid, ChartTooltip, XAxis, YAxis } from '.';

export default {
  title: 'Composition/Charts/Core',
  component: Chart,
};

// prettier-ignore
const barData: Array<BarProps> = [
  {
    name: 'Free usage',
    stack: undefined,
    data: [
      ['2024-09-01', 11], ['2024-09-02', 15], ['2024-09-03', 6],
      ['2024-09-04', 6], ['2024-09-05', 0], ['2024-09-06', 0],
      ['2024-09-07', 0], ['2024-09-08', 0], ['2024-09-09', 0],
      ['2024-09-10', 0], ['2024-09-11', 0], ['2024-09-12', 0],
      ['2024-09-13', 0], ['2024-09-14', 0], ['2024-09-15', 0],
      ['2024-09-16', 0], ['2024-09-17', 0], ['2024-09-18', 0],
      ['2024-09-19', 0], ['2024-09-20', 0], ['2024-09-21', 0],
      ['2024-09-22', 0], ['2024-09-23', 0], ['2024-09-24', 0],
      ['2024-09-25', 0], ['2024-09-26', 0], ['2024-09-27', 0],
      ['2024-09-28', 0], ['2024-09-29', 0], ['2024-09-30', 0]
    ],
  },
  {
    name: 'Paid usage',
    stack: undefined,
    data: [
      ['2024-09-01', 0], ['2024-09-02', 0], ['2024-09-03', 0],
      ['2024-09-04', 15], ['2024-09-05', 11], ['2024-09-06', 11],
      ['2024-09-07', 14], ['2024-09-08', 10], ['2024-09-09', 10],
      ['2024-09-10', 10], ['2024-09-11', 11], ['2024-09-12', 11],
      ['2024-09-13', 11], ['2024-09-14', 11], ['2024-09-15', 15],
      ['2024-09-16', 10], ['2024-09-17', 15], ['2024-09-18', 10],
      ['2024-09-19', 15], ['2024-09-20', 13], ['2024-09-21', 10],
      ['2024-09-22', 11], ['2024-09-23', 14], ['2024-09-24', 12],
      ['2024-09-25', 10], ['2024-09-26', 10], ['2024-09-27', 10],
      ['2024-09-28', 14], ['2024-09-29', 12], ['2024-09-30', 25]
    ],
  },
];

export const Bar_: StoryObj<{
  seriesList: Array<BarProps>;
  legend: boolean;
  horizontalGridLines: boolean;
  verticalGridLines: boolean;
  xAxisFormatter: string;
  yAxisFormatter: string;
  tooltip: boolean;
  stacked: boolean;
}> = {
  name: 'Bar',
  args: {
    seriesList: barData,
    legend: true,
    horizontalGridLines: true,
    verticalGridLines: true,
    xAxisFormatter: '{M}/{dd}',
    yAxisFormatter: '${value}',
    tooltip: true,
    stacked: true,
  },
  argTypes: {
    seriesList: {
      control: 'object',
      description: 'List of series to plot in chart',
      table: {
        category: 'Chart',
      },
    },
    legend: {
      control: 'boolean',
      description:
        'Whether to show the legend and use series provider to complement it',
      table: {
        category: 'Chart',
      },
    },
    horizontalGridLines: {
      control: 'boolean',
      description: 'Whether to show the horizontal grid lines',
      table: {
        category: 'Chart',
      },
    },
    verticalGridLines: {
      control: 'boolean',
      description: 'Whether to show the vertical grid lines',
      table: {
        category: 'Chart',
      },
    },
    xAxisFormatter: {
      control: 'text',
      description: 'Formatter for the x-axis',
      table: {
        category: 'Chart',
      },
    },
    yAxisFormatter: {
      control: 'text',
      description: 'Formatter for the y-axis',
      table: {
        category: 'Chart',
      },
    },
    tooltip: {
      control: 'boolean',
      description: 'Whether to show the tooltip',
      table: {
        category: 'Chart',
      },
    },
    stacked: {
      control: 'boolean',
      description: 'Whether to stack the series',
      table: {
        category: 'Chart',
      },
    },
  },
  render: ({
    seriesList,
    legend,
    horizontalGridLines,
    verticalGridLines,
    xAxisFormatter,
    yAxisFormatter,
    tooltip,
    stacked,
  }) => {
    const names = seriesList.map(bar => bar.name);

    // create bar series from data
    // what makes a bar chart different from a line chart
    const stackedSeriesList = !stacked
      ? seriesList
      : seriesList.map(series => ({
          ...series,
          stack: 'usage',
        }));
    const data = (
      <>
        {stackedSeriesList.map(series => (
          <Bar key={`${series.name}-${series.stack}`} {...series} />
        ))}
      </>
    );

    // build chart with optional features
    const chart = (
      <Chart>
        {legend && <Legend series={names} />}
        <ChartGrid
          vertical={verticalGridLines}
          horizontal={horizontalGridLines}
        />
        <YAxis type="value" formatter={yAxisFormatter} />
        <XAxis type="time" formatter={xAxisFormatter} />
        {tooltip && <ChartTooltip />}
        {data}
      </Chart>
    );

    // wrap in series provider if legend is true
    return legend ? (
      <SeriesProvider series={names}>{chart}</SeriesProvider>
    ) : (
      chart
    );
  },
};
