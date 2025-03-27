# Charts ChartCard

Expandable card component for visually wrapping multiple charts.

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

```js
import { ChartCard } from '@lg-charts/chart-card';
import { Chart, Line, XAxis, YAxis } from '@lg-charts/core';

<ChartCard title="My Group of Charts">
  <Chart groupId="group1">
    <XAxis type="time" />
    <YAxis type="value" formatter={(value) => `${value}GB`} />
    <Line
      name="Series 1"
      data={seriesData}
    />
  </Chart>
  <Chart groupId="group1">
    <XAxis type="time" />
    <YAxis type="value" formatter={(value) => `${value}GB`} />
    <Line
      name="Series 1"
      data={seriesData}
    />
  </Chart>
<ChartCard>;
```

## Properties

| Name                               | Description                                                                                                                                           | Type                                                    | Default |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------- |
| `title`                            | The title to display in the chart header.                                                                                                             | `string`                                                |         |
| `defaultOpen` _(optional)_         | Defines the default state of the card.                                                                                                                | `boolean`                                               | `true`  |
| `isOpen` _(optional)_              | Forces the card state.                                                                                                                                | `boolean`                                               |         |
| `onToggleButtonClick` _(optional)_ | Callback fired when a user clicks the open/close toggle button.                                                                                       | `(event: MouseEventHandler<HTMLButtonElement>) => void` |         |
| `headerContent` _(optional)_       | Content that will be rendered to the right of the title. Useful for adding components such as `IconButton`'s that control functionality in the chart. | `React.ReactNode`                                       |         |
