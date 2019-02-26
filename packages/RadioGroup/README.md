# RadioGroup

## Example
```js
<RadioGroup
    className='my-radio-group'
    variant={'default' || 'light'}
    onChange={event => {/* Something to handle the change event */}}
    value={/* Make it a controlled component */}
    name='name-of-input-group'>

    <RadioButton 
        className='my-radio-button'
        value={/* this is a required prop */>}
        disabled={true || false}>
    Label Text Goes Here
    </RadioButton>

</RadioGroup>
```

## Output HTML
```html
<form 
    class="leafygreen-ui-1gj6ct2 my-radio-group">

    <label 
        for="0" 
        <input 
            id="0" 
            name="name-of-input-group" 
            type="radio" 
            class="leafygreen-ui-i6tne my-radio-button" 
            aria-checked="true" 
            aria-disabled="false" 
            value="option-1" 
        />
        
        <span class="leafygreen-ui-1qf8api">Label Text Goes Here</span>

    </label>
</form>
```

## Properties 

### variant 
#### Type: `string`
#### Default: `default`
Sets the style variant of the Radio Group. Valid variants are `default` and `light`

### name 
#### Type: `string`
#### Default: ''
Sets the name of the input group

### value 
#### Type: `string` or `integer`
#### Default: ``
Sets the radio button that will apear checked on page load, also makes the component a controlled component 

### className
#### Type: `string`
##### Default: ''
Adds a className to the outermost element.

### onChange 
#### Type: `function`
#### Default: `() => {}`
The event handler function for the 'onchange' event. Receives the associated event object as the first argument.
