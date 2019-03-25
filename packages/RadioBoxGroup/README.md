# Radio Box Group

## Example
```js
<RadioBoxGroup className="radio-box-group-style">
  <RadioBox value="option-1">Radio Box 1</RadioBox>
  <RadioBox value="option-2">Radio Box 2</RadioBox>
</RadioBoxGroup>
```

## Output HTML
```html
<div class="leafygreen-ui-k008qs radio-box-group-style">
  <label 
    for="radio-box-group-850132-button-0" 
    class="leafygreen-ui-i6e9um"
  >
    <input 
      type="radio" 
      id="radio-box-group-850132-button-0" 
      name="radio-box-group-850132" 
      aria-checked="false" 
      aria-disabled="false" 
      class="leafygreen-ui-10udnlm" 
      value="option-1"
    >
    <div class="leafygreen-ui-1rd79mb"></div>
    <div class="leafygreen-ui-1m9u12l leafygreen-ui-tv1yok">Radio Box 1</div>
  </label>
  <label 
    for="radio-box-group-850132-button-1" 
    class="leafygreen-ui-i6e9um"
  >
    <input 
      type="radio" 
      id="radio-box-group-850132-button-1" 
      name="radio-box-group-850132" 
      aria-checked="false" 
      aria-disabled="false" 
      class="leafygreen-ui-10udnlm" 
      value="option-2"
    >
    <div class="leafygreen-ui-1rd79mb"></div>
    <div class="leafygreen-ui-1m9u12l leafygreen-ui-tv1yok">Radio Box 2</div>
  </label>
</div>
```

## Properties

### size
**Type:** `string`
**Default:** `default`
Sets the style of the Radio Box Group. Valid sizes are `tightContentBox`, `full` and `default`
  * `tightContentBox` adds padding to text, so there is no fixed width amongst a collection of boxes 
  * `default` has a fixed width and text will wrap accordingly 
  * `full` radio boxes will scale depending on available space (will take up 100% of their parent container). All boxes will tbe the same size

### name
**Type:** `string`
**Default:** ''
Sets the name of the input group

### value
**Type:** `string` or `number`
**Default:** ``
Sets the radio that will apear checked on page load, also makes the component a controlled component

### className
**Type:** `string`
**Default:** ''
Adds a className to the root element

### onChange
**Type:** `function`
**Default:** `() => {}`
The event handler function for the 'onChange' event. Receives the associated event object as the first argument.

### children
**Type:** `node`
**Default:** `null`
Content of the component

### Any other properties supplied will be spread on the root element.
 
# Rich Radio Input

## Example 
```js
  <RadioBox value="option-2">Radio Box 2</RadioBox>
```

## Output HTML
```html
  <label 
    for="radio-box-group-746930-button-1" 
    class="leafygreen-ui-i6e9um"
  >  
    <input 
      type="radio" 
      id="radio-box-group-746930-button-1" 
      name="radio-box-group-746930"
      aria-checked="false" 
      aria-disabled="false" 
      class="leafygreen-ui-10udnlm" 
      value="option-2"
    >
    <div class="leafygreen-ui-1rd79mb"></div>
    <div class="leafygreen-ui-1m9u12l leafygreen-ui-tv1yok">Radio Box 2</div>
  </label>
```

## Properties

### value
**Type:** required, can be a `string` or an `number`
Every radio needs a value prop

### className
**Type:** string
**Default:** ``
Adds a className to the root element

### checked 
**Type:** `boolean`
**Default:** `false`
Indicates whether or not the box will be checked

### disabled
**Type:** `boolean`
**Default:** `false`
Indicates whether or not the radio can be clicked by a user

### children
**Type:** `node`
**Default:** `null`
Content that appears inside the Radio Box component

### Any other properties supplied will be spread on the root element.
