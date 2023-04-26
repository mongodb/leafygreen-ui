# Combobox

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/combobox.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/combobox/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/combobox
```

### NPM

```shell
npm install @leafygreen-ui/combobox
```

## Example

```js
import { Combobox, ComboboxOption } from '@leafygreen-ui/combobox';

<Combobox
  label="Choose a fruit"
  description="Please pick one"
  placeholder="Select fruit"
>
  <ComboboxOption value="apple" />
  <ComboboxOption value="banana" />
  <ComboboxOption value="carrot" />
  <ComboboxOption value="dragonfruit" />
  <ComboboxGroup label="Peppers">
    <ComboboxOption value="cayenne" />
    <ComboboxOption value="habanero" />
    <ComboboxOption value="jalapeno" displayName="Jalapeño" />
  </ComboboxGroup>
</Combobox>;
```

**Output HTML**

```html
<div>
  <div>
    <label id="combobox-label-1" for="combobox-input-1"> Choose a fruit </label>
    <p>Please pick one</p>
  </div>
  <div>
    <div
      role="combobox"
      aria-expanded="true"
      aria-controls="combobox-menu-1"
      aria-owns="combobox-menu-1"
      tabindex="-1"
      data-disabled="false"
      data-state="none"
    >
      <div>
        <input
          aria-label="Choose a fruit"
          aria-autocomplete="list"
          aria-controls="combobox-menu-1"
          aria-labelledby="combobox-label-1"
          id="combobox-input-1"
          placeholder="Select fruit"
          value=""
        />
      </div>
      <svg aria-label="Caret Down Icon">...</svg>
    </div>
  </div>
