# TimeSeriesLineChart

![npm (scoped)](https://img.shields.io/npm/v/@lg-charts/time-series-line-chart.svg)

## Installation

### Yarn

```shell
yarn add @lg-charts/time-series-line-chart
```

### NPM

```shell
npm install @lg-charts/time-series-line-chart
```

## Basic Example

---

```js
import { TimeSeriesLineChart } from '@lg-charts/time-series-line-chart';

const seriesData = [
  {
    name="Series 1"
    data={[
      [new Date(2020, 01, 01), 0],
      [new Date(2020, 01, 02), 1],
      [new Date(2020, 01, 03), 2],
      [new Date(2020, 01, 04), 3],
      [new Date(2020, 01, 05), 4],
    ]}
  },
  {
    name="Series 2"
    data={[
      [new Date(2020, 01, 01), 4],
      [new Date(2020, 01, 02), 3],
      [new Date(2020, 01, 03), 2],
      [new Date(2020, 01, 04), 1],
      [new Date(2020, 01, 05), 0],
    ]}
  }
]

<TimeSeriesLineChart series={seriesData}/>
```

# Exports

---

## `TimeSeriesLineChart`

#### Props

| Name     | Description                                  | Type                                          | Default |
| -------- | -------------------------------------------- | --------------------------------------------- | ------- |
| `series` | Data for each series to render in the chart. | { name: string; data: Array<[Date, number]>;} |         |
