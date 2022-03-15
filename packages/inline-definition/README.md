# Inline Definition

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/inline-definition.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/inline-definition/example/)

## Installation

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

**Output HTML**

```html
<h2 class="leafygreen-ui-1xwhtk1">
  <span class="leafygreen-ui-1eprrtj" aria-describedby="tooltip-1">Shard</span>
  your cluster
</h2>
<div>
  <div class="leafygreen-ui-10b9mvh">
    <div role="tooltip" id="tooltip-27" class="leafygreen-ui-10d84ei">
      <div class="leafygreen-ui-qlb2bl">
        <div class="leafygreen-ui-3uslxw"></div>
      </div>
      <p class="leafygreen-ui-1s8990i">
        Sharding is a method for horizontally scaling across multiple replica
        sets by breaking up large datasets (e.g. partitioning) into smaller
        parts. Sharding is native to MongoDB.
      </p>
    </div>
  </div>
</div>
```

## Properties

| Prop                    | Type                                     | Description                                                                                                                                | Default   |
| ----------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `definition` (Required) | `React.ReactNode`                        | Content that describes the term. Will appear inside Tooltip.                                                                               |           |
| `children`              | `string`                                 | Text that will appear underlined                                                                                                           |           |
| `className`             | `string`                                 | className will be applied to the trigger element                                                                                           |           |
| `align`                 | `'top'`, `'bottom'`, `'left'`, `'right'` | Determines the preferred alignment of the tooltip relative to the component's children.                                                    | `'top'`   |
| `justify`               | `'start'`, `'middle'`, `'end'`, `'fit'`  | Determines the preferred justification of the tooltip (based on the alignment) relative to the element passed to the component's children. | `'start'` |
| `darkMode`              | `boolean`                                | Determines if the component will appear in dark mode.                                                                                      | `false`   |
| `tooltipClassName`      | `string`                                 | className to be applied to the tooltip element                                                                                             |           |
