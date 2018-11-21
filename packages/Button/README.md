# Button

## Example
``` Javascript
<Button
  variant='primary'
  className='create-item-button'
  title='Create an item'
  onclick={(event) => {/* Something to handle the click event */}}
>
  Submit 
</Button>
```

**Output HTML**
```HTML
  <button class="css-1rgbgdt create-item-button" title="Create an item" disabled="false">
    Submit
  </button>
```


## Properties

### variant
**Type:** `string`
**Default:** `'default'`
Sets the style variant of the button. Valid variants for buttons are `'default'`, `'primary'`, `'info'`, `'danger'`, and `'dark'`.

### size
**Type:** `string`
**Default:** `'normal'`
Sets the size variant of the button. Valid variants for buttons are `'xsmall'`, `'small'`, `'normal'`, and `'large'`.

### `onClick`
**Type:** `function`
**Default:** `() => {}`
The event handler function for the 'onclick' event. Receives the associated `event` object as the first argument.

### className
**Type:** `string`
**Default:** `''`
Adds a className to the class attribute.

### style
**Type:** `object`
**Default:** `{}`
Applies inline styles to the button. [React inline styling docs](https://reactjs.org/docs/dom-elements.html#style)

### name
**Type:** `string`
**Default:** `null`
Sets the HTML `name` attribute.

### type
**Type:** `string`
**Default:** `'button'`
Sets the HTML `type` attribute. Valid types for buttons are `'button'`, `'submit'`, and `'reset'`.

### title
**Type:** `string`
**Default:** `null`
Sets the HTML `title` attribute.

### children
**Type:** `node`
**Default:** `null`
The children of the rendered `<button>` element.

### value
**Type:** `string`
**Default:** `null`
Sets the HTML `value` attribute.

### disabled
**Type:** `boolean`
**Default:** `false`
Disables the button.

### tabIndex
**Type:** `number`
**Default:** `null`
Sets the HTML `tabIndex` attribute.
