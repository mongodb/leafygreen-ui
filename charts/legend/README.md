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

TODO @steph: add example when adding `Legend` component

## Properties

### LegendCheckbox

The `LegendCheckbox` component is a customized checkbox component used within the charts legend. It extends the base `Checkbox` component from `@leafygreen-ui/checkbox` with additional props and styles.

Refer to the [props table in @leafygreen-ui/checkbox README.md](https://github.com/mongodb/leafygreen-ui/blob/main/packages/checkbox/README.md#properties) for a full list of props that can be passed to the `LegendCheckbox`.

Note: the following `Checkbox` component props are omitted: `animate`, `baseFontSize`, `bold`, `description`, and `disabled`.

| Prop                 | Type              | Description                                     | Default |
| -------------------- | ----------------- | ----------------------------------------------- | ------- |
| `color` _(optional)_ | `string`          | The color of the checkbox.                      |         |
| `label`              | `React.ReactNode` | The label text to display next to the checkbox. |         |
