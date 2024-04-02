# Text Area

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/text-area.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/text-area/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/text-area
```

### NPM

```shell
npm install @leafygreen-ui/text-area
```

## Example

```js
import TextArea from '@leafygreen-ui/text-area';

const [value, setValue] = useState('');

return (
  <TextArea
    label="Text Area Label"
    description="This is the description for the text area"
    onChange={event => {
      /* Something to handle the change event */
    }}
    value={value}
  />
);
```

## Properties

| Prop          | Type                           | Description                                                                                                               | Default  |
| ------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | -------- |
| `id`          | `string`                       | id to describe the `<textarea>` element                                                                                   |          |
| `darkMode`    | `boolean`                      | Determines whether or not the component will appear in dark mode.                                                         | `false`  |
| `label`       | `string`                       | Label for `<textarea>`                                                                                                    |          |
| `description` | `React.ReactNode`              | Description below label                                                                                                   |          |
| `state`       | `'none'`, `'valid'`, `'error'` | Determines the state of the `<textarea>`                                                                                  | `'none'` |
| `className`   | `string`                       | className applied to the container element                                                                                |          |
| `disabled`    | `boolean`                      | Determines if the component is disabled                                                                                   | `false`  |
| `onChange`    | `function`                     | The event handler function for the 'onchange' event. Accepts the change event object as its argument and returns nothing. |          |
| `onBlur`      | `function`                     | The event handler function for the 'onblur' event. Accepts the focus event object as its argument and returns nothing.    |          |

# Test Harnesses

## getTestUtils()

`getTestUtils()` is a util that allows consumers to reliably interact with `LG TextArea` in a product test suite. If the `TextArea` component cannot be found, an error will be thrown.

### Usage

```tsx
import TextArea, { getTestUtils } from '@leafygreen-ui/text-area';

const utils = getTestUtils(lgId?: string); // lgId refers to the custom `data-lgid` attribute passed to `TextArea`. It defaults to 'lg-text_area' if left empty.
```

#### Single `TextArea`

```tsx
import { render } from '@testing-library/react';
import TextArea, { getTestUtils } from '@leafygreen-ui/text-area';

...

test('text-area', () => {
  render(<TextArea label="label" value="text area" />);
  const { getInput, getInputValue } = getTestUtils();

  expect(getInput()).toBeInTheDocument();
  expect(getInputValue()).toBe('text area');
});
```

#### Multiple `TextArea`'s

When testing multiple `TextArea`'s it is recommended to add the custom `data-lgid` attribute to each `TextArea`.

```tsx
import { render } from '@testing-library/react';
import TextArea, { getTestUtils } from '@leafygreen-ui/text-area';

...

test('text-area', () => {
  render(
    <>
      <TextArea data-lgid="text-area-1" label="label 1" />
      <TextArea data-lgid="text-area-2" label="label 2" value="text area" />
    </>,
  );
  const utilsOne = getTestUtils('text-area-1'); // data-lgid
  const utilsTwo = getTestUtils('text-area-2'); // data-lgid

  // First TextArea
  expect(utilsOne.getInput()).toBeInTheDocument();
  expect(utilsOne.getInputValue()).toBe('');

  // Second TextArea
  expect(utilsTwo.getInput()).toBeInTheDocument();
  expect(utilsTwo.getInputValue()).toBe('text area');
});
```

#### TextArea with other LG form elements

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

#### Elements

```tsx
const {
  getInput,
  getLabel,
  getDescription,
  getErrorMessage,
  getInputValue,
  isDisabled,
  isError,
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
| `isError`         | Returns whether the input state is `error` | `boolean`                     |
