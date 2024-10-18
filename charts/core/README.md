# Core Chart Components

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

---

```js
import { Chart, Line } from '@lg-charts/core';

<Chart>
  <Line
    name="My Series"
    data={[
      [new Date(2020, 01, 01), 0],
      [new Date(2020, 01, 02), 1],
      [new Date(2020, 01, 03), 2],
      [new Date(2020, 01, 04), 3],
      [new Date(2020, 01, 05), 4],
    ]}
  />
</Chart>;
```

# Exports

---

## `Chart`

#### Props

| Name           | Description                                             | Type       | Default |
| -------------- | ------------------------------------------------------- | ---------- | ------- |
| `onChartReady` | Callback to be called when chart is finished rendering. | () => void |         |

### `Line`

#### Props

| Name   | Description                                                            | Type                                                        | Default |
| ------ | ---------------------------------------------------------------------- | ----------------------------------------------------------- | ------- |
| `name` | Name used to identify the series.                                      | string                                                      |         |
| `data` | Data array of tuples that represent x and y coordinates in the series. | Array<[string \| number \| Date, string \| number \| Date]> |         |
