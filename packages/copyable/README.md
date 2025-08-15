# Copyable

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/copyable.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/copyable/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/copyable
```

### Yarn

```shell
yarn add @leafygreen-ui/copyable
```

### NPM

```shell
npm install @leafygreen-ui/copyable
```

## Example

```js
<Copyable label="Label" description="Description">
  {'npm install @leafygreen-ui/copyable'}
</Copyable>
```

## Properties

| Prop          | Type                   | Description                                                       | Default     |
| ------------- | ---------------------- | ----------------------------------------------------------------- | ----------- |
| `label`       | `string`               | Label text for the copyable contents.                             |             |
| `description` | `string`               | Further text to describe the contents.                            | `undefined` |
| `className`   | `string`               | className applied to the container of the code element            |             |
| `children`    | `string`               | The text that will be copied.                                     |             |
| `darkMode`    | `boolean`              | Determines whether or not the component appears in dark mode.     | `false`     |
| `size`        | `'default'`, `'large'` | The display size of the label, description, and copyable children | `'default'` |
| `copyable`    | `boolean`              | Whether or not a copy button should be shown.                     | `true`      |
