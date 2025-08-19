# IconButton

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/icon-button.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/icon-button/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/icon-button
```

### Yarn

```shell
yarn add @leafygreen-ui/icon-button
```

### NPM

```shell
npm install @leafygreen-ui/icon-button
```

## Example

```js
import EllipsisIcon from '@leafygreen-ui/icon/dist/Ellipsis';
import IconButton from '@leafygreen-ui/icon-button';

<IconButton darkMode={true} aria-label="Some Menu">
  <EllipsisIcon />
</IconButton>;
```

## Properties

| Prop                              | Type                               | Description                                                                                                       | Default     |
| --------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------- |
| `darkMode`                        | `boolean`                          | Determines whether or not the IconButton will appear in darkMode.                                                 | `false`     |
| `onClick`                         | `function`                         | The event handler function for the 'onclick' event. Receives the associated `event` object as the first argument. |             |
| `disabled`                        | `boolean`                          | Disables the `<IconButton />`                                                                                     | `false`     |
| `href`                            | `string`                           | If a href is supplied, the component renders inside of an `a` tag instead of inside of a `button` tag.            |             |
| `className`                       | `string`                           | Adds a className to the class attribute on the container element.                                                 |             |
| `children`                        | `node`                             | Content rendered inside of the `<IconButton />` component                                                         |             |
| `size`                            | `'default'`, `'large'`, `'xlarge'` | Determines the size of the IconButton                                                                             | `'default'` |
| `active`                          | `boolean`                          | Determines whether the `<IconButton />` will appear `active`                                                      | `false`     |
| `aria-label` or `aria-labelledby` | `string`                           | One of these must be provided. See note below                                                                     |             |
| ...                               | native anchor or button attributes | Any other properties will be spread on the rendered HTML element or component.                                    |             |

### Special Case: Aria Labels

Either `aria-label` or `aria-labelledby` must be provided a string, or there will be a console error. This is to ensure that screenreaders have a description for what the button does, since the button itself doesn't contain any text.

_Any other properties will be spread on the container element._
