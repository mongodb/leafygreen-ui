# IconButton

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/icon-button.svg)

## Installation

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
import IconButton from '@leafygreen-ui/icon-button';

<IconButton variant="light" ariaLabel="Ellipsis">
  <Icon glyph="Ellipsis" />
</IconButton>;
```

**Output HTML**

```html
<button aria-disabled="false" class="leafygreen-ui-194rp0y" aria-label="Ellipsis>
  <span class="leafygreen-ui-1rvdyoi">
    <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
      <title>Ellipsis</title>
      <g
        id="Ellipsis-Copy"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <path fill="#89989B"></path>
      </g>
    </svg>
  </span>
</button>
```

## Properties

| Prop        | Type                         | Description                                                                                                       | Default   |
| ----------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------- |
| `variant`   | `'dark'` or `'light'`        | Sets the style variant of the button.                                                                             | `'light'` |
| `onClick`   | `function`                   | The event handler function for the 'onclick' event. Receives the associated `event` object as the first argument. |           |
| `disabled`  | `boolean`                    | Disables the `<IconButton />`                                                                                     | `false`   |
| `href`      | `string`                     | If a href is supplied, the component renders inside of an `a` tag instead of inside of a `button` tag.            |           |
| `className` | `string`                     | Adds a className to the class attribute on the container element.                                                 |           |
| `children`  | `node`                       | Content rendered inside of the `<IconButton />` component                                                         |           |
| `ariaLabel` | **Required** `string`        | Value passed to `aria-label` attribute to ensure component's accessibility                                        |           |
| `size`      | `default`, `large`, `xlarge` | Determines the size of the IconButton                                                                             | `default` |
| `active`    | `boolean`                    | Determines whether the `<IconButton />` will appear `active`                                                      | `false`   |

_Any other properties will be spread on the container element._
