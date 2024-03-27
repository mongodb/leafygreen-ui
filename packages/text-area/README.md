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

## getLGTextAreaTestUtils()

`getLGTextAreaTestUtils()` is a util that allows consumers to reliably interact with `LG TextArea` in a product test suite. If the `TextArea` component cannot be found, an error will be thrown.

### Usage

```tsx
import TextArea, { getLGTextAreaTestUtils } from '@leafygreen-ui/text-area';

const { elements, utils } = getLGTextAreaTestUtils(lgId?: string); // lgId refers to the custom `data-lgid` attribute passed to `TextArea`. It defaults to 'lg-text_area' if left empty.
```

#### Single `TextArea`

```tsx
import { render } from '@testing-library/react';
import TextArea, { getLGTextAreaTestUtils } from '@leafygreen-ui/text-area';

...

test('text-area', () => {
  render(<TextArea label="label" value="text area" />);
  const { elements, utils } = getLGTextAreaTestUtils();

  expect(elements.getInput()).toBeInTheDocument();
  expect(utils.getInputValue()).toBe('text area');
});
```

#### Multiple `TextArea`'s

When testing multiple `TextArea`'s it is recommended to add the custom `data-lgid` attribute to each `TextArea`.

```tsx
import { render } from '@testing-library/react';
import TextArea, { getLGTextAreaTestUtils } from '@leafygreen-ui/text-area';

...

test('text-area', () => {
  render(
    <>
      <TextArea data-lgid="text-area-1" label="label 1" />
      <TextArea data-lgid="text-area-2" label="label 2" value="text area" />
    </>,
  );
  const { elements: lgElementsTextArea1, utils: lgUtilsTextArea1 } =
    getLGTextAreaTestUtils('text-area-1'); // data-lgid
  const { elements: lgElementsTextArea2, utils: lgUtilsTextArea2 } =
    getLGTextAreaTestUtils('text-area-2'); // data-lgid

  // First TextArea
  expect(lgElementsTextArea1.getInput()).toBeInTheDocument();
  expect(lgUtilsTextArea1.getInputValue()).toBe('');

  // Second TextArea
  expect(lgElementsTextArea2.getInput()).toBeInTheDocument();
  expect(lgUtilsTextArea2.getInputValue()).toBe('text area');
});
```

#### TextArea with other LG form elements

```tsx
import { render } from '@testing-library/react';
import Toggle, { getLGToggleTestUtils } from '@leafygreen-ui/toggle';
import TextInput, { getLGTextInputTestUtils } from '@leafygreen-ui/text-input';
import TextArea, { getLGTextAreaTestUtils } from '@leafygreen-ui/text-area';

...

test('Form', () => {
  render(
    <Form>
      <Toggle aria-label="Toggle label" />
      <TextInput label="TextInput label" />
      <TextArea label="TextArea label" />
    </Form>,
  );
  const { elements: lgElementsToggle, utils: lgUtilsToggle } = getLGTextAreaTestUtils();
  const { elements: lgElementsTextInput, utils: lgUtilsTextInput } = getLGTextInputTestUtils();
  const { elements: lgElementsTextArea, utils: lgUtilsTextArea } = getLGTextAreaTestUtils();

  // LG Toggle
  expect(lgElementsToggle.getInput()).toBeInTheDocument();
  expect(lgUtilsToggle.getInputValue()).toBe('false');

  // LG TextInput
  expect(lgElementsTextInput.getInput()).toBeInTheDocument();
  expect(lgUtilsTextInput.getInputValue()).toBe('');

  // LG TextArea
  expect(lgElementsTextArea.getInput()).toBeInTheDocument();
  expect(lgUtilsTextArea.getInputValue()).toBe('');
});
```

### Test Utils

#### Elements

```tsx
const {
  elements: { getInput, getLabel, getDescription, getErrorMessage },
} = getLGTextAreaTestUtils();
```

| Util              | Description                    | Returns                       |
| ----------------- | ------------------------------ | ----------------------------- |
| `getInput`        | Returns the input node         | `HTMLButtonElement`           |
| `getLabel`        | Returns the label node         | `HTMLButtonElement` \| `null` |
| `getDescription`  | Returns the description node   | `HTMLButtonElement` \| `null` |
| `getErrorMessage` | Returns the error message node | `HTMLButtonElement` \| `null` |

#### Utils

```tsx
const {
  utils: { getInputValue, isDisabled, isValid, isError },
} = getLGTextAreaTestUtils();
```

| Util            | Description                                | Returns   |
| --------------- | ------------------------------------------ | --------- |
| `getInputValue` | Returns the input value                    | `string`  |
| `isDisabled`    | Returns whether the input is disabled      | `boolean` |
| `isValid`       | Returns whether the input state is `valid` | `boolean` |
| `isError`       | Returns whether the input state is `error` | `boolean` |
