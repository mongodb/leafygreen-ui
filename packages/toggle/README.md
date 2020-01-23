# Toggle

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/toggle.svg)

## Installation

`yarn install @leafygreen-ui/toggle`

## Example

```Javascript
import Toggle from '@leafygreen-ui/toggle'

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

| Prop        | Type                               | Description                                                                                                        | Default                   |
| ----------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `variant`   | `'default'`, `'dark'`              | Sets the style variant of the toggle.                                                                              | `'default'`               |
| `size`      | `'default'`, `'small'`, `'xsmall'` | Sets the size of the toggle.                                                                                       | `'default'`               |
| `checked`   | `boolean`                          | Checks the `<Toggle />`.                                                                                           |                           |
| `disabled`  | `boolean`                          | Disables the `<Toggle />`.                                                                                         | `false`                   |
| `onChange`  | `function`                         | The event handler function for the 'onchange' event. Receives the associated `event` object as the first argument. | `() => {}`                |
| `id`        | `string` or `number`               | Adds an ID only to the input, and it's used elsewhere for accessibility props.                                     | Randomly generated string |
| `className` | `string`                           | Adds a className to the outermost element.                                                                         | `''`                      |

_Any other properties will be spread on the `input` element._
