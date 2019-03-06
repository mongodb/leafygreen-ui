# Rich Radio Group 

## Example
```js
<RichRadioGroup size="medium">
  <RichRadioInput value="option-1">Rich Radio 1</RichRadioInput>
  <RichRadioInput value="option-2">Rich Radio 2</RichRadioInput>
</RichRadioGroup>
```

## Output HTML
```html
<div class="leafygreen-ui-aht7rx ">
  <label 
    for="rich-radio-group-71270-button-0"
    class="leafygreen-ui-1aaryka leafygreen-ui-1yje6go false ">  
    <input 
      type="radio" 
      id="rich-radio-group-71270-button-0" 
      name="rich-radio-group-71270" 
      aria-checked="false" 
      aria-disabled="false" 
      class="leafygreen-ui-51phbe" 
      value="option-1">
    <div class="leafygreen-ui-14cn59g">Rich Radio 1</div>
  </label>
  
  <label 
    for="rich-radio-group-71270-button-1" 
    class="leafygreen-ui-1aaryka leafygreen-ui-1yje6go false ">
    <input 
      type="radio" 
      id="rich-radio-group-71270-button-1" 
      name="rich-radio-group-71270" 
      aria-checked="false" 
      aria-disabled="false" 
      class="leafygreen-ui-51phbe" 
      value="option-2">

    <div class="leafygreen-ui-14cn59g">Rich Radio 2</div>
  </label>
</div>
```

## Properties

### varitant
#### Type: `string`
#### Default: `default`
Sets the style variant of the Rich Radio Group. Valid variants are `default` and `green`

### size
#### Type: `string`
#### Default: `medium`
Sets the style of the Rich Radio Group. Valid sizes are `tightContentBox`, `full`, `small` and `medium`

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
Adds a className to the outermost element.

### onChange
#### Type: `function`
#### Default: `() => {}`
The event handler function for the 'onchange' event. Receives the associated event object as the first argument.

### children
#### Type: `node`
#### Default: `null`
Can be any node; however, any <RichRadioInput /> components, will be treated as belonging to the <RichRadioGroup /> compound component, and will recieve internal state from <RichRadioGroup />


# Rich Radio Input

## Example 
```js
  <RichRadioInput value="option-disabled" disabled>Rich Radio</RichRadioInput>
```

## Output HTML
```html
  <label 
    for="rich-radio-group-71270-button-2" 
    class="leafygreen-ui-1aaryka leafygreen-ui-1yje6go false "> 
    <input 
      type="radio" 
      id="rich-radio-group-71270-button-2" 
      name="rich-radio-group-71270" 
      aria-checked="false" 
      disabled="" 
      aria-disabled="true" 
      class="leafygreen-ui-51phbe" 
      value="option-3">
    <div class="leafygreen-ui-14cn59g">Rich Radio 3</div>
  </label> 
```

## Properties

### value
#### Type: required, can be a `string` or an `integer`
Every radio needs a value prop

### className
#### Type: string
#### Default: ``
Adds a className to the label

### checked 
#### Type: `boolean`
#### Default: `false`
Indicates whether or not the input will be checked. Unless using the component as a standalone, do not use this prop. Instead, use the value prop on the Rich Radio Group to indicate which input should be marked as checked. 

### disabled
#### Type: `boolean`
#### Default: `false`
Indicates whether or not the radio can be clicked by a user

### children
#### Type: `node`
#### Default: `null`
Text that appears adjacent to the radio inpt; label text.