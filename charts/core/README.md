# Core Chart Components

Library of composable charting components that provides a way to create interactive charts rendered on canvas.

![npm (scoped)](https://img.shields.io/npm/v/@lg-charts/core.svg)

## Installation

### PNPM

```shell
pnpm add @lg-charts/core
```

### Yarn

```shell
yarn add @lg-charts/core
```

### NPM

```shell
npm install @lg-charts/core
```

## Examples

### Basic Chart

```tsx
import { Chart, ChartGrid, ChartHeader, Line, XAxis, YAxis, type ChartStates } from '@lg-charts/core';

<Chart onZoomSelect={handleZoom} state={ChartStates.Unset}>
  <ChartHeader title="My Chart" />
  <ChartGrid vertical={false}>
  <XAxis type="time" />
  <YAxis type="value" formatter={(value) => `${value}GB`} />
  <EventMarkerPoint
    label='2024/01/04 (value 3)'
    message='Critical event occurred'
    position={[new Date(2020, 1, 4), 3]}
    level='warning'
  />
  <EventMarkerLine
    label='2024/01/02'
    message='Something happened of note'
    position={new Date(2020, 1, 2)}
    level='info'
  />
  <ThresholdLine
    position={3}
    label='Value Limit'
    value='3'
  />
  <Line
    name="Series 1"
    data={[
      [new Date(2020, 1, 1), 0],
      [new Date(2020, 1, 2), 1],
      [new Date(2020, 1, 3), 2],
      [new Date(2020, 1, 4), 3],
      [new Date(2020, 1, 5), 4],
    ]}
  />
  <Line
    name="Series 2"
    data={[
      [new Date(2020, 1, 1), 4],
      [new Date(2020, 1, 2), 3],
      [new Date(2020, 1, 3), 2],
      [new Date(2020, 1, 4), 1],
      [new Date(2020, 1, 5), 0],
    ]}
  />
</Chart>;
```

### Grouped Charts

```tsx
import { Chart, ChartGroupProvider, ChartTooltip, Line } from '@lg-charts/core';

<ChartGroupProvider groupId="my-group" enableTooltipSync>
  <div>
    <Chart>
      <ChartTooltip />
      <Line name="Series 1" data={data1} />
    </Chart>
    <Chart>
      <ChartTooltip />
      <Line name="Series 2" data={data2} />
    </Chart>
  </div>
</ChartGroupProvider>;
```

## Parent Components

### `ChartGroupProvider`

Context provider for synchronizing tooltips and axis pointers across multiple charts. Charts placed inside a `ChartGroupProvider` will have their axis pointers linked, and optionally their tooltip content synchronized.

**Note:** This is a pure context provider and does not render any DOM elements. You must provide your own container div for layout and styling.

#### Props

| Name                             | Description                                                                                                                                                                    | Type      | Default |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------- |
| `enableTooltipSync` _(optional)_ | Whether tooltip content is synchronized across all charts. When `true`, hovering any chart shows tooltip content on all grouped charts. When `false`, only axis pointers sync. | `boolean` | `true`  |
| `groupId`                        | Unique identifier for the chart group. Used internally by ECharts to synchronize axis pointers.                                                                                | `string`  |         |

### `Chart`

Chart container component.

#### Props

| Name                        | Description                                                                     | Type                                   | Default                          |
| --------------------------- | ------------------------------------------------------------------------------- | -------------------------------------- | -------------------------------- |
| `state` _(optional)_        | The state of the chart.                                                         | `ChartStates ('unset \| 'loading')`    | `'unset'`                        |
| `onChartReady` _(optional)_ | Callback to be called when chart is finished rendering.                         | `() => void`                           |                                  |
| `onZoomSelect` _(optional)_ | Callback to be called when a zoom selection is made if `zoomSelect` is enabled. | `(e: ZoomSelectionEvent) => void`      |                                  |
| `zoomSelect` _(optional)_   | Enable zoom select (click and drag area selection) for either axis.             | `{ xAxis?: boolean; yAxis?: boolean }` | `{ xAxis: false, yAxis: false }` |

**Note**: Callback passed to `onZoomSelect` callback receives the following `ZoomSelectionEvent` as an argument:

```ts
ZoomSelectionEvent = {
  // present if xAxis is enabled
  xAxis?: { startValue: number; endValue: number };
  // present if yAxis is enabled
  yAxis?: { startValue: number; endValue: number };
}
```

## Child Components

### `Line`

Component that takes in data points and renders a single line on the chart.

#### Props

| Name   | Description                                                                                                              | Type                                                          | Default |
| ------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- | ------- |
| `name` | Unique name used to identify the series. **Important note:** If two lines have the same name, only one will be rendered. | `string`                                                      |         |
| `data` | Data array of tuples that represent x and y coordinates in the series.                                                   | `Array<[string \| number \| Date, string \| number \| Date]>` |         |

### `ChartHeader`

Component for rendering a header in a chart.

#### Props

| Name                         | Description                                                                                                                                           | Type              | Default |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------- |
| `title`                      | The title to display in the chart header.                                                                                                             | `React.ReactNode` |         |
| `titleIcon` _(optional)_     | Content rendered immediately right of the title. Useful for quick contextual tooltips or other information concerning the title.                      | `React.ReactNode` |         |
| `showDivider` _(optional)_   | When true, renders a dividing line on top of header. Useful when stacking charts, such as in a `ChartGroup`.                                          | `boolean`         |         |
| `headerContent` _(optional)_ | Content that will be rendered to the right of the title. Useful for adding components such as `IconButton`'s that control functionality in the chart. | `React.ReactNode` |         |

### `ChartGrid`

Component that displays grid lines on the chart.

#### Props

| Name                      | Description                 | Type      | Default |
| ------------------------- | --------------------------- | --------- | ------- |
| `horizontal` _(optional)_ | Show horizontal grid lines. | `boolean` | `true`  |
| `vertical` _(optional)_   | Show vertical grid lines.   | `boolean` | `true`  |

### `XAxis`

Renders an x-axis.

#### Props

| Name                       | Description                                                                                                                                                                                               | Type                                       | Default |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------- |
| `type`                     | Type of axis.                                                                                                                                                                                             | `'log' \| 'time' \| 'value'`               |         |
| `label` _(optional)_       | Label name to be rendered on the axis.                                                                                                                                                                    | `string`                                   |         |
| `formatter` _(optional)_   | Callback function for formatting tick values.                                                                                                                                                             | `(value: string, index: number) => string` |         |
| `min` _(optional)_         | Minimum value of the axis.                                                                                                                                                                                | `number`                                   |         |
| `max` _(optional)_         | Maximum value of the axis.                                                                                                                                                                                | `number`                                   |         |
| `splitNumber` _(optional)_ | Number of segments that the axis is split into. Note that this number serves only as a recommendation, and the true segments may be adjusted based on readability. This is unavailable for category axis. | `number`                                   |         |

### `YAxis`

Renders a y-axis.

#### Props

| Name                       | Description                                                                                                                                                                                               | Type                                       | Default |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------- |
| `type`                     | Type of axis.                                                                                                                                                                                             | `'log' \| 'time' \| 'value'`               |         |
| `label` _(optional)_       | Label name to be rendered on the axis.                                                                                                                                                                    | `string`                                   |         |
| `formatter` _(optional)_   | Callback function for formatting tick values.                                                                                                                                                             | `(value: string, index: number) => string` |         |
| `min` _(optional)_         | Minimum value of the axis.                                                                                                                                                                                | `number`                                   |         |
| `max` _(optional)_         | Maximum value of the axis.                                                                                                                                                                                | `number`                                   |         |
| `splitNumber` _(optional)_ | Number of segments that the axis is split into. Note that this number serves only as a recommendation, and the true segments may be adjusted based on readability. This is unavailable for category axis. | `number`                                   |         |

### `ChartTooltip`

Renders a tooltip onto the chart.

#### Props

| Name                                | Description                                                                                            | Type                                                       | Default                 |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- | ----------------------- |
| `sort` _(optional)_                 | Custom sort function, used to sort list of series. List will be sorted descending by value by default. | `(seriesA: SeriesInfo, seriesB: SeriesInfo) => number`     | _descending by default_ |
| `seriesNameFormatter` _(optional)_  | Callback function for formatting the name string for each series.                                      | `(name: string) => string \| ReactNode`                    |                         |
| `seriesValueFormatter` _(optional)_ | Callback function for formatting the value string for each series.                                     | `(value: number \| string \| Date) => string \| ReactNode` |                         |
| `headerFormatter` _(optional)_      | Callback function for formatting the header string.                                                    | `(value: number \| string) => string \| ReactNode`         |                         |

Note: `SeriesInfo` is of type `{ name: string; value: string | number | Date; }`

### `EventMarkerLine`

Renders a vertical line marker at a specific point on the x-axis to annotate an event.

#### Props

| Name                 | Description                                                 | Type                  | Default     |
| -------------------- | ----------------------------------------------------------- | --------------------- | ----------- |
| `position`           | Position along the x-axis where the line should be placed.  | `string \| number`    |             |
| `message`            | Additional message text shown in the tooltip when hovering. | `string`              |             |
| `label` _(optional)_ | Label text shown in the tooltip when hovering.              | `string`              |             |
| `level` _(optional)_ | Visual style of the marker indicating its severity.         | `'warning' \| 'info'` | `'warning'` |

### `EventMarkerPoint`

Renders a point marker at specific coordinates to annotate an event.

#### Props

| Name                 | Description                                                 | Type                                   | Default     |
| -------------------- | ----------------------------------------------------------- | -------------------------------------- | ----------- |
| `position`           | Coordinates where the point should be placed [x, y].        | `[string \| number, string \| number]` |             |
| `message`            | Additional message text shown in the tooltip when hovering. | `string`                               |             |
| `label` _(optional)_ | Label text shown in the tooltip when hovering.              | `string`                               |             |
| `level` _(optional)_ | Visual style of the marker indicating its severity.         | `'warning' \| 'info'`                  | `'warning'` |

### `ThresholdLine`

Renders a horizontal dashed line at a specific value on the y-axis to indicate a threshold.

#### Props

| Name                 | Description                                                    | Type     | Default |
| -------------------- | -------------------------------------------------------------- | -------- | ------- |
| `position`           | Position along the y-axis where the line should be placed.     | `number` |         |
| `value`              | Value text shown after the label in the tooltip when hovering. | `string` |         |
| `label` _(optional)_ | Label text shown in the tooltip when hovering.                 | `string` |         |
