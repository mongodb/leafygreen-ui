# Box

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/box.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/box--default)

## Overview

`Box` is a polymorphic component that renders a given component depending on the provided props.
For example, providing the `href` prop can indicate `Box` should be rendered as an anchor tag.
Providing the `component` prop indicates that `Box` should be rendered as the component referenced by `component`.
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

| Prop       | Type                                  | Description                                                                                                                         | Default |
| ---------- | ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `as`       | `HTMLElement` or `React.ReactElement` | The component or HTML tag to be rendered by the `<Box />` component. **Note**: This will supersede the behavior of any other props. | `div`   |
| `href`     | `string`                              | When provided, `<Box />` will render an anchor tag with this `href` value.                                                          |         |
| `children` | `React.ReactElement`                  | Content to be rendered in an HTML element, or provided as a prop to the rendered component                                          |         |

_Any other properties will be spread on the rendered HTML element or component._
