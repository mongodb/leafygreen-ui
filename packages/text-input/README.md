# Text Input

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/text-input.svg)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/text-input
```

### NPM

```shell
npm install @leafygreen-ui/text-input
```

## Example

```Javascript
import TextInput from '@leafygreen-ui/text-input';

const [value, setValue] = useState('');

return (
  <TextInput
    label='Email'
    description='Enter your email below'
    placeholder='your.email@example.com'
    onChange={event => setValue(event.target.value)}
    value={value}
  />
)

```

**Output HTML**

```
not really sure what should go here...
```

## Properties

| Prop           | Type                     | Description                                                                  | Default |
| -------------- | ------------------------ | ---------------------------------------------------------------------------- | ------- |
| `label`        | `string`                 | Text shown in bold above the input element.                                  |         |
| `description`  | `string`                 | Text that gives more detail about the requirements for the input.            |         |
| `optional`     | `boolean`                | Marks the input as optional                                                  | `false` |
| `disabled`     | `boolean`                | Disabled the input                                                           | `false` |
| `onChange`     | `function`               | The event handler function for the 'onchange' event.                         |         |
| `placeholder`  | `string`                 | The placeholder text shown in the input field before the user begins typing. |         |
| `errorMessage` | `string`                 | Text that gives more detail about the requirements for the input.            |         |
| `state`        | `none`, `valid`, `error` | Text that gives more detail about the requirements for the input.            | `none`  |
| `value`        | `string`                 | Sets the HTML `value` attribute.                                             | `''`    |
| `className`    | `string`                 | Adds a className to the class attribute.                                     | `''`    |
