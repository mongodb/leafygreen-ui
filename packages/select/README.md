# Select

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/select.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/select/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/select
```

### NPM

```shell
npm install @leafygreen-ui/select
```

## Example

```js
import { Option, OptionGroup, Select, Size } from '@leafygreen-ui/select';

<Select
  label="Label"
  description="Description"
  placeholder="Placeholder"
  name="Name"
  size={Size.Default}
  defaultValue="cat"
>
  <Option value="dog" description="Bark">
    Dog
  </Option>
  <Option value="cat">Cat</Option>
  <OptionGroup label="Less common">
    <Option value="hamster">Hamster</Option>
    <Option value="parrot">Parrot</Option>
  </OptionGroup>
</Select>;
```

## Select Properties

| Prop                 | Type                                          | Description                                                                                                                                                                                                                                     | Default     |
| -------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `children`           | `node`                                        | `<Option />` and `<OptionGroup />` elements.                                                                                                                                                                                                    |             |
| `className`          | `string`                                      | Adds a className to the outermost element.                                                                                                                                                                                                      |             |
| `darkMode`           | `boolean`                                     | Determines whether or not the component will appear in dark mode.                                                                                                                                                                               | `false`     |
| `size`               | `'xsmall'`, `'small'`, `'default'`, `'large'` | Sets the size of the component's elements.                                                                                                                                                                                                      | `'default'` |
| `id`                 | `string`                                      | id associated with the Select component.                                                                                                                                                                                                        |             |
| `name`               | `string`                                      | The name that will be used when submitted as part of a form.                                                                                                                                                                                    |             |
| `label`              | `string`                                      | Text shown in bold above the input element.                                                                                                                                                                                                     |             |
| `aria-labelledby`    | `string`                                      | Must be provided if and only if neither `label` nor `aria-label` is not provided.                                                                                                                                                               |
| `aria-label`         | `string`                                      | Must be provided if and only if neither `label` nor `aria-labelledby` is not provided.                                                                                                                                                          |             |
| `description`        | `React.ReactNode`                             | Text that gives more detail about the requirements for the input.                                                                                                                                                                               |             |
| `placeholder`        | `string`                                      | The placeholder text shown in the input element when an option is not selected.                                                                                                                                                                 | `'Select'`  |
| `disabled`           | `boolean`                                     | Disables the component from being edited.                                                                                                                                                                                                       | `false`     |
| `value`              | `string`                                      | Sets the `<Option />` that will appear selected and makes the component a controlled component.                                                                                                                                                 | `''`        |
| `defaultValue`       | `string`                                      | Sets the `<Option />` that will appear selected on page load when the component is uncontrolled.                                                                                                                                                | `''`        |
| `onChange`           | `function`                                    | A function that gets called when the selected value changes. Receives the value string as the first argument.                                                                                                                                   | `() => {}`  |
| `readOnly`           | `boolean`                                     | Disables the console warning when the component is controlled and no `onChange` prop is provided.                                                                                                                                               | `false`     |
| `allowDeselect`      | `boolean`                                     | Enables or disables the option for a user to select a null default value.                                                                                                                                                                       | `true`      |
| `usePortal`          | `boolean`                                     | Determines if Select dropdown will be rendered inside a portal.                                                                                                                                                                                 | `true`      |
| `portalContainer`    | `HTMLElement` \| `null`                       | Sets the container used for the popover's portal. NOTE: If using a `scrollContainer` make sure that the `portalContainer` is contained within the `scrollContainer`. E.g, passing the same refrence to `scrollContainer` and `portalContainer`. |             |
| `scrollContainer`    | `HTMLElement` \| `null`                       | If the popover portal has a scrollable ancestor other than the window, this prop allows passing a reference to that lement to allow the portal to position properly.                                                                            |             |
| `portalClassName`    | `string`                                      | Passes the given className to the popover's portal container if the default portal container is being used.                                                                                                                                     |             |
| `popoverZIndex`      | `number`                                      | Sets the z-index CSS property for the popover.                                                                                                                                                                                                  |             |
| `state`              | `'none'`, `'error'`                           | Determines the state of the `<select>`                                                                                                                                                                                                          | `'none'`    |
| `errorMessage`       | `string`                                      | Text that shows when the `state` is set to `error`.                                                                                                                                                                                             |             |
| `baseFontSize`       | `'13'`, `'16'`                                | Determines the base font size if sizeVariant is set to `default`                                                                                                                                                                                | `'13'`      |
| `dropdownWidthBasis` | `'option'` \| `'trigger'`                     | Determines the width of the dropdown. `trigger` will make the dropdown width the width of the menu trigger. `option` will make the dropdown width as wide as the widest option.                                                                 | `trigger`   |

# Option

| Prop          | Type                 | Description                                                                                           | Default                     |
| ------------- | -------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------- |
| `children`    | `string`, `number`   | Content to appear inside of the component.                                                            |                             |
| `className`   | `string`             | Adds a className to the outermost element.                                                            |                             |
| `glyph`       | `React.ReactElement` | Icon to display next to the option text.                                                              |                             |
| `value`       | `string`             | Corresponds to the value passed into the `onChange` prop of `<Select />` when the option is selected. | text contents of `children` |
| `description` | `string`             | Optional descriptive text under the value                                                             |                             |
| `disabled`    | `boolean`            | Prevents the option from being selectable.                                                            | `false`                     |

# OptionGroup

| Prop        | Type      | Description                                               | Default |
| ----------- | --------- | --------------------------------------------------------- | ------- |
| `children`  | `node`    | `<Option />` elements                                     |         |
| `className` | `string`  | Adds a className to the outermost element.                |         |
| `label`     | `string`  | Text shown above the group's options.                     |         |
| `disabled`  | `boolean` | Prevents all the contained options from being selectable. | `false` |

# Test Harnesses

## getTestUtils()

`getTestUtils()` is a util that allows consumers to reliably interact with `LG Select` in a product test suite. If the `Select` component cannot be found, an error will be thrown.

### Usage

```tsx
import { Select, getTestUtils } from '@leafygreen-ui/select';

