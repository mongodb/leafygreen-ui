import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import type { StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/test';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';

import { ChartProps } from './Chart/Chart.types';
import { HeaderProps } from './Header/Header.types';
import { SortDirection, SortKey, TooltipProps } from './Tooltip/Tooltip.types';
import { LineProps } from './Line';
import { makeLineData } from './testUtils';
import { ThresholdLineProps } from './ThresholdLine';
import {
  Chart,
  EventMarkerLine,
  EventMarkerLineProps,
  EventMarkerPoint,
  EventMarkerPointProps,
  Grid,
  Header,
  Line,
  ThresholdLine,
  Tooltip,
  XAxis,
  XAxisProps,
  YAxis,
  YAxisProps,
} from '.';

const lineData = makeLineData(5);

export default {
  title: 'Charts/Core',
  component: Chart,
  parameters: {
    default: 'LiveExample',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    chartState: {
      table: {
        disable: true,
      },
    },
    key: {
      table: {
        disable: true,
      },
    },
    ref: {
      table: {
        disable: true,
      },
    },
  },
};

export const LiveExample: StoryObj<{
  data: Array<LineProps>;
  chartState: ChartProps['chartState'];
  verticalGridLines: boolean;
  horizontalGridLines: boolean;
  renderGrid: boolean;
  renderXAxis: boolean;
  xAxisType: XAxisProps['type'];
  xAxisFormatter: XAxisProps['formatter'];
  xAxisLabel: XAxisProps['label'];
  renderYAxis: boolean;
  yAxisType: YAxisProps['type'];
  yAxisFormatter: YAxisProps['formatter'];
  yAxisLabel: YAxisProps['label'];
  renderTooltip: boolean;
  tooltipSortDirection: TooltipProps['sortDirection'];
  tooltipSortKey: TooltipProps['sortKey'];
  tooltipValueFormatter: TooltipProps['valueFormatter'];
  renderHeader: boolean;
  headerTitle: HeaderProps['title'];
  headerShowDivider: HeaderProps['showDivider'];
  zoomSelectXAxis: boolean;
  zoomSelectYAxis: boolean;
  zoomSelectCallback;
  renderEventMarkerLine: boolean;
  eventMarkerLineMessage: EventMarkerLineProps['message'];
  eventMarkerLineLabel: EventMarkerLineProps['label'];
  eventMarkerLineLevel: EventMarkerLineProps['level'];
  eventMarkerLinePosition: EventMarkerLineProps['position'];
  renderEventMarkerPoint: boolean;
  eventMarkerPointMessage: EventMarkerPointProps['message'];
  eventMarkerPointLabel: EventMarkerPointProps['label'];
  eventMarkerPointLevel: EventMarkerPointProps['level'];
  eventMarkerPointXPosition: EventMarkerPointProps['position'][0];
  eventMarkerPointYPosition: EventMarkerPointProps['position'][1];
  renderThresholdLine: true;
  thresholdLineLabel: ThresholdLineProps['label'];
  thresholdLineValue: ThresholdLineProps['value'];
  thresholdLinePosition: ThresholdLineProps['position'];
}> = {
  args: {
    data: lineData,
    chartState: 'unset',
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
    headerTitle: 'LeafyGreen Chart Header',
    headerShowDivider: true,
    zoomSelectXAxis: true,
    zoomSelectYAxis: true,
    zoomSelectCallback: () => {},
    renderEventMarkerLine: true,
    eventMarkerLineMessage: 'Event marker line message',
    eventMarkerLineLabel: 'Event marker line label',
    eventMarkerLineLevel: 'warning',
    eventMarkerLinePosition: new Date('2024-01-01T00:20:00').getTime(),
    renderEventMarkerPoint: true,
    eventMarkerPointMessage: 'Event marker point message',
    eventMarkerPointLabel: 'Event marker point label',
    eventMarkerPointLevel: 'warning',
    eventMarkerPointXPosition: new Date('2024-01-01T00:41:00').getTime(),
    eventMarkerPointYPosition: 739,
    renderThresholdLine: true,
    thresholdLineLabel: 'Cluster Limit',
    thresholdLineValue: '1400',
    thresholdLinePosition: 1400,
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
    chartState: {
      control: 'select',
      options: ['unset', 'loading'],
      description: 'The state of the chart',
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
    headerTitle: {
      control: 'text',
      description: 'Header title',
      name: 'Title',
      table: {
        category: 'Header',
      },
    },
    headerShowDivider: {
      control: 'boolean',
      description: 'Show divider in header',
      name: 'ShowDivider',
      table: {
        category: 'Header',
      },
    },
    zoomSelect: {
      table: {
        disable: true,
      },
    },
    zoomSelectXAxis: {
      control: 'boolean',
      description: 'Enable zoom selection on x-axis',
      name: 'XAxis',
      table: {
        category: 'ZoomSelect',
      },
    },
    zoomSelectYAxis: {
      control: 'boolean',
      description: 'Enable zoom selection on y-axis',
      name: 'YAxis',
      table: {
        category: 'ZoomSelect',
      },
    },
    onZoomSelect: {
      table: {
        disable: true,
      },
    },
    zoomSelectCallback: {
      table: {
        disable: true,
      },
    },
    groupId: {
      description: 'Group ID for synced tooltips',
      name: 'groupId',
      table: {
        category: 'Chart',
        disable: true,
      },
    },
    renderEventMarkerLine: {
      description: 'Show the event marker line',
      name: 'RenderEventMarkerLine',
      table: {
        category: 'EventMarkerLine',
      },
    },
    eventMarkerLineLabel: {
      description: 'Label rendered in the the event marker line tooltip',
      name: 'EventMarkerLineLabel',
      table: {
        category: 'EventMarkerLine',
      },
    },
    eventMarkerLineMessage: {
      description: 'Message rendered in the the event marker line tooltip',
      name: 'EventMarkerLineMessage',
      table: {
        category: 'EventMarkerLine',
      },
    },
    eventMarkerLineLevel: {
      description: 'Level of the event marker line',
      name: 'EventMarkerLineLevel',
      control: 'select',
      options: ['warning', 'info'],
      table: {
        category: 'EventMarkerLine',
      },
    },
    eventMarkerLinePosition: {
      description: 'Position of event marker line',
      name: 'EventMarkerLinePosition',
      table: {
        category: 'EventMarkerLine',
      },
    },
    renderEventMarkerPoint: {
      description: 'Show the event marker point',
      name: 'RenderEventMarkerPoint',
      table: {
        category: 'EventMarkerPoint',
      },
    },
    eventMarkerPointLabel: {
      description: 'Label rendered in the the event marker point tooltip',
      name: 'EventMarkerPointLabel',
      table: {
        category: 'EventMarkerPoint',
      },
    },
    eventMarkerPointMessage: {
      description: 'Message rendered in the the event marker point tooltip',
      name: 'EventMarkerPointMessage',
      table: {
        category: 'EventMarkerPoint',
      },
    },
    eventMarkerPointLevel: {
      description: 'Level of the event marker point',
      name: 'EventMarkerPointLevel',
      control: 'select',
      options: ['warning', 'info'],
      table: {
        category: 'EventMarkerPoint',
      },
    },
    eventMarkerPointXPosition: {
      description: 'Position of event marker point along x-axis',
      name: 'EventMarkerPointXPosition',
      table: {
        category: 'EventMarkerPoint',
      },
    },
    eventMarkerPointYPosition: {
      description: 'Position of event marker point along y-axis',
      name: 'EventMarkerPointYPosition',
      table: {
        category: 'EventMarkerPoint',
      },
    },
    renderThresholdLine: {
      description: 'Show the threshold line',
      name: 'RenderThresholdLine',
      table: {
        category: 'ThresholdLine',
      },
    },
    thresholdLineLabel: {
      description: 'Threshold line tooltip label.',
      name: 'ThresholdLineLabel',
      table: {
        category: 'ThresholdLine',
      },
    },
    thresholdLineValue: {
      description: 'Threshold line tooltip value.',
      name: 'ThresholdLineValue',
      table: {
        category: 'ThresholdLine',
      },
    },
    thresholdLinePosition: {
      description: 'Where along the y-axis the line should be positioned.',
      name: 'ThresholdLinePosition',
      table: {
        category: 'ThresholdLine',
      },
    },
  },
  render: ({
    data,
    chartState,
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
    headerTitle,
    headerShowDivider,
    zoomSelectXAxis,
    zoomSelectYAxis,
    zoomSelectCallback,
    renderEventMarkerLine,
    eventMarkerLineMessage,
    eventMarkerLineLabel,
    eventMarkerLineLevel,
    eventMarkerLinePosition,
    renderEventMarkerPoint,
    eventMarkerPointMessage,
    eventMarkerPointLabel,
    eventMarkerPointLevel,
    eventMarkerPointXPosition,
    eventMarkerPointYPosition,
    renderThresholdLine,
    thresholdLineLabel,
    thresholdLineValue,
    thresholdLinePosition,
  }) => {
    return (
      <Chart
        zoomSelect={{
          xAxis: zoomSelectXAxis,
          yAxis: zoomSelectYAxis,
        }}
        onZoomSelect={zoomSelectCallback}
        chartState={chartState}
      >
        {renderHeader && (
          <Header
            title={headerTitle}
            showDivider={headerShowDivider}
            headerContent={
              <div style={{ display: 'flex', justifyContent: 'right' }}>
                <IconButton aria-label="FullScreen">
                  <Icon glyph="FullScreenEnter" />
                </IconButton>
                <IconButton aria-label="Close">
                  <Icon glyph="X" />
                </IconButton>
              </div>
            }
          />
        )}
        {renderGrid && (
          <Grid vertical={verticalGridLines} horizontal={horizontalGridLines} />
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
        {renderEventMarkerPoint && (
          <EventMarkerPoint
            label={eventMarkerPointLabel}
            message={eventMarkerPointMessage}
            position={[eventMarkerPointXPosition, eventMarkerPointYPosition]}
            level={eventMarkerPointLevel}
          />
        )}
        {renderEventMarkerLine && (
          <EventMarkerLine
            position={eventMarkerLinePosition}
            label={eventMarkerLineLabel}
            message={eventMarkerLineMessage}
            level={eventMarkerLineLevel}
          />
        )}
        {renderThresholdLine && (
          <ThresholdLine
            position={thresholdLinePosition}
            label={thresholdLineLabel}
            value={thresholdLineValue}
          />
        )}
      </Chart>
    );
  },
};

/**
 * Explicitly testing dark mode regression since generated isn't possible given composibility
 */
export const DarkMode: StoryObj<{}> = {
  args: {
    darkMode: true,
  },
  render: () => {
    return (
      <Chart
        zoomSelect={{
          xAxis: true,
          yAxis: true,
        }}
        chartState="unset"
      >
        <Header
          title="Header"
          showDivider
          headerContent={
            <div style={{ display: 'flex', justifyContent: 'right' }}>
              <IconButton aria-label="FullScreen">
                <Icon glyph="FullScreenEnter" />
              </IconButton>
              <IconButton aria-label="Close">
                <Icon glyph="X" />
              </IconButton>
            </div>
          }
        />
        <Grid />
        <Tooltip />
        <XAxis type="time" />
        <YAxis type="value" />
        <ThresholdLine position={1300} label="Cluster Limit" value="1300" />
        <EventMarkerLine
          position={new Date('2024-01-01T00:20:00').getTime()}
          label="Event marker line label"
          message="Event marker line message"
          level="warning"
        />
        <EventMarkerPoint
          label="Event marker point label"
          message="Event marker point message"
          position={[new Date('2024-01-01T00:41:00').getTime(), 739]}
          level="warning"
        />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const ResizingWithContainer: StoryObj<{ containerWidth: number }> = {
  args: {
    containerWidth: 500,
  },
  render: ({ containerWidth }) => {
    return (
      <div style={{ width: containerWidth, overflow: 'hidden' }}>
        <Chart
          zoomSelect={{
            xAxis: true,
            yAxis: true,
          }}
          chartState="unset"
        >
          <Header
            title="Header"
            showDivider
            headerContent={
              <div style={{ display: 'flex', justifyContent: 'right' }}>
                <IconButton aria-label="FullScreen">
                  <Icon glyph="FullScreenEnter" />
                </IconButton>
                <IconButton aria-label="Close">
                  <Icon glyph="X" />
                </IconButton>
              </div>
            }
          />
          <Grid />
          <Tooltip />
          <XAxis type="time" />
          <YAxis type="value" />
          <ThresholdLine position={1300} label="Cluster Limit" value="1300" />
          <EventMarkerLine
            position={new Date('2024-01-01T00:20:00').getTime()}
            label="Event marker line label"
            message="Event marker line message"
            level="warning"
          />
          <EventMarkerPoint
            label="Event marker point label"
            message="Event marker point message"
            position={[new Date('2024-01-01T00:41:00').getTime(), 739]}
            level="warning"
          />
          {lineData.map(({ name, data }) => (
            <Line name={name} data={data} key={name} />
          ))}
        </Chart>
      </div>
    );
  },
};

export const Base: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <Tooltip />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithTooltip: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <Tooltip />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithXAxis: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <XAxis type="time" />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithYAxis: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <YAxis type="value" />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithGrid: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <Grid />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithVerticalGrid: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <Grid horizontal={false} />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithHorizontalGrid: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <Grid vertical={false} />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithHeader: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <Header title="Header" />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithHeaderAndDivider: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <Header title="Header" showDivider />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithHeaderContent: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <Header
          title="Header"
          showDivider
          headerContent={
            <div style={{ display: 'flex', justifyContent: 'right' }}>
              <IconButton aria-label="FullScreen">
                <Icon glyph="FullScreenEnter" />
              </IconButton>
              <IconButton aria-label="Close">
                <Icon glyph="X" />
              </IconButton>
            </div>
          }
        />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithThresholdLine: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <ThresholdLine position={1300} label="Cluster Limit" value="1300" />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithInfoEventMarkerPoint: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <EventMarkerPoint
          label="Event marker point label"
          message="Event marker point message"
          position={[new Date('2024-01-01T00:41:00').getTime(), 739]}
          level="info"
        />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithWarningEventMarkerPoint: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <EventMarkerPoint
          label="Event marker point label"
          message="Event marker point message"
          position={[new Date('2024-01-01T00:41:00').getTime(), 739]}
          level="warning"
        />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithInfoEventMarkerLine: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <EventMarkerLine
          position={new Date('2024-01-01T00:20:00').getTime()}
          label="Event marker line label"
          message="Event marker line message"
          level="info"
        />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithWarningEventMarkerLine: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <EventMarkerLine
          position={new Date('2024-01-01T00:20:00').getTime()}
          label="Event marker line label"
          message="Event marker line message"
          level="warning"
        />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithZoom: StoryObj<{}> = {
  render: () => {
    return (
      <Chart
        zoomSelect={{
          xAxis: true,
          yAxis: true,
        }}
      >
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithXAxisZoom: StoryObj<{}> = {
  render: () => {
    return (
      <Chart
        zoomSelect={{
          xAxis: true,
        }}
      >
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const WithYAxisZoom: StoryObj<{}> = {
  render: () => {
    return (
      <Chart
        zoomSelect={{
          yAxis: true,
        }}
      >
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const SyncedByGroupID: StoryObj<{}> = {
  render: () => {
    return (
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr', width: '100%' }}
      >
        <Chart groupId="group1">
          <Tooltip />
          {lineData.map(({ name, data }) => (
            <Line name={name} data={data} key={name} />
          ))}
        </Chart>
        <Chart groupId="group1">
          <Tooltip />
          {lineData.map(({ name, data }) => (
            <Line name={name} data={data} key={name} />
          ))}
        </Chart>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const charts = await canvas.findAllByTestId('lg-charts-core-chart-echart');
    await userEvent.hover(charts[0]);
  },
};
