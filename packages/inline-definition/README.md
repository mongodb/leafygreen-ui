# Inline Definition

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/inline-definition.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/inline-definition/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/inline-definition
```

### Yarn

```shell
yarn add @leafygreen-ui/inline-definition
```

### NPM

```shell
npm install @leafygreen-ui/inline-definition
```

## Example

```js
<H2>
  <InlineDefinition definition={shardDefinition}>Shard</InlineDefinition> your
  cluster
</H2>
```

## Properties

| Prop                    | Type                                     | Description                                                                                                                                | Default   |
| ----------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `definition` (Required) | `React.ReactNode`                        | Content that describes the term. Will appear inside Tooltip.                                                                               |           |
| `children`              | `string`                                 | Text that will appear underlined                                                                                                           |           |
| `className`             | `string`                                 | className will be applied to the trigger element                                                                                           |           |
| `align`                 | `'top'`, `'bottom'`, `'left'`, `'right'` | Determines the preferred alignment of the tooltip relative to the component's children.                                                    | `'top'`   |
| `justify`               | `'start'`, `'middle'`, `'end'`           | Determines the preferred justification of the tooltip (based on the alignment) relative to the element passed to the component's children. | `'start'` |
| `darkMode`              | `boolean`                                | Determines if the component will appear in dark mode.                                                                                      | `false`   |
| `tooltipClassName`      | `string`                                 | className to be applied to the tooltip element                                                                                             |           |
