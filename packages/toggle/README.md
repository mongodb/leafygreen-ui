# Toggle

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/toggle.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/toggle--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/toggle
```

### NPM

```shell
npm install @leafygreen-ui/toggle
```

## Example

```js
import Toggle from '@leafygreen-ui/toggle';

<Toggle
  className="my-toggle"
  onChange={event => {
    /* Something to handle the change event */
  }}
  checked={true}
/>;
```

**Output HTML**

```html
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
| `darkMode`  | `boolean`                          | Determines if the Toggle will appear in dark mode.                                                                 | `false`                   |
| `size`      | `'default'`, `'small'`, `'xsmall'` | Sets the size of the toggle.                                                                                       | `'default'`               |
| `checked`   | `boolean`                          | Checks the `<Toggle />`.                                                                                           |                           |
| `disabled`  | `boolean`                          | Disables the `<Toggle />`.                                                                                         | `false`                   |
| `onChange`  | `function`                         | The event handler function for the 'onchange' event. Receives the associated `event` object as the first argument. | `() => {}`                |
| `id`        | `string` or `number`               | Adds an ID only to the input, and it's used elsewhere for accessibility props.                                     | Randomly generated string |
| `className` | `string`                           | Adds a className to the outermost element.                                                                         | `''`                      |

_Any other properties will be spread on the `input` element._
