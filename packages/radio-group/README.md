# RadioGroup

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/radio-group.svg)

## Example

```js
import { Radio, RadioGroup } from '@leafygreen-ui/radio-group';

<RadioGroup
  className="my-radio-group"
  variant="default"
  onChange={event => console.log('hi')}
  value="option-1"
  name="name-of-input-group"
>
  <Radio className="my-radio" value="option-1">
    Label Text Goes Here
  </Radio>
</RadioGroup>;
```

## Output HTML

```html
<div
  class="leafygreen-ui-16glayc my-radio-group"
  role="group"
  aria-label="radio-group-660118"
>
  <label
    for="radio-group-660118-button-0"
    class="leafygreen-ui-11wfvmq my-radio"
  >
    <input
      id="radio-group-660118-button-0"
      name="name-of-input-group"
      type="radio"
      class="leafygreen-ui-i6tne my-radio"
      aria-checked="true"
      aria-disabled="false"
      value="option-1"
    />
    <span class="leafygreen-ui-1l7rt9l">Label Text Goes Here</span>
  </label>
</div>
```

## Properties

### variant

**Type:** `string`

**Default:** `'default'`

Sets the style variant of the toggle. Valid variants for toggles are `'default'` and `'light'`.

### name

**Type:** `string`

**Default:** ''

Sets the name of the input group

### value

**Type:** `string` or `integer`

**Default:** ``

Sets the radio that will apear checked on page load, also makes the component a controlled component

### className

**Type:** `string`

**Default:** `''`

Adds a className to the root element.

### onChange

**Type:** `function`

**Default:** `() => {}`

The event handler function for the 'onchange' event. Receives the associated `event` object as the first argument.

### children

**Type:** `node`
**Default:** `null`
Can be any node; however, any `<Radio />` components, will be treated as belonging to the `<RadioGroup />` compound component, and will recieve internal state from `<RadioGroup />`

#### Any other properties will be spread on the root element.

# Radio

## Example

```js
<Radio className="my-radio" value="option-1" disabled={true}>
  Label Text Goes Here
</Radio>
```

## Output HTML

```html
<label class="leafygreen-ui-11wfvmq my-radio">
  <input
    type="radio"
    class="leafygreen-ui-i6tne my-radio"
    aria-checked="false"
    disabled="true"
    aria-disabled="true"
    value="option-1"
  />
  <span class="leafygreen-ui-1l7rt9l">Label Text Goes Here</span>
</label>
```

## Properties

### value

**Type:** `required`, can be a `string` or an `integer`

Every radio needs a value prop

### className

**Type:** `string`

**Default:** ``

Adds a className to the label

### disabled

**Type:** `boolean`

**Default:** `false`

Indicates whether or not the radio can be clicked by a user

### children

**Type:** `node`

**Default:** `null`

Text that appears adjacent to the radio input; label text.

### default

**Type:** `boolean`

If RadioGroup is uncontrolled, the default property makes this Radio checked on the initial render.

#### Any other properties will be spread on the `input` element.
