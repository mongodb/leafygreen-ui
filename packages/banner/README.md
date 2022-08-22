# Banner

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/banner.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/banner/example/)

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

```js
<Banner>This is the banner content</Banner>
```

**Output HTML**

```html
<div role="alert" class="leafygreen-ui-zvv1x8">
  <svg
    width="16"
    height="16"
    role="img"
    viewBox="0 0 16 16"
    class="leafygreen-ui-1e46tsl"
  >
    <title>Edit Icon</title>
    <path
      d="M11.352 6.648l-2-2L11 3l2 2-1.648 1.648zM6 12l-3 1 1-3 4.648-4.648 2 2L6 12z"
      fill="currentColor"
      fill-rule="evenodd"
    />
  </svg>
  <span class="leafygreen-ui-1kr3ls8">This is the banner content.</span>
</div>
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
