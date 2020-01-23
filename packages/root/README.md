# Root

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/root.svg)

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

| Prop       | Type                                  | Description                                                                                                                     | Default  |
| ---------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `as`       | `HTMLElement` or `React.ReactElement` | Takes priority in determining what tag the `<Root />` element will render                                                       | `button` |
| `href`     | `string`                              | Determines the location that an anchor tag will point to. If prop is set without the `as` prop, `<Root />` will render `a` tags |          |
| `children` | `React.ReactElement`                  | Content to appear inside of `<Root />` component                                                                                |          |
