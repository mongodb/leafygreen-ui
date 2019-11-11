# IconButton

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/icon-button.svg)

## Example

```js
import IconButton from '@leafygreen-ui/icon-button';

<IconButton variant="light">
  <Icon glyph="Ellipsis" />
</IconButton>;
```

**Output HTML**

```html
<button aria-disabled="false" class="leafygreen-ui-194rp0y">
  <span class="leafygreen-ui-1rvdyoi"
    ><svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
      <title>Ellipsis</title>
      <desc>Created with Sketch.</desc>
      <g
        id="Ellipsis-Copy"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <path
          d="M2,6.5 C2.828125,6.5 3.5,7.171875 3.5,8 C3.5,8.828125 2.828125,9.5 2,9.5 C1.171875,9.5 0.5,8.828125 0.5,8 C0.5,7.171875 1.171875,6.5 2,6.5 Z M8,6.5 C8.828125,6.5 9.5,7.171875 9.5,8 C9.5,8.828125 8.828125,9.5 8,9.5 C7.171875,9.5 6.5,8.828125 6.5,8 C6.5,7.171875 7.171875,6.5 8,6.5 Z M14,6.5 C14.828125,6.5 15.5,7.171875 15.5,8 C15.5,8.828125 14.828125,9.5 14,9.5 C13.171875,9.5 12.5,8.828125 12.5,8 C12.5,7.171875 13.171875,6.5 14,6.5 Z"
          id=""
          fill="#89989B"
        ></path>
      </g></svg
  ></span>
</button>
```

## Properties

### variant

**Type:** `string`

**Default:** `'light'`

Sets the style variant of the button. Valid variants for buttons are `'light'`, `'dark'`.

### onClick

**Type:** `function`

The event handler function for the 'onclick' event. Receives the associated `event` object as the first argument.

### className

**Type:** `string`

**Default:** `''`

Adds a className to the class attribute.

### children

**Type:** `node`

**Default:** `null`

The children of the rendered `IconButton` component.

### disabled

**Type:** `boolean`

**Default:** `false`

Disables the button.

### href

**Type:** `string`

**Default:** `null`

If a href is supplied, the component renders inside of an `a` tag instead of inside of a `button` tag.

#### Any other properties will be spread on the input element.
