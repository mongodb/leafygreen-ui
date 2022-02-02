# Text Input

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/text-input.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/text-input/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/text-input
```

### NPM

```shell
npm install @leafygreen-ui/text-input
```

## Peer Dependencies

| Package                              | Version  |
| ------------------------------------ | -------- |
| `@leafygreen-ui/leafygreen-provider` | `^1.1.0` |

## Example

```js
import TextInput from '@leafygreen-ui/text-input';

const [value, setValue] = useState('');

return (
  <TextInput
    label="Email"
    description="Enter your email below"
    placeholder="your.email@example.com"
    onChange={event => {
      /* Something to handle the change event */
    }}
    value={value}
  />
);
```

**Output HTML**

```html
<div class="leafygreen-ui-4t2zpc">
  <label for="text-input-2604213" class="leafygreen-ui-1ie388"> Email </label>
  <p class="leafygreen-ui-1vlu192">Enter your email below</p>
  <div class="leafygreen-ui-lzja97">
    <input
      data-leafygreen-ui="input-selector"
      class="leafygreen-ui-86cw8t"
      type="text"
      required=""
      placeholder="your.email@example.com"
      id="text-input-2604213"
      value=""
    />
    <div data-leafygreen-ui="icon-selector" class="leafygreen-ui-m329s1"></div>
    <div class="leafygreen-ui-1andb55"></div>
  </div>
</div>
```

## Properties

| Prop           | Type                                                                        | Description                                                                                                               | Default   |
| -------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------- |
| `id`           | `string`                                                                    | id associated with the TextInput component.                                                                               |           |
| `label`        | `string`                                                                    | Text shown in bold above the input element.                                                                               |           |
| `description`  | `string`                                                                    | Text that gives more detail about the requirements for the input.                                                         |           |
| `optional`     | `boolean`                                                                   | Marks the input as optional                                                                                               | `false`   |
| `disabled`     | `boolean`                                                                   | Disabled the input                                                                                                        | `false`   |
| `onChange`     | `function`                                                                  | The event handler function for the 'onchange' event. Accepts the change event object as its argument and returns nothing. |           |
| `onBlur`       | `function`                                                                  | The event handler function for the 'onblur' event. Accepts the focus event object as its argument and returns nothing.    |           |
| `placeholder`  | `string`                                                                    | The placeholder text shown in the input field before the user begins typing.                                              |           |
| `errorMessage` | `string`                                                                    | Text that gives more detail about the requirements for the input.                                                         |           |
| `state`        | `'none'`, `'valid'`, `'error'`                                              | Describes the state of the TextInput element before and after the input has been validated                                | `'none'`  |
| `value`        | `string`                                                                    | Sets the HTML `value` attribute.                                                                                          | `''`      |
| `className`    | `string`                                                                    | Adds a className to the class attribute.                                                                                  | `''`      |
| `type`         | `'email'`, `'password'`, `'search'`, `'text'`, `'url'`, `'tel'`, `'number'` | Sets type for TextInput                                                                                                   | `'text'`  |
| `darkMode`     | `boolean`                                                                   | Determines whether or not the component will appear in dark mode.                                                         | `false`   |
| `sizeVariant`  | `'xsmall'`, `'small'`, `'default'`, `'large'`,                              | Sets the side padding, text size, and input height.                                                                       | `default` |
| `baseFontSize` | `14`, `16`                                                                  | Determines the base font-size of the component if the sizeVariant prop is set to default                                  | `14`      |
| ...            | native `input` attributes                                                   | Any other props will be spread on the root `input` element                                                                |           |

### Special Case: Aria Labels

Either `label` or `aria-labelledby` must be provided a string, or there will be a console error. This is to ensure that screenreaders have a description for what the Text Input does.
