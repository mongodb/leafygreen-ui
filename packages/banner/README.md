# Banner

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/banner.svg)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/banner
```

### NPM

```shell
npm install @leafygreen-ui/banner
```

## Example

**Output HTML**

## Properties

| Prop          | Type                                   | Description                                                           | Default    |
| ------------- | -------------------------------------- | --------------------------------------------------------------------- | ---------- |
| `variant`     | `info`, `warning`, `danger`, `success` | Sets the variant for the Banner                                       | `info`     |
| `dismissable` | `boolean`                              | Determines whether or not the Banner is dismissable                   | `false`    |
| `onClose`     | `React.MouseEventHandler`              | Callback fired when dismiss button is clicked                         | `() => {}` |
| `image`       | `React.ReactElement`                   | Illustration that will replace default Icon when the prop is supplied |            |
