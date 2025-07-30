import React, { useState } from 'react';
import { storybookArgTypes } from '@lg-tools/storybook-utils';
import type { StoryObj } from '@storybook/react';

import { ChartProps } from './Chart/Chart.types';
import { ChartHeaderProps } from './ChartHeader/ChartHeader.types';
import { ChartTooltipProps } from './ChartTooltip/ChartTooltip.types';
import { LineProps } from './Line';
import { makeLineData } from './testUtils';
import { ThresholdLineProps } from './ThresholdLine';
import {
  Chart,
  ChartGrid,
  ChartHeader,
  ChartTooltip,
  EventMarkerLine,
  EventMarkerLineProps,
  EventMarkerPoint,
  EventMarkerPointProps,
  Line,
  ThresholdLine,
  XAxis,
  XAxisProps,
  YAxis,
  YAxisProps,
} from '.';

const numOfLineColors = 15;
const lineData = makeLineData(numOfLineColors);

export default {
  title: 'Composition/Charts/Core',
  component: Chart,
  parameters: {
    default: 'LiveExample',
    chromatic: {
      /**
       * For some reason diffs keep getting flagged on non-changes to the canvas.
       * The default threshold is .063, so bumping it up to 1 to test. We might
       * consider lowering this in the future.
       */
      diffThreshold: 1,
    },
  },

  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    state: {
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
  darkMode: boolean;
  data: Array<LineProps>;
  state: ChartProps['state'];
  zoomSelect: ChartProps['zoomSelect'];
  onZoomSelect: ChartProps['onZoomSelect'];
  onChartReady: ChartProps['onChartReady'];
  groupId: ChartProps['groupId'];
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
  tooltipSeriesValueFormatter: ChartTooltipProps['seriesValueFormatter'];
  renderHeader: boolean;
  headerTitle: ChartHeaderProps['title'];
  headerShowDivider: ChartHeaderProps['showDivider'];
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
    state: 'unset',
    horizontalGridLines: true,
    verticalGridLines: true,
    renderGrid: true,
    renderXAxis: true,
    xAxisType: 'time',
    xAxisLabel: 'X-Axis Label',
    renderYAxis: true,
    yAxisType: 'value',
    yAxisLabel: 'Y-Axis Label',
    renderTooltip: true,
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
    eventMarkerPointXPosition: new Date('2024-01-01T00:38:00').getTime(),
    eventMarkerPointYPosition: 2015,
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
    state: {
      control: 'select',
      options: ['unset', 'loading'],
      description: 'The state of the chart',
      table: {
        category: 'Chart',
      },
    },
    category: 'Chart',
    verticalGridLines: {
      control: 'boolean',
      description: 'Show vertical grid lines',
      name: 'Vertical',
      table: {},
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
    tooltipSeriesValueFormatter: {
      description: 'Tooltip series value formatter',
      name: 'SeriesValueFormatter',
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
    state,
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
    tooltipSeriesValueFormatter,
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
        state={state}
      >
        {renderHeader && (
          <ChartHeader
            title={headerTitle}
            showDivider={headerShowDivider}
            headerContent={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'right',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                Header Content
              </div>
            }
          />
        )}
        {renderGrid && (
          <ChartGrid
            vertical={verticalGridLines}
            horizontal={horizontalGridLines}
          />
        )}
        {renderTooltip && (
          <ChartTooltip seriesValueFormatter={tooltipSeriesValueFormatter} />
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
        state="unset"
      >
        <ChartHeader
          title="Header"
          showDivider
          headerContent={
            <div
              style={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
                height: '100%',
                color: 'white',
              }}
            >
              Header Content
            </div>
          }
        />
        <ChartGrid />
        <ChartTooltip />
        <XAxis type="time" label="X-Axis Label" />
        <YAxis type="value" label="Y-Axis Label" />
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
          position={[new Date('2024-01-01T00:38:00').getTime(), 2015]}
          level="warning"
        />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const LoadingState: StoryObj<{}> = {
  render: () => {
    return (
      <Chart
        zoomSelect={{
          xAxis: true,
          yAxis: true,
        }}
        state="loading"
      >
        <ChartHeader
          title="Header"
          showDivider
          headerContent={
            <div
              style={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
                height: '100%',
                color: 'black',
              }}
            >
              Header Content
            </div>
          }
        />
        <ChartGrid />
        <ChartTooltip />
        <XAxis type="time" label="X-Axis Label" />
        <YAxis type="value" label="Y-Axis Label" />
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
          position={[new Date('2024-01-01T00:38:00').getTime(), 2015]}
          level="warning"
        />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const OverlayState: StoryObj<{}> = {
  render: () => {
    return (
      <Chart state="overlay">
        <ChartHeader
          title="Header"
          showDivider
          headerContent={
            <div
              style={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
                height: '100%',
                color: 'black',
              }}
            >
              Header Content
            </div>
          }
        />
        <ChartGrid />
        <ChartTooltip />
        <XAxis type="time" label="X-Axis Label" />
        <YAxis type="value" label="Y-Axis Label" />
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
          position={[new Date('2024-01-01T00:38:00').getTime(), 2015]}
          level="warning"
        />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const DraggingState: StoryObj<{}> = {
  render: () => {
    return (
      <Chart state="dragging">
        <ChartHeader
          title="Header"
          showDivider
          headerContent={
            <div
              style={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
                height: '100%',
                color: 'black',
              }}
            >
              Header Content
            </div>
          }
        />
        <ChartGrid />
        <ChartTooltip />
        <XAxis type="time" label="X-Axis Label" />
        <YAxis type="value" label="Y-Axis Label" />
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
          position={[new Date('2024-01-01T00:38:00').getTime(), 2015]}
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
          state="unset"
        >
          <ChartHeader
            title="Header"
            showDivider
            headerContent={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'right',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                Header Content
              </div>
            }
          />
          <ChartGrid />
          <ChartTooltip />
          <XAxis type="time" label="X-Axis Label" />
          <YAxis type="value" label="Y-Axis Label" />
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
            position={[new Date('2024-01-01T00:38:00').getTime(), 2015]}
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

export const Basic: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
};

export const NullValues: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <Line
          name={'My Data'}
          data={[
            [new Date(2020, 1, 1), 0],
            [new Date(2020, 1, 2), 1],
            [new Date(2020, 1, 3), null], // line should visually skip this point
            [new Date(2020, 1, 4), 3],
            [new Date(2020, 1, 5), 4],
          ]}
        />
        <ChartTooltip />
      </Chart>
    );
  },
};

export const WithTooltip: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <ChartTooltip />
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

export const WithXAxisWithLabel: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <XAxis type="time" label="X-Axis Label" />
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

export const WithYAxisWithLabel: StoryObj<{}> = {
  render: () => {
    return (
      <Chart>
        <YAxis type="value" label="Y-Axis Label" />
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
        <ChartGrid />
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
        <ChartGrid horizontal={false} />
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
        <ChartGrid vertical={false} />
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
        <ChartHeader title="Header" />
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
        <ChartHeader title="Header" showDivider />
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
        <ChartHeader
          title="Header"
          showDivider
          headerContent={
            <div
              style={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
                height: '100%',
              }}
            >
              Header Content{' '}
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

export const WithHeaderTitleIcon: StoryObj<{
  headerTitle: ChartHeaderProps['title'];
  headerTitleIcon: ChartHeaderProps['titleIcon'];
}> = {
  args: {
    headerTitle: 'Header',
    headerTitleIcon: (() => {
      const TooltipIcon: React.FC = () => {
        const [isTooltipVisible, setIsTooltipVisible] = useState(false);

        const handleMouseEnter = () => setIsTooltipVisible(true);
        const handleMouseLeave = () => setIsTooltipVisible(false);

        return (
          <div
            style={{ position: 'relative' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div style={{ cursor: 'pointer' }}>🍀</div>
            {isTooltipVisible && (
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  padding: '4px 8px',
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: '4px',
                  opacity: 1,
                }}
              >
                Tooltip
              </div>
            )}
          </div>
        );
      };

      return <TooltipIcon />;
    })(),
  },
  render: ({ headerTitle, headerTitleIcon }) => {
    return (
      <Chart>
        <ChartHeader
          title={headerTitle}
          titleIcon={headerTitleIcon}
          showDivider
          headerContent={
            <div
              style={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
                height: '100%',
              }}
            >
              Header Content{' '}
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
          position={[new Date('2024-01-01T00:38:00').getTime(), 2015]}
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
          position={[new Date('2024-01-01T00:38:00').getTime(), 2015]}
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

export const WithZoomAndTooltip: StoryObj<{}> = {
  render: () => {
    return (
      <Chart
        zoomSelect={{
          xAxis: true,
          yAxis: true,
        }}
      >
        <ChartTooltip />
        {lineData.map(({ name, data }) => (
          <Line name={name} data={data} key={name} />
        ))}
      </Chart>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const SyncedByGroupIDWithTooltipSync: StoryObj<{}> = {
  render: () => {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          width: '100%',
          gap: '8px',
        }}
      >
        <Chart groupId="group1" enableGroupTooltipSync>
          <ChartTooltip />
          {lineData.map(({ name, data }) => (
            <Line name={name} data={data} key={name} />
          ))}
        </Chart>
        <Chart groupId="group1" enableGroupTooltipSync>
          <ChartTooltip />
          {lineData.map(({ name, data }) => (
            <Line name={name} data={data} key={name} />
          ))}
        </Chart>
        <Chart groupId="group1" enableGroupTooltipSync>
          <ChartTooltip />
          {lineData.map(({ name, data }) => (
            <Line name={name} data={data} key={name} />
          ))}
        </Chart>
      </div>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const SyncedByGroupIDWithoutTooltipSync: StoryObj<{}> = {
  render: () => {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          width: '100%',
          gap: '8px',
        }}
      >
        <Chart groupId="group1" enableGroupTooltipSync={false}>
          <ChartTooltip />
          {lineData.map(({ name, data }) => (
            <Line name={name} data={data} key={name} />
          ))}
        </Chart>
        <Chart groupId="group1" enableGroupTooltipSync={false}>
          <ChartTooltip />
          {lineData.map(({ name, data }) => (
            <Line name={name} data={data} key={name} />
          ))}
        </Chart>
        <Chart groupId="group1" enableGroupTooltipSync={false}>
          <ChartTooltip />
          {lineData.map(({ name, data }) => (
            <Line name={name} data={data} key={name} />
          ))}
        </Chart>
      </div>
    );
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};
