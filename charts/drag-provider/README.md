# DragProvider

Provides drag and drop functionality for chart components.

`DragProvider` creates a draggable context around charts components. Any child `Chart` or `ChartCard` with a `dragId` prop, will automatically become draggable
and droppable within that context.

`DragProvider` contexts are also nestable, providing better control of where a child component can be dropped.

![npm (scoped)](https://img.shields.io/npm/v/@lg-charts/drag-provider.svg)

## Installation

### PNPM

```shell
pnpm add @lg-charts/drag-provider
```

### NPM

```shell
npm install @lg-charts/drag-provider
```

### Yarn

```shell
yarn add @lg-charts/drag-provider
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

| Name                       | Description                                      | Type                                         | Default     |
| -------------------------- | ------------------------------------------------ | -------------------------------------------- | ----------- |
| `onDragStart` (_optional_) | Callback that will fire on the `dragstart` event | `({ active: string }) => void`               | `undefined` |
| `onDragEnd` (_optional_)   | Callback that will fire on the `dragend` event   | `({ active: string; over: string }) => void` | `undefined` |

### Callback Arguments

- `active` - `dragId` of the drag component being dragged.
- `over` - `dragId` of the drag component the active component is over on `dragend`.
