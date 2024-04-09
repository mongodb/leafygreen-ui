# Checkbox

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/checkbox.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/checkbox/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/checkbox
```

### NPM

```shell
npm install @leafygreen-ui/checkbox
```

## Example

```js
import Checkbox from '@leafygreen-ui/checkbox';

<Checkbox
  className="my-checkbox"
  onChange={event => {
    /* Something to handle the click event */
  }}
  label="This is how you enable a thing"
  checked={true}
  bold={false}
/>;
```

**Output HTML**

```html
<label
  class="css-1rgbgdt my-checkbox"
  title="Create an item"
  for="checkbox-14827892"
>
  <input
    checked
    type="checkbox"
    role="checkbox"
    class="css-32kjhsdaf"
    id="checkbox-14827892"
    name="checkbox-14827892"
    aria-disabled="false"
    aria-checked="true"
    aria-labeledby="checkbox-14827892-label"
  />

  <div class="css-34kjkdfg">
    <div class="css-98sdfjsad"></div>
  </div>

  <span class="css-8xdsjfh9" id="checkbox-14827892-label">
    This is how you enable a thing
  </span>
</label>
```

## Properties

| Prop              | Type                      | Description                                                                                                                                                                                                                  | Default                   |
| ----------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `darkMode`        | `boolean`                 | Determines whether or not the Checkbox will appear in dark mode.                                                                                                                                                             | `false`                   |
| `checked`         | `boolean`                 | Checks the checkbox                                                                                                                                                                                                          | `false`                   |
| `label`           | `node`                    | The label for the checkbox.                                                                                                                                                                                                  | `''`                      |
| `description`     | `string`                  | A description for the checkbox.                                                                                                                                                                                              | `''`                      |
| `disabled`        | `boolean`                 | Disables the checkbox.                                                                                                                                                                                                       | `false`                   |
| `indeterminate`   | `boolean`                 | Sets the checkbox as indeterminate. **NOTE:** the checkbox will become out of sync with the indeterminate prop when it's clicked. Make sure to unset the `indeterminate` prop on change where you're controlling your input. | `false`                   |
| `className`       | `string`                  | Adds a className to the outermost element.                                                                                                                                                                                   | `''`                      |
| `animate`         | `boolean`                 | Determines whether the checkbox will be animated when checked or unchecked. Note the "ripple" animation will only run when `Checkbox` is rendered within `LeafygreenProvider`, and only on click.                            | `true`                    |
| `id`              | `string` or `number`      | Adds an ID only to the input, and it's used elsewhere for accessibility props.                                                                                                                                               | randomly generated string |
| `onChange`        | `function`                | The event handler function for the `onChange` event. Receives the associated `event` object as the first argument.                                                                                                           | `() => {}`                |
| `bold`            | `boolean`                 | Determines whether the text will be bold or not. (Currently disregarded in the new design)                                                                                                                                   | `false`                   |
| `aria-labelledby` | `string`                  | A value for `aria-labelledby`. Allows use of the component with an external `<label>` element                                                                                                                                |                           |
| `aria-label`      | `string`                  | A value for `aria-label`. Allows use of the component without a `label`                                                                                                                                                      |                           |
| ...               | native `input` attributes | Any other props will be spread on the root `input` element                                                                                                                                                                   |                           |

_Any other properties will be spread on the `input` element._

# Test Harnesses

## getTestUtils()

`getTestUtils()` is a util that allows consumers to reliably interact with `LG Checkbox` in a product test suite. If the `Checkbox` component cannot be found, an error will be thrown.

### Usage

```tsx
import Checkbox, { getTestUtils } from '@leafygreen-ui/checkbox';

const utils = getTestUtils(lgId?: string); // lgId refers to the custom `data-lgid` attribute passed to `Checkbox`. It defaults to 'lg-checkbox' if left empty.
```

#### Single `Checkbox`

```tsx
import { render } from '@testing-library/react';
import Checkbox, { getTestUtils } from '@leafygreen-ui/checkbox';

...

test('checkbox', () => {
  render(<Checkbox label="label" checked />);
  const { getInput, getInputValue } = getTestUtils();

  expect(getInput()).toBeInTheDocument();
  expect(getInputValue()).toBe(true);
});
```

#### Multiple `Checkbox` components

When testing multiple `Checkbox` components it is recommended to add the custom `data-lgid` attribute to each `Checkbox`.

```tsx
import { render } from '@testing-library/react';
import Checkbox, { getTestUtils } from '@leafygreen-ui/checkbox';

...

test('checkbox', () => {
  render(
    <>
      <Checkbox data-lgid="checkbox-1" label="label 1" />
      <Checkbox data-lgid="checkbox-2" label="label 2" checked />
    </>,
  );
  const utilsOne = getTestUtils('checkbox-1'); // data-lgid
  const utilsTwo = getTestUtils('checkbox-2'); // data-lgid
  // First Checkbox
  expect(utilsOne.checkboxetInput()).toBeInTheDocument();
  expect(utilsOne.getInputValue()).toBe(false);

  // Second Checkbox
  expect(utilsTwo.getInput()).toBeInTheDocument();
  expect(utilsTwo.getInputValue()).toBe(true);
});
```

#### Checkbox with other LG form elements

```tsx
import { render } from '@testing-library/react';
import Toggle, { getTestUtils as getLGToggleTestUtils } from '@leafygreen-ui/toggle';
import TextInput, { getTestUtils as getLGTextInputTestUtils } from '@leafygreen-ui/text-input';
import Checkbox, { getTestUtils } from '@leafygreen-ui/checkbox';

...

test('Form', () => {
  render(
    <Form>
      <Toggle aria-label="Toggle label" />
      <TextInput label="TextInput label" />
      <Checkbox label="Checkbox label" />
    </Form>,
  );

  const toggleInputUtils = getLGToggleTestUtils();
  const textInputUtils = getLGTextInputTestUtils();
  const checkboxUtils = getTestUtils();

  // LG Toggle
  expect(toggleInputUtils.getInput()).toBeInTheDocument();
  expect(toggleInputUtils.getInputValue()).toBe('false');

  // LG TextInput
  expect(textInputUtils.getInput()).toBeInTheDocument();
  expect(textInputUtils.getInputValue()).toBe('');

  // LG Checkbox
  expect(checkboxUtils.getInput()).toBeInTheDocument();
  expect(checkboxUtils.getInputValue()).toBe(false);
});
```

### Test Utils

#### Elements

```tsx
const {
  getInput,
  getLabel,
  getDescription,
  getInputValue,
  isDisabled,
  isIndeterminate,
} = getTestUtils();
```

| Util              | Description                                | Returns                       |
| ----------------- | ------------------------------------------ | ----------------------------- |
| `getInput`        | Returns the input node                     | `HTMLButtonElement`           |
| `getLabel`        | Returns the label node                     | `HTMLButtonElement` \| `null` |
| `getDescription`  | Returns the description node               | `HTMLButtonElement` \| `null` |
| `getInputValue`   | Returns the input value                    | `boolean`                     |
| `isDisabled`      | Returns whether the input is disabled      | `boolean`                     |
| `isIndeterminate` | Returns whether the input is indeterminate | `boolean`                     |
