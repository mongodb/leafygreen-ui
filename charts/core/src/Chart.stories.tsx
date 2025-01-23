import React from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import { action } from '@storybook/addon-actions';
import type { StoryObj } from '@storybook/react';

import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';

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

export default {
  title: 'Charts/Chart',
  component: Chart,
  args: {
    data: makeLineData(5),
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
    zoomSelectCallback: action('onZoomSelect'),
    renderEventMarkerLine: true,
    eventMarkerLineMessage: 'Event marker line message',
    eventMarkerLineLabel: 'Event marker line label',
    eventMarkerLineLevel: 'warning',
    eventMarkerLinePosition: new Date('2024-01-01T00:20:00'),
    renderEventMarkerPoint: true,
    eventMarkerPointMessage: 'Event marker point message',
    eventMarkerPointLabel: 'Event marker point label',
    eventMarkerPointLevel: 'warning',
    eventMarkerPointXPosition: new Date('2024-01-01T00:37:00'),
    eventMarkerPointYPosition: 699,
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
};

interface StorybookProps {
  data: Array<LineProps>;
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
}

export const LiveExample: StoryObj<StorybookProps> = {
  render: ({
    data,
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
      >
        {renderHeader && (
          <Header title={headerTitle} showDivider={headerShowDivider} />
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

export const WithHeaderContent: StoryObj<StorybookProps> = {
  render: ({
    data,
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

export const WithSameGroupIds: StoryObj<StorybookProps> = {
  render: ({
    data,
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
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr', width: '100%' }}
      >
        <Chart
          groupId="group1"
          zoomSelect={{
            xAxis: zoomSelectXAxis,
            yAxis: zoomSelectYAxis,
          }}
          onZoomSelect={zoomSelectCallback}
        >
          {renderHeader && (
            <Header title={headerTitle} showDivider={headerShowDivider} />
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
        <Chart
          groupId="group1"
          zoomSelect={{
            xAxis: zoomSelectXAxis,
            yAxis: zoomSelectYAxis,
          }}
          onZoomSelect={zoomSelectCallback}
        >
          {renderHeader && (
            <Header title={headerTitle} showDivider={headerShowDivider} />
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
      </div>
    );
  },
};