const utils = getTestUtils(lgId?: string); // lgId refers to the custom `data-lgid` attribute passed to `Select`. It defaults to 'lg-select' if left empty.
```

#### Single `Select`

```tsx
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, getTestUtils } from '@leafygreen-ui/select';

...

test('select', () => {
  render(
    <Select
      label="Label"
      description="Description"
    >
      <Option value="dog" description="Bark">
        Dog
      </Option>
      <Option value="cat">Cat</Option>
      <OptionGroup label="Less common">
        <Option value="hamster">Hamster</Option>
        <Option value="parrot">Parrot</Option>
      </OptionGroup>
    </Select>
  );

  const { getInputValue, getInput, getOptions } = getTestUtils();

  expect(getInput()).toBeInTheDocument();
  expect(getInputValue()).toBe('Select');

  // opens the select
  userEvent.click(getInput());
  // `select` is an option
  expect(getOptions()).toHaveLength(5);
});
```

#### Multiple `Select`'s

When testing multiple `Select`'s it is recommended to add the custom `data-lgid` attribute to each `Select`.

```tsx
import { render } from '@testing-library/react';
import { Select, getTestUtils } from '@leafygreen-ui/select';

...

test('select', () => {
  render(
    <>
      <Select
        label="Label 1"
        description="Description 1"
        data-lgid="select-1"
      >
        <Option value="dog" description="Bark">
          Dog
        </Option>
        <Option value="cat">Cat</Option>
        <OptionGroup label="Less common">
          <Option value="hamster">Hamster</Option>
          <Option value="parrot">Parrot</Option>
        </OptionGroup>
      </Select>
      <Select
        label="Label 2"
        description="Description 2"
        data-lgid="select-2"
        defaultValue="sad cat"
      >
        <Option value="sad dog" description="Sad Bark Bark">
          Sad Dog
        </Option>
        <Option value="sad cat">Sad Cat</Option>
        <OptionGroup label="Less common">
          <Option value="sad hamster">Sad Hamster</Option>
          <Option value="sad parrot">Sad Parrot</Option>
        </OptionGroup>
      </Select>
    </>,
  );
  const lgUtilsSelect1 = getTestUtils('select-1'); // data-lgid
  const lgUtilsSelect2 = getTestUtils('select-2'); // data-lgid

  // First Select
  expect(lgUtilsSelect1.getInput()).toBeInTheDocument();
  expect(lgUtilsSelect1.getInputValue()).toBe('Select');

  // Second Select
  expect(lgUtilsSelect2.getInput()).toBeInTheDocument();
  expect(lgUtilsSelect2.getInputValue()).toBe('sad cat');
});
```

#### Select with other LG elements

```tsx
import { render } from '@testing-library/react';
import TextInput, { getTestUtils as getTextInputTestUtils } from '@leafygreen-ui/text-input';
import { Select, getTestUtils as getSelectTestUtils } from '@leafygreen-ui/select';

...

test('Form', () => {
  render(
    <Form>
      <TextInput label="TextInput label" />
      <Select
        label="Label 1"
        description="Description 1"
      >
        <Option value="dog" description="Bark">
          Dog
        </Option>
        <Option value="cat">Cat</Option>
        <OptionGroup label="Less common">
          <Option value="hamster">Hamster</Option>
          <Option value="parrot">Parrot</Option>
        </OptionGroup>
      </Select>
    </Form>,
  );

  const lgUtilsTextInput = getTextInputTestUtils();
  const lgUtilsSelect = getSelectTestUtils();

  // LG TextInput
  expect(lgUtilsTextInput.getInput()).toBeInTheDocument();
  expect(lgUtilsTextInput.getInputValue()).toBe('');

  // LG Select
  expect(lgUtilsSelect.getInput()).toBeInTheDocument();
  expect(lgUtilsSelect.getInputValue()).toBe('Select');
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
  getOptions,
  getOptionByValue,
  getPopover,
  getInputValue,
  isDisabled,
  isValid,
  isError,
} = getTestUtils();
```

| Util                       | Description                                | Returns                       |
| -------------------------- | ------------------------------------------ | ----------------------------- |
| `getInput()`               | Returns the input node                     | `HTMLButtonElement`           |
| `getLabel()`               | Returns the label node                     | `HTMLButtonElement` \| `null` |
| `getDescription()`         | Returns the description node               | `HTMLButtonElement` \| `null` |
| `getErrorMessage()`        | Returns the error message node             | `HTMLButtonElement` \| `null` |
| `getOptions()`             | Returns an array of options                | `Array<HTMLLIElement>`        |
| `getOptionByValue(string)` | Returns an individual option               | `HTMLLIElement` \| `null`     |
| `getPopover()`             | Returns the dropdown popover               | `HTMLDivElement` \| `null`    |
| `getInputValue()`          | Returns the input value                    | `string`                      |
| `isDisabled()`             | Returns whether the input is disabled      | `boolean`                     |
| `isError()`                | Returns whether the input state is `error` | `boolean`                     |