</div>
```

## Properties

| Prop                     | Type                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Default                  |
| ------------------------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `children`               | `<ComboboxOption>`, `<ComboboxGroup>`         | Define the Combobox Options by passing children                                                                                                                                                                                                                                                                                                                                                                                                                     |                          |
| `multiselect`            | `boolean`                                     | Defines whether a user can select multiple options, or only a single option. When using TypeScript, `multiselect` affects the valid values of `initialValue`, `value`, and `onChange`                                                                                                                                                                                                                                                                               | `false`                  |
| `initialValue`           | `Array<string>`, `string`                     | The initial selection. Must be a string (or array of strings) that matches the `value` prop of a `ComboboxOption`. Changing the `initialValue` after initial render will not change the selection.                                                                                                                                                                                                                                                                  |                          |
| `value`                  | `Array<string>`, `string`                     | The controlled value of the Combobox. Must be a string (or array of strings) that matches the `value` prop of a `ComboboxOption`. Changing `value` after initial render _will_ affect the selection. `value` will always take precedence over `initialValue` if both are provided.                                                                                                                                                                                  |                          |
| `onChange`               | `(Array<string>) => void`, `(string) => void` | A callback called when the selection changes. Callback recieves a single argument that is the new selection, either string, or string array                                                                                                                                                                                                                                                                                                                         |                          |
| `overflow`               | `'expand-y'`, `'expand-x'`, `'scroll-x'`      | Defines the overflow behavior of a multiselect combobox. **expand-y**: Combobox has fixed width, and additional selections will cause the element to grow in the block direction. **expand-x**: Combobox has fixed height, and additional selections will cause the elemenet to grow in the inline direction. **scroll-x**: Combobox has fixed height and width, and additional selections will cause the element to be scrollable in the x (horizontal) direction. | `'expand-y'`             |
| `label`                  | `string`                                      | An accessible label for the input, rendered in a `<label>` to the DOM                                                                                                                                                                                                                                                                                                                                                                                               |                          |
| `aria-label`             | `string`                                      | An accessible label for the input, used only for screen-readers                                                                                                                                                                                                                                                                                                                                                                                                     |                          |
| `description`            | `string`                                      | A description for the input                                                                                                                                                                                                                                                                                                                                                                                                                                         |                          |
| `placeholder`            | `string`                                      | A placeholder for the input element. Uses the native `placeholder` attribute.                                                                                                                                                                                                                                                                                                                                                                                       | 'Select'                 |
| `disabled`               | `boolean`                                     | Disables all interaction with the component                                                                                                                                                                                                                                                                                                                                                                                                                         | false                    |
| `size`                   | `'default'`                                   | Defines the visual size of the component                                                                                                                                                                                                                                                                                                                                                                                                                            | 'default'                |
| `darkMode`               | `boolean`                                     | Toggles dark mode                                                                                                                                                                                                                                                                                                                                                                                                                                                   | false                    |
| `state`                  | `'error'`, `'none'`                           | The error state of the component. Defines whether the error message is displayed.                                                                                                                                                                                                                                                                                                                                                                                   | 'none'                   |
| `errorMessage`           | `string`                                      | The message shown below the input when `state` is `error`                                                                                                                                                                                                                                                                                                                                                                                                           |                          |
| `onFilter`               | `(value: string) => void`                     | A callback called when the search input changes. Recieves a single argument that is the current input value. Use this callback to set `searchState` and/or `filteredOptions` appropriately                                                                                                                                                                                                                                                                          |                          |
| `searchState`            | `'unset'`, `'error'`, `'loading'`             | The state of search results. Toggles search messages within the menu.                                                                                                                                                                                                                                                                                                                                                                                               | 'unset'                  |
| `searchErrorMessage`     | `string`                                      | A message shown within the menu when `searchState` is `error`                                                                                                                                                                                                                                                                                                                                                                                                       | 'Could not get results!' |
| `searchLoadingMessage`   | `string`                                      | A message shown within the menu when `searchState` is `loading`                                                                                                                                                                                                                                                                                                                                                                                                     | 'Loading results...'     |
| `searchEmptyMessage`     | `string`                                      | A message shown within the menu when there are no options passed in as children, or `filteredOptions` is an empty array                                                                                                                                                                                                                                                                                                                                             | 'No results found'       |
| `clearable`              | `boolean`                                     | Defines whether the Clear button appears to the right of the input                                                                                                                                                                                                                                                                                                                                                                                                  |                          |
| `onClear`                | `(e: MouseEvent) => void`                     | A callback fired when the Clear button is pressed. Fired _after_ `onChange`, and _before_ `onFilter`                                                                                                                                                                                                                                                                                                                                                                |                          |
| `filteredOptions`        | `Array<string>`, `null`                       | An array used to define which options are displayed. Do not remove Options from the JSX children, as this will affect the selected options                                                                                                                                                                                                                                                                                                                          |                          |
| `chipTruncationLocation` | `'start'`, `'middle'`, `'end'`, `'none'`      | Defines where the ellipses appear in a Chip when the length exceeds the `chipCharacterLimit`                                                                                                                                                                                                                                                                                                                                                                        | 'none'                   |
| `chipCharacterLimit`     | `number`                                      | Defined the character limit of a multiselect Chip before they start truncating. Note: the three ellipses dots are included in the character limit.                                                                                                                                                                                                                                                                                                                  | 12                       |
| `className`              | `string`                                      | The className passed to the root element of the component.                                                                                                                                                                                                                                                                                                                                                                                                          |                          |
| `usePortal`              | `boolean`                                     | Will position Popover's children relative to its parent without using a Portal, if `usePortal` is set to false. NOTE: The parent element should be CSS position `relative`, `fixed`, or `absolute` if using this option.                                                                                                                                                                                                                                            | `true`                   |
| `portalContainer`        | `HTMLElement` \| `null`                       | Sets the container used for the popover's portal.                                                                                                                                                                                                                                                                                                                                                                                                                   |                          |
| `scrollContainer`        | `HTMLElement` \| `null`                       | If the popover portal has a scrollable ancestor other than the window, this prop allows passing a reference to that element to allow the portal to position properly.                                                                                                                                                                                                                                                                                               |                          |
| `portalClassName`        | `string`                                      | Passes the given className to the popover's portal container if the default portal container is being used.                                                                                                                                                                                                                                                                                                                                                         |                          |
| `popoverZIndex`          | `number`                                      | Sets the z-index CSS property for the popover.                                                                                                                                                                                                                                                                                                                                                                                                                      |                          |

# ComboboxOption

## Props

| Prop          | Type                                                                         | Description                                                                                                                                                                   | Default |
| ------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `value`       | `string`                                                                     | The internal value of the option. Used as the identifier in Combobox `initialValue`, `value` and `filteredOptions`. When undefined, this is set to `_.kebabCase(displayName)` |         |
| `displayName` | `string`                                                                     | The display value of the option. Used as the rendered string within the menu and chips. When undefined, this is set to `value`                                                |         |
| `glyph`       | `<Icon/>`                                                                    | The icon to display to the left of the option in the menu.                                                                                                                    |         |
| `className`   | `string`                                                                     | The className passed to the root element of the component.                                                                                                                    |         |
| `description` | `string`                                                                     | Optional descriptive text under the displayName.                                                                                                                              |         |
| `onClick`     | `(event: React.SyntheticEvent<HTMLLIElement, Event>, value: string) => void` | Callback fired when an option is clicked. Returns the event and the option value.                                                                                             |         |

# ComboboxGroup

## Props

| Prop        | Type               | Description                                                | Default |
| ----------- | ------------------ | ---------------------------------------------------------- | ------- |
| `label`     | `string`           | Label for the group of options                             |         |
| `children`  | `<ComboboxOption>` | Options in the group                                       |         |
| `className` | `string`           | The className passed to the root element of the component. |         |
