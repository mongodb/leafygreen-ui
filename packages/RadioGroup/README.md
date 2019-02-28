# RadioGroup

## Example
```js
<RadioGroup
    className='my-radio-group'
    variant='default'
    onChange={event => () => console.log('hi')}
    value='option-1'
    name='name-of-input-group'>

    <RadioButton 
        className='my-radio-button'
        value='option-1'>
        Label Text Goes Here
    </RadioButton>
</RadioGroup>
```

## Output HTML
```html
<div class="leafygreen-ui-1gj6ct2 my-radio-group">
    <label 
        for="radio-group-570638-button-0" 
        class="leafygreen-ui-14b5mmy my-radio-button">
        <input 
            id="radio-group-570638-button-0" 
            name="radio-group-default" 
            type="radio" 
            class="leafygreen-ui-i6tne" 
            aria-checked="false" 
            aria-disabled="false" 
            value="1">
        <span class="leafygreen-ui-1qf8api">Option One</span>
    </label>
</div>
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

### children
#### Type: `node`
#### Default: `null`
Can be any node; however, any `<RadioButton />` components, will be treated as belonging to the `<RadioGroup />` compound component, and will recieve internal state from `<RadioGroup />`

# Radio Button