# Banner

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/banner.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/banner/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/banner
```

### Yarn

```shell
yarn add @leafygreen-ui/banner
```

### NPM

```shell
npm install @leafygreen-ui/banner
```

## Example

```js
<Banner>This is the banner content</Banner>
```

## Properties

| Prop           | Type                                           | Description                                                           | Default    |
| -------------- | ---------------------------------------------- | --------------------------------------------------------------------- | ---------- |
| `variant`      | `'info'`, `'warning'`, `'danger'`, `'success'` | Sets the variant for the Banner                                       | `'info'`   |
| `dismissible`  | `boolean`                                      | Determines whether or not the Banner is dismissible                   | `false`    |
| `onClose`      | `React.MouseEventHandler`                      | Callback fired when dismiss button is clicked                         | `() => {}` |
| `image`        | `React.ReactElement`                           | Illustration that will replace default Icon when the prop is supplied |            |
| `baseFontSize` | `13`, `16`                                     | Determines `font-size` for body copy in Callout component             | `13`       |
| `darkMode`     | `boolean`                                      | Determines if the component renders in dark theme                     | `false`    |
| ...            | native `div` attributes                        | Any other props will be spread on the root `div` element              |            |
