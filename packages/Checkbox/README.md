# Checkbox

## Example
``` Javascript
<Checkbox
	className='my-checkbox'
	onChange={(event) => {/* Something to handle the click event */}}
	label='This is how you enable a thing'
	checked={true}
/>
```

**Output HTML**
```HTML
  <label class="css-1rgbgdt my-checkbox" title="Create an item" for="checkbox-14827892">
		<input
		  checked
			type="checkbox"
			role="checkbox"
			class="css-32kjhsdaf"
			id="checkbox-14827892"
			name="checkbox-14827892"
			aria-disabled="false"
			aria-checked="true"
			aria-labeledby="checkbox-14827892-label"
		/>
    
		<div class="css-34kjkdfg">
			<div class="css-98sdfjsad"></div>
		</div>

		<span class="css-8xdsjfh9" id="checkbox-14827892-label">
			This is how you enable a thing
		</span>
  </label>
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

The event handler function for the 'onchange' event. Receives the associated `event` object as the first argument, and a `boolean` indicating whether or not the event.target is checked as the second argument.
	* Signature `function(event: object, checked: boolean)`
		* Event: The event source of the callback
		* Checked: The event target's checked state
