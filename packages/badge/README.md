# Badge

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/badge.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/badge/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/badge
```

### NPM

```shell
npm install @leafygreen-ui/badge
```

## Example

```js
import Badge from '@leafygreen-ui/badge';

<Badge variant="blue" className="my-badge">
  New
</Badge>;
```

**Output HTML**

```html
<div class="leafygreen-ui-rhgfxf my-badge">New</div>
```

## Properties

| Prop        | Type                                                                  | Description                                                       | Default       |
| ----------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------- |
| `variant`   | `'lightgray'`, `'darkgray'`, `'red'`, `'blue'`, `'green'`, `'yellow'` | Sets the style variant of the badge.                              | `'lightgray'` |
| `className` | `string`                                                              | Adds a className to the class attribute                           |               |
| `children`  | `node`                                                                | The content that will appear inside of the `<Badge />` component. |               |
| ...         | native `div` attributes                                               | Any other props will be spread on the root `div` element          |               |
| `darkMode`  | `boolean`                                                             | Determines if the component renders in dark theme                 | `false`       |
