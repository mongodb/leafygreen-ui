# Badge

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/badge.svg)

## Example

```Javascript
import Badge from '@leafygreen-ui/badge';

<Badge variant='Blue' className='my-badge'>
  New
</Badge>
```

**Output HTML**

```HTML
  <div class="leafygreen-ui-rhgfxf my-badge">New</div>
```

## Properties

### variant

**Type:** `string`

**Default:** `'LightGray'`

Sets the style variant of the badge. Valid variants for badges are `'LightGray'`, `'DarkGray'`, `'Red'`, `'Blue'`, `'Green'`, and `'Yellow'`

### className

**Type:** `string`

**Default:** `''`

Adds a className to the class attribute.

### children

**Type:** `node`

**Default:** `null`

The content that will appear inside of the `<Badge />` component.

#### Any other properties will be spread on the root element.

Note: Specifying the `onClick` attribute will change the cursor style to pointer.
