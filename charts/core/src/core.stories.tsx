import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import type { StoryFn, StoryObj } from '@storybook/react';

import { Combobox, ComboboxOption } from '@leafygreen-ui/combobox';

// import { css } from '@leafygreen-ui/emotion';
// import { LabelVariants } from './BaseHeader/BaseHeader.types';
import { HeaderProps } from './Header/Header.types';
import { SortDirection, SortKey, TooltipProps } from './Tooltip/Tooltip.types';
import { LineProps } from './Line';
import { makeLineData } from './testUtils';
import {
  Chart,
  ChartCard,
  Grid,
  Header,
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
  args: {
    data: makeLineData(10),
    groupInChartCard: true,
    horizontalGridLines: true,
    verticalGridLines: false,
    renderGrid: true,
    renderXAxis: true,
    xAxisType: 'time',
    renderYAxis: true,
    yAxisType: 'value',
    renderTooltip: true,
    tooltipSortDirection: SortDirection.Desc,
    tooltipSortKey: SortKey.Value,
    renderHeader: true,
    headerLabel: 'LeafyGreen Chart Header',
    headerCloseButtonShow: true,
    headerFullScreenButtonShow: true,
    headerResetButtonShow: true,
    chartCardLabel: 'LeafyGreen ChartCard',
    chartCardCloseButtonShow: true,
    chartCardFullScreenButtonShow: true,
    chartCardResetButtonShow: true,
    chartCardMoreInfoButtonShow: true,
    chartCardMessageText: 'This is a message',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    data: {
      control: 'object',
      description: 'Data to plot in chart',
      table: {
        category: 'Chart',
      },
    },
    groupInChartCard: {
      control: 'boolean',
      description: 'Group in ChartCard',
      name: 'GroupInChartCard',
      table: {
        category: 'ChartCard',
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
    renderGrid: {
      control: 'boolean',
      description: 'Render Grid',
      name: 'RenderGrid',
      table: {
        category: 'Grid',
      },
    },
    renderXAxis: {
      control: 'boolean',
      description: 'Render X-axis',
      name: 'RenderXAxis',
      table: {
        category: 'XAxis',
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
    renderYAxis: {
      control: 'boolean',
      description: 'Render Y-axis',
      name: 'RenderYAxis',
      table: {
        category: 'YAxis',
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
    renderTooltip: {
      control: 'boolean',
      description: 'Render Tooltip',
      name: 'RenderTooltip',
      table: {
        category: 'Tooltip',
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
    renderHeader: {
      control: 'boolean',
      description: 'Render header',
      name: 'RenderHeader',
      table: {
        category: 'Header',
      },
    },
    headerLabel: {
      control: 'text',
      description: 'Header label',
      name: 'Label',
      table: {
        category: 'Header',
      },
    },
    headerCloseButtonShow: {
      control: 'boolean',
      description: 'Show close button',
      name: 'CloseButtonShow',
      table: {
        category: 'Header',
      },
    },
    headerFullScreenButtonShow: {
      control: 'boolean',
      description: 'Show fullscreen button',
      name: 'FullScreenButtonShow',
      table: {
        category: 'Header',
      },
    },
    headerResetButtonShow: {
      control: 'boolean',
      description: 'Show reset button',
      name: 'ResetButtonShow',
      table: {
        category: 'Header',
      },
    },
    chartCardLabel: {
      control: 'text',
      description: 'ChartCard label',
      name: 'Label',
      table: {
        category: 'ChartCard',
      },
    },
    chartCardCloseButtonShow: {
      control: 'boolean',
      description: 'Show close button',
      name: 'CloseButtonShow',
      table: {
        category: 'ChartCard',
      },
    },
    chartCardFullScreenButtonShow: {
      control: 'boolean',
      description: 'Show fullscreen button',
      name: 'FullScreenButtonShow',
      table: {
        category: 'ChartCard',
      },
    },
    chartCardResetButtonShow: {
      control: 'boolean',
      description: 'Show reset button',
      name: 'ResetButtonShow',
      table: {
        category: 'ChartCard',
      },
    },
    chartCardMoreInfoButtonShow: {
      control: 'boolean',
      description: 'Show reset button',
      name: 'ResetButtonShow',
      table: {
        category: 'ChartCard',
      },
    },
    chartCardMessageText: {
      control: 'text',
      description: 'ChartCard message text',
      name: 'MessageText',
      table: {
        category: 'ChartCard',
      },
    },
  },
};

export const LiveExample: StoryObj<{
  data: Array<LineProps>;
  groupInChartCard: boolean;
  verticalGridLines: boolean;
  horizontalGridLines: boolean;
  renderGrid: boolean;
  renderXAxis: boolean;
  renderYAxis: boolean;
  xAxisType: XAxisProps['type'];
  yAxisType: YAxisProps['type'];
  xAxisFormatter: XAxisProps['formatter'];
  yAxisFormatter: XAxisProps['formatter'];
  xAxisLabel: XAxisProps['label'];
  yAxisLabel: YAxisProps['label'];
  renderTooltip: boolean;
  tooltipSortDirection: TooltipProps['sortDirection'];
  tooltipSortKey: TooltipProps['sortKey'];
  tooltipValueFormatter: TooltipProps['valueFormatter'];
  renderHeader: boolean;
  headerLabel: HeaderProps['label'];
  headerCloseButtonShow: boolean;
  headerFullScreenButtonShow: boolean;
  headerResetButtonShow: boolean;
  chartCardLabel: HeaderProps['label'];
  chartCardCloseButtonShow: boolean;
  chartCardFullScreenButtonShow: boolean;
  chartCardResetButtonShow: boolean;
  chartCardMoreInfoButtonShow: boolean;
}> = {
  render: props => {
    const {
      data,
      groupInChartCard,
      verticalGridLines,
      horizontalGridLines,
      renderGrid,
      renderXAxis,
      renderYAxis,
      xAxisType,
      xAxisFormatter,
      yAxisType,
      yAxisFormatter,
      xAxisLabel,
      yAxisLabel,
      renderTooltip,
      tooltipSortDirection,
      tooltipSortKey,
      tooltipValueFormatter,
      renderHeader,
      headerLabel,
      headerCloseButtonShow,
      headerFullScreenButtonShow,
      headerResetButtonShow,
      chartCardLabel,
      chartCardCloseButtonShow,
      chartCardFullScreenButtonShow,
      chartCardResetButtonShow,
      chartCardMoreInfoButtonShow,
    } = props;

    const charts = (
      <>
        <Chart>
          {renderHeader && (
            <Header
              label={headerLabel}
              closeButtonProps={{ show: headerCloseButtonShow }}
              fullScreenButtonProps={{ show: headerFullScreenButtonShow }}
              resetButtonProps={{ show: headerResetButtonShow }}
            />
          )}
          {renderGrid && (
            <Grid
              vertical={verticalGridLines}
              horizontal={horizontalGridLines}
            />
          )}
          {renderTooltip && (
            <Tooltip
              sortDirection={tooltipSortDirection}
              sortKey={tooltipSortKey}
              valueFormatter={tooltipValueFormatter}
            />
          )}
          {renderXAxis && (
            <XAxis
              type={xAxisType}
              formatter={xAxisFormatter}
              label={xAxisLabel}
            />
          )}
          {renderYAxis && (
            <YAxis
              type={yAxisType}
              formatter={yAxisFormatter}
              label={yAxisLabel}
            />
          )}
          {data.map(({ name, data }) => (
            <Line name={name} data={data} key={name} />
          ))}
        </Chart>
        <Chart>
          {renderHeader && (
            <Header
              label={headerLabel}
              closeButtonProps={{ show: headerCloseButtonShow }}
              fullScreenButtonProps={{ show: headerFullScreenButtonShow }}
              resetButtonProps={{ show: headerResetButtonShow }}
            />
          )}
          {renderGrid && (
            <Grid
              vertical={verticalGridLines}
              horizontal={horizontalGridLines}
            />
          )}
          {renderTooltip && (
            <Tooltip
              sortDirection={tooltipSortDirection}
              sortKey={tooltipSortKey}
              valueFormatter={tooltipValueFormatter}
            />
          )}
          {renderXAxis && (
            <XAxis
              type={xAxisType}
              formatter={xAxisFormatter}
              label={xAxisLabel}
            />
          )}
          {renderYAxis && (
            <YAxis
              type={yAxisType}
              formatter={yAxisFormatter}
              label={yAxisLabel}
            />
          )}
          {data.map(({ name, data }) => (
            <Line name={name} data={data} key={name} />
          ))}
        </Chart>
      </>
    );

    return groupInChartCard ? (
      <ChartCard
        label={chartCardLabel}
        numOfCharts={2}
        closeButtonProps={{ show: chartCardCloseButtonShow }}
        fullScreenButtonProps={{ show: chartCardFullScreenButtonShow }}
        resetButtonProps={{ show: chartCardResetButtonShow }}
        moreInfoButtonProps={{ show: chartCardMoreInfoButtonShow }}
        inputContent={
          <Combobox
            multiselect={true}
            label=""
            placeholder=""
            size="small"
            initialValue={['Label 1', 'Label 2']}
          >
            <ComboboxOption value="Label 1" />
            <ComboboxOption value="Label 2" />
            <ComboboxOption value="Label 3" />
          </Combobox>
        }
      >
        {charts}
      </ChartCard>
    ) : (
      <>{charts}</>
    );
  },
};
