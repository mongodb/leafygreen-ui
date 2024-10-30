# Core Chart Components

Library of composable charting components that provides a way to create interactive charts rendered on canvas.

![npm (scoped)](https://img.shields.io/npm/v/@lg-charts/core.svg)

## Installation

### Yarn

```shell
yarn add @lg-charts/core
```

### NPM

```shell
npm install @lg-charts/core
```

## Basic Example

```js
import { Chart, Line, Grid, XAxis, YAxis } from '@lg-charts/core';

<Chart>
  <Grid vertical={false}>
  <XAxis type="time" />
  <YAxis type="value" unit="GB" />
  <Line
    name="Series 1"
    data={[
      [new Date(2020, 01, 01), 0],
      [new Date(2020, 01, 02), 1],
      [new Date(2020, 01, 03), 2],
      [new Date(2020, 01, 04), 3],
      [new Date(2020, 01, 05), 4],
    ]}
  />
  <Line
    name="Series 2"
    data={[
      [new Date(2020, 01, 01), 4],
      [new Date(2020, 01, 02), 3],
      [new Date(2020, 01, 03), 2],
      [new Date(2020, 01, 04), 1],
      [new Date(2020, 01, 05), 0],
    ]}
  />
</Chart>;
```

## Parent Components

### `Chart`

Chart container component.

#### Props

| Name           | Description                                             | Type       | Default |
| -------------- | ------------------------------------------------------- | ---------- | ------- |
| `onChartReady` | Callback to be called when chart is finished rendering. | () => void |         |

## Child Components

### `Line`

Component that takes in data points and renders a single line on the chart.

#### Props

| Name   | Description                                                            | Type                                                        | Default |
| ------ | ---------------------------------------------------------------------- | ----------------------------------------------------------- | ------- |
| `name` | Name used to identify the series.                                      | string                                                      |         |
| `data` | Data array of tuples that represent x and y coordinates in the series. | Array<[string \| number \| Date, string \| number \| Date]> |         |

### `Grid`

Component that displays grid lines on the chart.

#### Props

| Name         | Description                 | Type    | Default |
| ------------ | --------------------------- | ------- | ------- |
| `horizontal` | Show horizontal grid lines. | boolean | true    |
| `vertical`   | Show vertical grid lines.   | boolean | true    |

### `XAxis`

Renders an x-axis.

#### Props

| Name                 | Description                                                                                                                                                                                                                                                                           | Type                                     | Default |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------- |
| `type`               | Type of axis.                                                                                                                                                                                                                                                                         | 'category' \| 'value' \| 'time' \| 'log' |         |
| `label` _(optional)_ | Label name to be rendered on the axis.                                                                                                                                                                                                                                                | string                                   |         |
| `unit` _(optional)_  | String that will be appended to the values of the axis. Only applies if `type` of `value`. _Note: this unit will not impact the data. E.g. if data is given in MB and the units are set to "GB", the component won’t convert these values. Conversion of data is up to the consumer._ | string                                   |         |

### `YAxis`

Renders a y-axis.

#### Props

| Name                 | Description                                                                                                                                                                                                                                                                           | Type                                     | Default |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------- |
| `type`               | Type of axis.                                                                                                                                                                                                                                                                         | 'category' \| 'value' \| 'time' \| 'log' |         |
| `label` _(optional)_ | Label name to be rendered on the axis.                                                                                                                                                                                                                                                | string                                   |         |
| `unit` _(optional)_  | String that will be appended to the values of the axis. Only applies if `type` of `value`. _Note: this unit will not impact the data. E.g. if data is given in MB and the units are set to "GB", the component won’t convert these values. Conversion of data is up to the consumer._ | string                                   |         |
