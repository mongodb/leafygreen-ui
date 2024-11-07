import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { SortDirection, SortKey, TooltipProps } from './Tooltip/Tooltip.types';
import { LineProps } from './Line';
import { makeLineData } from './testUtils';
import {
  Chart,
  Grid,
  Line,
  Tooltip,
  XAxis,
  XAxisProps,
  YAxis,
  YAxisProps,
} from '.';

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
      description: 'X-axis formatter',
      name: 'Formatter',
      table: {
        disable: true,
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
      description: 'Y-axis formatter',
      name: 'Formatter',
      table: {
        disable: true,
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
    tooltipSortDirection: {
      control: 'select',
      options: SortDirection,
      description: 'Direction to sort tooltip values',
      name: 'SortDirection',
      table: {
        category: 'Tooltip',
      },
    },
    tooltipSortKey: {
      control: 'select',
      options: SortKey,
      description: 'Which key to sort tooltip values by',
      name: 'SortKey',
      table: {
        category: 'Tooltip',
      },
    },
    tooltipValueFormatter: {
      description: 'Tooltip value formatter',
      name: 'ValueFormatter',
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
  xAxisFormatter: XAxisProps['formatter'];
  yAxisFormatter: XAxisProps['formatter'];
  xAxisLabel: XAxisProps['label'];
  yAxisLabel: YAxisProps['label'];
  tooltipSortDirection: TooltipProps['sortDirection'];
  tooltipSortKey: TooltipProps['sortKey'];
  tooltipValueFormatter: TooltipProps['valueFormatter'];
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
    tooltipSortDirection,
    tooltipSortKey,
    tooltipValueFormatter,
  } = props;
  const [showTooltip, setShowTooltip] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);
  }, [showTooltip]);

  return (
    <Chart {...props}>
      <Grid vertical={verticalGridLines} horizontal={horizontalGridLines} />
      <Tooltip
        sortDirection={tooltipSortDirection}
        sortKey={tooltipSortKey}
        valueFormatter={tooltipValueFormatter}
      />
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
  yAxisFormatter: value => `${value}GB`,
  tooltipSortDirection: SortDirection.Desc,
  tooltipSortKey: SortKey.Value,
  tooltipValueFormatter: value => `${value} GB`,
};
