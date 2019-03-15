# Radio Box Group

## Example
```js
<RadioBoxGroup size="medium" className="radio-box-group-style">
  <RadioBox value="option-1">Radio Box 1</RadioBox>
  <RadioBox value="option-2">Radio Box 2</RadioBox>
</RadioBoxGroup>
```

## Output HTML
```html
<div class="leafygreen-ui-aht7rx radio-box-group-style">
  <label 
    for="radio-box-group-71270-button-0"
    class="leafygreen-ui-1aaryka leafygreen-ui-1yje6go">  
    <input 
      type="radio" 
      id="radio-box-group-71270-button-0" 
      name="radio-box-group-71270" 
      aria-checked="false" 
      aria-disabled="false" 
      class="leafygreen-ui-51phbe" 
      value="option-1">
    <div class="leafygreen-ui-14cn59g">Radio Box 1</div>
  </label>
  
  <label 
    for="radio-box-group-71270-button-1" 
    class="leafygreen-ui-1aaryka leafygreen-ui-1yje6go">
    <input 
      type="radio" 
      id="radio-box-group-71270-button-1" 
      name="radio-box-group-71270" 
      aria-checked="false" 
      aria-disabled="false" 
      class="leafygreen-ui-51phbe" 
      value="option-2">

    <div class="leafygreen-ui-14cn59g">Radio Box 2</div>
  </label>
</div>
```

## Properties

### size
#### Type: `string`
#### Default: `medium`
Sets the style of the Radio Box Group. Valid sizes are `tightContentBox`, `full`, `small` and `medium`
  * `tightContentBox` adds padding to text, so there is no fixed width amongst a collection of boxes 
  * `default` has a fixed width and text will wrap accordingly 
  * `full` radio boxes will scale depending on available space (will take up 100% of their parent container). All boxes will tbe the same size

### name
#### Type: `string`
#### Default: ''
Sets the name of the input group

### value
#### Type: `string` or `integer`
#### Default: ``
Sets the radio that will apear checked on page load, also makes the component a controlled component

### className
### Type: `string`
### Default: ''
Adds a className to the root element

### onChange
#### Type: `function`
#### Default: `() => {}`
The event handler function for the 'onchange' event. Receives the associated event object as the first argument and the event target's value (string) as the second.
* Signature function(event: object, value: string)
  * Event: The event source of the callback
  * Value: The value of the selected radio

### children
#### Type: `node`
#### Default: `null`
Content of the component

### Any other properties supplied will be spread on the root element.
 
# Rich Radio Input

## Example 
```js
  <RadioBox value="option-disabled" disabled>Radio Box</RadioBox>
```

## Output HTML
```html
  <label 
    for="radio-box-group-71270-button-2" 
    class="leafygreen-ui-1aaryka leafygreen-ui-1yje6go false "> 
    <input 
      type="radio" 
      id="radio-box-group-71270-button-2" 
      name="radio-box-group-71270" 
      aria-checked="false" 
      disabled="" 
      aria-disabled="true" 
      class="leafygreen-ui-51phbe" 
      value="option-3">
    <div class="leafygreen-ui-14cn59g">Radio Box 3</div>
  </label> 
```

## Properties

### value
#### Type: required, can be a `string` or an `integer`
Every radio needs a value prop

### className
#### Type: string
#### Default: ``
Adds a className to the root element

### checked 
#### Type: `boolean`
#### Default: `false`
Indicates whether or not the box will be checked

### disabled
#### Type: `boolean`
#### Default: `false`
Indicates whether or not the radio can be clicked by a user

### children
#### Type: `node`
#### Default: `null`
Content that appears inside the Radio Box component

### Any other properties supplied will be spread on the root element.
