# Box

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/box.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/box/example/)

## Overview

`Box` is a polymorphic component that renders a given component depending on the provided props.
For example, providing the `href` prop can indicate `Box` should be rendered as an anchor tag.
Providing the `as` prop indicates that `Box` should be rendered as the component referenced by `as`.
By default, `Box` will render as the HTML element `div`.

This can be useful for simplifying components that are repetitively used, but need different behaviors.

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/box
```

### NPM

```shell
npm install @leafygreen-ui/box
```

## Example

```js
import Box from '@leafygreen-ui/box';

<Box href="https://mongodb.design">I shall render as a link</Box>;
```

**Output HTML**

```html
<a href="https://mongodb.design">I shall render as a link</a>
```

## Properties

| Prop       | Type                                             | Description                                                                                                                         | Default |
| ---------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `as`       | `React.ElementType`                              | The component or HTML tag to be rendered by the `<Box />` component. **Note**: This will supersede the behavior of any other props. | `div`   |
| `href`     | `string`                                         | When provided, `<Box />` will render an anchor tag with this `href` value.                                                          |         |
| `children` | `React.ReactElement`                             | Content to be rendered in an HTML element, or provided as a prop to the rendered component                                          |         |
| ...        | native attributes of component passed to as prop | Any other properties will be spread on the rendered HTML element or component.                                                      |         |
