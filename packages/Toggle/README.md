# Toggle

## Example
``` Javascript
<Toggle
  className='my-toggle'
	onChange={(event) => {/* Something to handle the change event */}}
	checked={true}
/>
```

**Output HTML**
```HTML
  <label class="my-toggle css-1rgbgdt css-3jdsksdd" for="toggle-14827892">
		<input
		  checked
			type="checkbox"
			role="checkbox"
			class="css-32kjhsdaf"
			id="toggle-14827892"
			name="toggle-14827892"
			aria-disabled="false"
			aria-checked="true"
		/>

		<div class="css-328akljss"></div>
    
		<div class="css-34kjkdfg css-8sjlkdjcx">
			<div class="css-38kjdsjkdf">On</div>
			<div class="css-22kjdsmncf">Off</div>
			<div class="css-98sdfjsad css-2dsfdsli css-78kljdfva"></div>
		</div>
  </label>
```

## Properties

### variant

**Type:** `string`

**Default:** `'default'`

Sets the style variant of the toggle. Valid variants for toggles are `'default'` and `'dark'`.

### size

**Type:** `string`

**Default:** `'default'`

Sets the size of the toggle. Valid sizes for toggles are `'default'`, `'small'`, and `'xsmall'`.

### checked

**Type:** `boolean`

**Default:** `false`

Checks the toggle.

### disabled

**Type:** `boolean`

**Default:** `false`

Disables the toggle.

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