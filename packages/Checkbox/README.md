# Radio Group

## Example
``` Javascript
<RadioGroup
	className='my-radopgrpi['
	onChange={(event) => {/* Something to handle the click event */}}
	value='Provide a value to contorl the component'
/>
```

**Output HTML**
```HTML
  	<form class="leafygreen-ui-1kampq7 ">
	  	<label for="0" aria-disabled="false" class="leafygreen-ui-167ghcs ">
		  	<input id="0" name="" type="radio" class="leafygreen-ui-1jxa6s5 " aria-checked="false" aria-disabled="false" value="option-1">
			  <span class="leafygreen-ui-1qf8api">Option One</span>
			</label>
			
			<label for="3" disabled="" aria-disabled="true" class="leafygreen-ui-167ghcs ">
				<input id="3" name="" type="radio" class="leafygreen-ui-1jxa6s5 " aria-checked="false" disabled="" aria-disabled="true" value="option-4">
				<span class="leafygreen-ui-1qf8api">Disabled Option</span>
			</label>
	</form>
```

## Properties

### variant

**Type:** `string`

**Default:** `'default'`

Sets the style variant of the checkbox. Valid variants for checkboxes are `'default'` and `'light'`.

### checked

**Type:** `boolean`

**Default:** `false`

Checks the checkbox.

### label

**Type:** `node`

**Default:** `null`

The label for the checkbox.

### disabled

**Type:** `boolean`

**Default:** `false`

Disables the checkbox.

### indeterminate

**Type:** `boolean`

**Default:** `false`

Sets the checkbox as indeterminate. **NOTE:** the checkbox will become out of sync with the indeterminate prop when it's clicked. Make sure to unset the `indeterminate` prop on change where you're controlling your input.

### className

**Type:** `string`

**Default:** `''`

Adds a className to the outermost element.

### onChange

**Type:** `function`

**Default:** `() => {}`

The event handler function for the 'onchange' event. Receives the associated `event` object as the first argument.
