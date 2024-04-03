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

## Properties

| Prop             | Type                                                                        | Description                                                                                                               | Default                             |
| ---------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `id`             | `string`                                                                    | id associated with the TextInput component.                                                                               |                                     |
| `label`          | `string`                                                                    | Text shown in bold above the input element.                                                                               |                                     |
| `description`    | `string`                                                                    | Text that gives more detail about the requirements for the input.                                                         |                                     |
| `optional`       | `boolean`                                                                   | Marks the input as optional                                                                                               | `false`                             |
| `disabled`       | `boolean`                                                                   | Disabled the input                                                                                                        | `false`                             |
| `onChange`       | `function`                                                                  | The event handler function for the 'onchange' event. Accepts the change event object as its argument and returns nothing. |                                     |
| `onBlur`         | `function`                                                                  | The event handler function for the 'onblur' event. Accepts the focus event object as its argument and returns nothing.    |                                     |
| `placeholder`    | `string`                                                                    | The placeholder text shown in the input field before the user begins typing.                                              |                                     |
| `errorMessage`   | `string`                                                                    | Text that gives more detail about the requirements for the input.                                                         | `'This input needs your attention'` |
| `successMessage` | `string`                                                                    | Text that indicates that the requirements for the input are met.                                                          | `'Success'`                         |
| `state`          | `'none'`, `'valid'`, `'error'`                                              | Describes the state of the TextInput element before and after the input has been validated                                | `'none'`                            |
| `value`          | `string`                                                                    | Sets the HTML `value` attribute.                                                                                          | `''`                                |
| `className`      | `string`                                                                    | Adds a className to the class attribute.                                                                                  | `''`                                |
| `type`           | `'email'`, `'password'`, `'search'`, `'text'`, `'url'`, `'tel'`, `'number'` | Sets type for TextInput                                                                                                   | `'text'`                            |
| `darkMode`       | `boolean`                                                                   | Determines whether or not the component will appear in dark mode.                                                         | `false`                             |
| `sizeVariant`    | `'xsmall'`, `'small'`, `'default'`, `'large'`,                              | Sets the side padding, text size, and input height.                                                                       | `default`                           |
| `baseFontSize`   | `14`, `16`                                                                  | Determines the base font-size of the component if the sizeVariant prop is set to default                                  | `14`                                |
| ...              | native `input` attributes                                                   | Any other props will be spread on the root `input` element                                                                |                                     |

### Special Case: Aria Labels

Either `label` or `aria-labelledby` must be provided a string, or there will be a console error. This is to ensure that screenreaders have a description for what the Text Input does.

# Test Harnesses

## getTestUtils()

`getTestUtils()` is a util that allows consumers to reliably interact with `LG TextInput` in a product test suite. If the `TextInput` component cannot be found, an error will be thrown.

### Usage

```tsx
import TextInput, { getTestUtils } from '@leafygreen-ui/text-input';

const utils = getTestUtils(lgId?: string); // lgId refers to the custom `data-lgid` attribute passed to `TextInput`. It defaults to 'lg-text_input' if left empty.
```

#### Single `TextInput`

```tsx
import { render } from '@testing-library/react';
import TextInput, { getTestUtils } from '@leafygreen-ui/text-input';

...

test('text-input', () => {
  render(<TextInput label="label" value="text input" />);
  const { getInput, getInputValue } = getTestUtils();

  expect(getInput()).toBeInTheDocument();
  expect(getInputValue()).toBe('text input');
});
```

#### Multiple `TextInput`'s

When testing multiple `TextInput`'s it is recommended to add the custom `data-lgid` attribute to each `TextInput`.

```tsx
import { render } from '@testing-library/react';
import TextInput, { getTestUtils } from '@leafygreen-ui/text-input';

...

test('text-input', () => {
  render(
    <>
      <TextInput data-lgid="text-input-1" label="label 1" />
      <TextInput data-lgid="text-input-2" label="label 2" value="text input" />
    </>,
  );
  const utilsOne = getTestUtils('text-input-1'); // data-lgid
  const utilsTwo = getTestUtils('text-input-2'); // data-lgid

  // First TextInput
  expect(utilsOne.getInput()).toBeInTheDocument();
  expect(utilsOne.getInputValue()).toBe('');

  // Second TextInput
  expect(utilsTwo.getInput()).toBeInTheDocument();
  expect(utilsTwo.getInputValue()).toBe('text input');
});
```

#### TextInput with other LG form elements

```tsx
import { render } from '@testing-library/react';
import Toggle, { getTestUtils as getToggleTestUtils } from '@leafygreen-ui/toggle';
import TextInput, { getTestUtils as getTextInputTestUtils } from '@leafygreen-ui/text-input';
import TextArea, { getTestUtils as getTextAreaTestUtils } from '@leafygreen-ui/text-area';

...

test('Form', () => {
  render(
    <Form>
      <Toggle aria-label="Toggle label" />
      <TextInput label="TextInput label" />
      <TextArea label="TextArea label" />
    </Form>,
  );
  const toggleInputUtils = getToggleTestUtils();
  const textInputUtils = getTextInputTestUtils();
  const textAreaUtils = getTextAreaTestUtils();

  // LG Toggle
  expect(toggleInputUtils.getInput()).toBeInTheDocument();
  expect(toggleInputUtils.getInputValue()).toBe('false');

  // LG TextInput
  expect(textInputUtils.getInput()).toBeInTheDocument();
  expect(textInputUtils.getInputValue()).toBe('');

  // LG TextArea
  expect(textAreaUtils.getInput()).toBeInTheDocument();
  expect(textAreaUtils.getInputValue()).toBe('');
});
```

### Test Utils

```tsx
const {
  getInput,
  getLabel,
  getDescription,
  getErrorMessage,
  getInputValue,
  isDisabled,
  isValid,
  isError,
  isOptional,
} = getTestUtils();
```

| Util              | Description                                | Returns                       |
| ----------------- | ------------------------------------------ | ----------------------------- |
| `getInput`        | Returns the input node                     | `HTMLButtonElement`           |
| `getLabel`        | Returns the label node                     | `HTMLButtonElement` \| `null` |
| `getDescription`  | Returns the description node               | `HTMLButtonElement` \| `null` |
| `getErrorMessage` | Returns the error message node             | `HTMLButtonElement` \| `null` |
| `getInputValue`   | Returns the input value                    | `string`                      |
| `isDisabled`      | Returns whether the input is disabled      | `boolean`                     |
| `isValid`         | Returns whether the input state is `valid` | `boolean`                     |
| `isError`         | Returns whether the input state is `error` | `boolean`                     |
| `isOptional`      | Returns whether the input is `optional`    | `boolean`                     |
