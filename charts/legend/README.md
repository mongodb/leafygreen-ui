# Charts Legend

![npm (scoped)](https://img.shields.io/npm/v/@lg-charts/legend.svg)

## Installation

### PNPM

```shell
pnpm add @lg-charts/legend
```

### Yarn

```shell
yarn add @lg-charts/legend
```

### NPM

```shell
npm install @lg-charts/legend
```

## Example

To use the `Legend`, ensure your `Legend` instance and corresponding chart components are wrapped in a `SeriesProvider` instance.

```tsx
import { Chart, ChartCard } from '@lg-charts/core';
import { Legend } from '@lg-charts/legend';
import { SeriesProvider } from '@lg-charts/series-provider';

const App = () => {
  const lineData = getLineData();
  const series = lineData.map(({name}) => name);

  return (
    <SeriesProvider series={series}>
      <Legend series={series}>
      <Chart>
        {lineData.map(({ data, name }) => (
          <Line key={name} data={data} name={name} />
        ))}
      </Chart>
    </SeriesProvider>
  );
};
```

## Properties

### Legend

| Prop                               | Type                                | Description                                                                                          | Default |
| ---------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------- | ------- |
| `series`                           | `Array<string>`                     | An array of series names representing the data series to be displayed in the legend.                 |         |
| `seriesNameFormatter` _(optional)_ | `(name: string) => React.ReactNode` | A function that formats the series name. The function is called with the series name as an argument. |         |
| `showSelectAll` _(optional)_       | `boolean`                           | Determines whether or not to show the select all checkbox.                                           | `true`  |
