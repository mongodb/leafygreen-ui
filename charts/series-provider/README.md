# Charts Series Provider

The `Series Provider` package is a part of the LeafyGreen UI library. It provides context and utilities for managing series data in chart components.

## Installation

### PNPM

```shell
pnpm add @lg-charts/series-provider
```

### Yarn

```shell
yarn add @lg-charts/series-provider
```

### NPM

```shell
npm install @lg-charts/series-provider
```

## Example

To use the `SeriesContext`, wrap your chart components with the `SeriesProvider` component. This will provide the necessary context for managing series data.

```tsx
import { ChartCard } from '@lg-charts/chart-card';
import { Chart } from '@lg-charts/core';
import { Legend } from '@lg-charts/legend';
import { SeriesProvider } from '@lg-charts/series-provider';

const App = () => {
  const lineData = getLineData();
  const series = lineData.map(({ name }) => name);

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

## Props

| Name           | Description                                                                                                                                                | Type            | Default |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------- |
| `customColors` | An optional object mapping each theme to an array of custom colors for the series. If not provided, default colors based on the current theme will be used | `Array<string>` |         |
| `series`       | An array of series names representing the data series to be displayed in the descendant charts components                                                  | `Array<string>` |         |

## `useSeriesContext`

The `useSeriesContext` hook provides access to the series data within the `SeriesProvider` context.

### Example

```tsx
import { useSeriesContext } from '@leafygreen-ui/series-provider';

const ChartComponent = () => {
  const {
    getColor,
    getSeriesIndex,
    isChecked,
    isSelectAllChecked,
    isSelectAllIndeterminate,
    toggleSeries,
    toggleSelectAll,
  } = useSeriesContext();

  // Use the series context data
};
```
