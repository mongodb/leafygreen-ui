## Example 
```js 
<RadioButton
  className='my-radio-button'
  value={/* this is a required prop */}
  disabled={true || false}>
  Label Text Goes Here
</RadioButton>
```

## Output HTML
```html
<label 
  for="0"
  class="leafygreen-ui-i6tne my-radio-button"> 
  <input 
      id="0" 
      name="name-of-input-group" 
      type="radio" 
      aria-checked="true" 
      aria-disabled="false" 
      value="option-1" 
  />
  
  <span class="leafygreen-ui-1qf8api">Label Text Goes Here</span>

</label>
```

## Properties

### value
#### Type: `required`, can be `string` or `integer`
#### Default: ``
Assigns each radio button a value upon creation

### className
#### Type: `string`
#### Default: ''
Adds a className to the input element.

### disabled
#### Type: `boolean`
#### Default: `false`
Indicates whether or not the radio button can be clicked by a user


### children
#### Type: `node`
#### Default: null 
Text that appears adjacent to the radio input