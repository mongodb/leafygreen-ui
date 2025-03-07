# DragProvider

Provides draggable functionality for `Chart` and `ChartCard` components.
Enables drag on any first descendant `Chart` or `ChartCard` with a `dragId` prop. Providers can be nested to create nested drag
containers.

![npm (scoped)](https://img.shields.io/npm/v/@lg-charts/drag-provider.svg)

## Installation

### Yarn

```shell
yarn add @lg-charts/drag-provider
```

### NPM

```shell
npm install @lg-charts/drag-provider
```

## Basic Chart Example

```ts
function ChartPage() {
  // Chart state and dragEnd handlers configured here

  return (
    <DragProvider onDragEnd={handleChartCardDrag}>
      {/** Controls drag events for cards */}
      <ChartCard dragId="chart-card-1">
        <DragProvider onDragEnd={handleChartDrag}>
          {/** Controls drag events for charts inside chart-card-1 */}
          <Chart dragId="chart-1" />
          <Chart dragId="chart-2" />
        </DragProvider>
      </ChartCard>
      <ChartCard dragId="chart-card-2">
        <DragProvider onDragEnd={handleChartDrag}>
          {/** Controls drag events for charts inside chart-card-2 */}
          <Chart dragId="chart-3" />
          <Chart dragId="chart-4" />
        </DragProvider>
      </ChartCard>
    </DragProvider>
  }
}
```

## Props

| Name                     | Description                                    | Type                                         | Default     |
| ------------------------ | ---------------------------------------------- | -------------------------------------------- | ----------- |
| `onDragEnd` (_optional_) | Callback that will fire on the `dragend` event | `({ active: string; over: string }) => void` | `undefined` |

### Callback Arguments

- `active` - `dragId` of the drag component being dragged.
- `over` - `dragId` of the drag component the active component is over on `dragend`.
