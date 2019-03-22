# Button

## Example
``` Javascript
<Button
  variant='primary'
  className='create-item-button'
  title='Create an item'
  onClick={(event) => {/* Something to handle the click event */}}
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

### onClick

**Type:** `function`

**Default:** `() => {}`

The event handler function for the 'onclick' event. Receives the associated `event` object as the first argument.

### className

**Type:** `string`

**Default:** `''`

Adds a className to the class attribute.

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

### as 

**Type:** `HTML Tag` or `React Element`

**Default:** `button`

Determines the root element. For example, `Link` or `a` tags can be supplied to replace `button` from being the DOM element that wraps the component.

### href 
**Type:** `string` 

**Default:** `null`

If an href is supplied it willl change the `as` value, such that the component renders inside of an `a` tag instead of inside of a `button` tag.

#### Any other properties will be spread on the input element.
