# Root

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/root.svg)

## Overview

`Root` is a polymorphic component that renders a given component depending on the provided props.
For example, providing the `href` prop can indicate `Root` should be rendered as an anchor tag.
Providing the `as` prop indicates that `Root` should be rendered as the component referenced by `as`.
By default, `Root` will render as the HTML element `button`.

This can be useful for simplifying components that are repetitively used, but need different behaviors.

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/root
```

### NPM

```shell
npm install @leafygreen-ui/root
```

## Example

```js
import Root from '@leafygreen-ui/Root';

<Root href="https://mongodb.design">I shall render as a link</Root>;
```

**Output HTML**

```html
<a href="https://mongodb.design">I shall render as a link</a>
```

## Properties

| Prop       | Type                                  | Description                                                                                                                          | Default  |
| ---------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| `as`       | `HTMLElement` or `React.ReactElement` | The component or HTML tag to be rendered by the `<Root />` component. **Note**: This will supersede the behavior of any other props. | `button` |
| `href`     | `string`                              | When provided, `<Root />` will render an anchor tag with this `href` value.                                                          |          |
| `children` | `React.ReactElement`                  | Content to be rendered in an HTML element, or provided as a prop to the rendered component                                           |          |

_Any other properties will be spread on the rendered HTML element or component._
