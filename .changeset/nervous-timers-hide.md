---
'@leafygreen-ui/select': minor
---

- Exports `getLGSelectTestUtils`, a util to reliably interact with `LG Select` in a product test suite. [LG-4129](https://jira.mongodb.org/browse/LG-4129)

## getLGSelectTestUtils()

`getLGSelectTestUtils()` is a util that allows consumers to reliably interact with `LG Select` in a product test suite. If the `Select` component cannot be found, an error will be thrown.

### Usage

```tsx
import { Select, getLGSelectTestUtils } from '@leafygreen-ui/select';

const { elements, utils } = getLGSelectTestUtils(lgId?: string); // lgId refers to the custom `data-lgid` attribute passed to `TextArea`. It defaults to 'lg-select' if left empty.
```

#### Single `Select`

```tsx
import { render } from '@testing-library/react';
import { Select, getLGSelectTestUtils } from '@leafygreen-ui/select';

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
  
  const { elements, utils,getOptions, clickTrigger } = getLGSelectTestUtils();

  expect(elements.getInput()).toBeInTheDocument();
  expect(utils.getInputValue()).toBe('Select');

  clickTrigger();
  await waitFor(() => {
    // `select` is an option
    expect(getOptions()).toHaveLength(5);
  });
});
```

#### Multiple `Select`'s

When testing multiple `Select`'s it is recommended to add the custom `data-lgid` attribute to each `Select`.

```tsx
import { render } from '@testing-library/react';
import { Select, getLGSelectTestUtils } from '@leafygreen-ui/select';

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
  const { elements: lgElementsSelect1, utils: lgUtilsSelect1 } =
    getLGSelectTestUtils('select-1'); // data-lgid
  const { elements: lgElementsSelect2, utils: lgUtilsSelect2 } =
    getLGSelectTestUtils('select-2'); // data-lgid

  // First Select
  expect(lgElementsSelect1.getInput()).toBeInTheDocument();
  expect(lgUtilsSelect1.getInputValue()).toBe('Select');

  // Second Select
  expect(lgElementsSelect2.getInput()).toBeInTheDocument();
  expect(lgUtilsSelect2.getInputValue()).toBe('sad cat');
});
```

#### Select with other LG elements

```tsx
import { render } from '@testing-library/react';
import TextInput, { getLGTextInputTestUtils } from '@leafygreen-ui/text-input';
import { Select, getLGSelectTestUtils } from '@leafygreen-ui/select';

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

  const { elements: lgElementsTextInput, utils: lgUtilsTextInput } = getLGTextInputTestUtils();
  const { elements: lgElementsSelect, utils: lgUtilsSelect } = getLGSelectTestUtils();


  // LG TextInput
  expect(lgElementsTextInput.getInput()).toBeInTheDocument();
  expect(lgUtilsTextInput.getInputValue()).toBe('');

  // LG Select
  expect(lgElementsSelect.getInput()).toBeInTheDocument();
  expect(lgUtilsTextlgUtilsSelectArea.getInputValue()).toBe('Select');
});
```

### Test Utils

#### Elements

```tsx
const {
  elements: {
    getInput,
    getLabel,
    getDescription,
    getErrorMessage,
    getOptions,
    getOptionByValue,
    getPopover,
  },
} = getLGSelectTestUtils();
```

| Util                       | Description                    | Returns                       |
| -------------------------- | ------------------------------ | ----------------------------- |
| `getInput()`               | Returns the input node         | `HTMLButtonElement`           |
| `getLabel()`               | Returns the label node         | `HTMLButtonElement` \| `null` |
| `getDescription()`         | Returns the description node   | `HTMLButtonElement` \| `null` |
| `getErrorMessage()`        | Returns the error message node | `HTMLButtonElement` \| `null` |
| `getOptions()`             | Returns an array of options    | `Array<HTMLLIElement>`        |
| `getOptionByValue(string)` | Returns an individual option   | `HTMLLIElement` \| `null`     |
| `getPopover()`             | Returns the dropdown popover   | `HTMLDivElement` \| `null`    |

#### Utils

```tsx
const {
  utils: {
    getInputValue,
    isDisabled,
    isValid,
    isError,
    clickOption,
    clickTrigger,
  },
} = getLGSelectTestUtils();
```

| Util                  | Description                                | Returns   |
| --------------------- | ------------------------------------------ | --------- |
| `getInputValue()`     | Returns the input value                    | `string`  |
| `isDisabled()`        | Returns whether the input is disabled      | `boolean` |
| `isError()`           | Returns whether the input state is `error` | `boolean` |
| `clickOption(string)` | Clicks an option                           | `void`    |
| `clickTrigger`        | Clicks the trigger                         | `void`    |
