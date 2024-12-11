# ChartCard Component

Expandable card component for visually wrapping multiple charts.

![npm (scoped)](https://img.shields.io/npm/v/@lg-charts/chart-card.svg)

## Installation

### Yarn

```shell
yarn add @lg-charts/chart-card
```

### NPM

```shell
npm install @lg-charts/chart-card
```

## Example

```js
import { ChartCard } from '@lg-charts/chart-card';
import IconButton from '@leafygreen-ui/icon-button';

<ChartCard 
  title="My Group of Charts"
  defaultOpen={true}
  headerContent={
    <IconButton aria-label="Close">
      <Icon glyph="X" />
    </IconButton>
  }>
    {/* <Chart> components */}
<ChartCard>;
```

## Props

| Name                               | Description                                                                                                                                           | Type                                                    | Default |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------- |
| `title`                            | The title to display in the chart header.                                                                                                             | `string`                                                |         |
| `defaultOpen` _(optional)_         | Defines the default state of the card.                                                                                                                | `boolean`                                               | `true`  |
| `isOpen` _(optional)_              | Forces the card state.                                                                                                                                | `boolean`                                               |         |
| `onToggleButtonClick` _(optional)_ | Callback fired when a user clicks the open/close toggle button.                                                                                       | `(event: MouseEventHandler<HTMLButtonElement>) => void` |         |
| `headerContent` _(optional)_       | Content that will be rendered to the right of the title. Useful for adding components such as `IconButton`'s that control functionality in the chart. | `React.ReactNode`                                       |         |
