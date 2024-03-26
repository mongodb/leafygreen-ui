# Toggle

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/toggle.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/toggle/example/)

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

return (
  <>
    <label id="label" htmlFor="toggle">
      Change setting
    </label>

    <Toggle
      id="toggle"
      aria-labelledby="label"
      onChange={(checked, event) => {
        /* Handle the change event */
      }}
    />
  </>
);
```

## Properties

| Prop        | Type                               | Description                                                                                                                                                                                        | Default     |
| ----------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `darkMode`  | `boolean`                          | Determines if the Toggle will render the dark mode styles.                                                                                                                                         | `false`     |
| `size`      | `'default'`, `'small'`, `'xsmall'` | Sets the size of the toggle.                                                                                                                                                                       | `'default'` |
| `checked`   | `boolean`                          | Set's the checked state of the Toggle.                                                                                                                                                             |             |
| `disabled`  | `boolean`                          | Disables the Toggle.                                                                                                                                                                               | `false`     |
| `onChange`  | `(checked, MouseEvent) => void`    | `onChange` fires when the `checked` state of the component is being updated. Receives the updated checked state of the toggle as its first argument, and the associated mouse event as the second. |             |
| `className` | `string`                           | Adds a className to the outermost element.                                                                                                                                                         | `''`        |
| ...         | HTML `button` attributes           | Any supported HTML button properties will be applied to the `button` element.                                                                                                                      |             |

## Accessibility

For the Toggle to be accessible to screen readers, you **must** pass either [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute) or [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute) to Toggle. Please note, if this is a part of a form, this is in addition to using `htmlFor` to associate a label with the Toggle. You will see TypeScript and console errors if this isn't done.

Please reach out if you would like further guidance on how to programmatically associate text with the Toggle component.

# Test Harnessess

## getLGToggleTestUtils()

`getLGToggleTestUtils()` is a a util that allows consumers to reliably interact with `LG Toggle` in a product test suite. If the `Toggle` component cannot be found, an errror will be thrown.

### Usage

```tsx
import Toggle, { getLGToggleTestUtils } from '@leafygreen-ui/toggle';

const { elements, utils } = getLGToggleTestUtils(lgId?: string); // lgId refers to the custom `data-lgid` attribute passed to `Toggle`. It defaults to 'lg-toggle' if left empty.
```

#### Single `Toggle`

```tsx
import { render } from '@testing-library/react';
import Toggle, { getLGToggleTestUtils } from '@leafygreen-ui/toggle';

...

test('toggle', () => {
  render(<Toggle aria-label="label" />);
  const { elements, utils } = getLGToggleTestUtils();

  expect(elements.getInput()).toBeInTheDocument();
  expect(utils.getInputValue()).toBe('false');
});
```

#### Multiple `Toggle`'s

When testing multiple `Toggle`'s it is recommended to add the custom `data-lgid` attribute to each `Toggle`.

```tsx
import { render } from '@testing-library/react';
import Toggle, { getLGToggleTestUtils } from '@leafygreen-ui/toggle';

...

test('toggle', () => {
  render(
    <>
      <Toggle data-lgid="toggle-1" aria-label="label 1" />
      <Toggle data-lgid="toggle-2" aria-label="label 2" checked />
    </>,
  );
  const { elements: lgElementsToggle1, utils: lgUtilsToggle1 } =
    getLGToggleTestUtils('toggle-1'); // data-lgid
  const { elements: lgElementsToggle2, utils: lgUtilsToggle2 } =
    getLGToggleTestUtils('toggle-2'); // data-lgid

  // First toggle
  expect(lgElementsToggle1.getInput()).toBeInTheDocument();
  expect(lgUtilsToggle1.getInputValue()).toBe('false');

  // Second Toggle
  expect(lgElementsToggle2.getInput()).toBeInTheDocument();
  expect(lgUtilsToggle2.getInputValue()).toBe('true');
});
```

#### Toggle with other LG form elements

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
  const { elements: lgElementsToggle, utils: lgUtilsToggle } = getLGToggleTestUtils();
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
  elements: { getInput },
} = getLGToggleTestUtils();
```

| Util       | Description            | Returns             |
| ---------- | ---------------------- | ------------------- |
| `getInput` | Returns the input node | `HTMLButtonElement` |

#### Utils

```tsx
const {
  utils: { isDisabled, getInputValue },
} = getLGToggleTestUtils();
```

| Util            | Description                           | Returns              |
| --------------- | ------------------------------------- | -------------------- |
| `isDisabled`    | Returns whether the input is disabled | `boolean`            |
| `getInputValue` | Returns the input value               | `'true'`\| `'false'` |
