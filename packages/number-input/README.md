# Number Input

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/number-input.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/number-input/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/number-input
```

### NPM

```shell
npm install @leafygreen-ui/number-input
```

## Example

```js
import { NumberInput } from '@leafygreen-ui/number-input';

// no unit
<NumberInput label={label} onChange={() => {}} />

or

// single unit
<NumberInput label={label} onChange={() => {}} unit={unitProps.unit} />

or

// select unit
<NumberInput
  label={label}
  onChange={() => {}}
  unit={unitProps.unit}
  unitOptions={selectProps.unitOptions}
  onSelectChange={() => {}}
/>
```

## Properties

| Prop                                                                                                           | Type                                                   | Description                                                                                                                                                                                                                                      | Default   |
| -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| -------------------------------------------------------------------------------------------------------------- | ---------                                              |
| `id`                                                                                                           | `string`                                               | id associated with the number input.                                                                                                                                                                                                             |           |
| `label`                                                                                                        | `string`                                               | Label shown above the number input.                                                                                                                                                                                                              |           |
| `description`                                                                                                  | `string`                                               | Text shown above the number input but below the label; gives more details about the requirements for the input.                                                                                                                                  |           |
| `value`                                                                                                        | `string`                                               | The controlled value of the number input.                                                                                                                                                                                                        |           |
| `disabled`                                                                                                     | `boolean`                                              | Disables the component.                                                                                                                                                                                                                          | `false`   |
| `placeholder`                                                                                                  | `string`                                               | The placeholder text shown in the input field before the user begins typing.                                                                                                                                                                     |           |
| `size`                                                                                                         | `'xsmall'` \| `'small'` \| `'default'`                 | Determines the size of the input.                                                                                                                                                                                                                | `default` |
| `state`                                                                                                        | `'none'`\| `'error'`                                   | Describes the state of the TextInput element before and after the input has been validated                                                                                                                                                       | `'none'`  |
| `errorMessage`                                                                                                 | `string`                                               | Error message that appears below the input. Renders only if `state='error'`.                                                                                                                                                                     | `'none'`  |
| `unit`                                                                                                         | `string`                                               | The string unit that appears to the right of the input if using a single unit. </br> </br>Required if using `unitOptions`. When using `unitOptions` this value becomes the controlled value of the select input.                                 | `default` |
| `unitOptions`                                                                                                  | `Array<{displayName: string; value: string}>`          | The options that appear in the select element attached to the right of the input.                                                                                                                                                                | `default` |
| `onChange`                                                                                                     | `(e: React.ChangeEvent<HTMLInputElement>) => void`     | The event handler function for the 'onchange' event. Accepts the change event object as its argument and returns nothing.                                                                                                                        |
| `onBlur`                                                                                                       | `(e: React.ChangeEvent<HTMLInputElement>) => void`     | The event handler function for the 'onblur' event. Accepts the focus event object as its argument and returns nothing.                                                                                                                           |           |
| `onSelectChange`                                                                                               | `(unit: {displayName: string; value: string}) => void` | A change handler triggered when the unit is changed.                                                                                                                                                                                             |
| `className`                                                                                                    | `string`                                               | ClassName for the component.                                                                                                                                                                                                                     |           |
| `inputClassName`                                                                                               | `string`                                               | ClassName for the input component.                                                                                                                                                                                                               |           |
| `selectClassName`                                                                                              | `string`                                               | ClassName for the select component.                                                                                                                                                                                                              |           |
| `portalContainer`                                                                                              | `HTMLElement` \| `null`                                | Sets the container used for the popover's portal. NOTE: If using a `scrollContainer` make sure that the `portalContainer` is contained within the `scrollContainer`. E.g, passing the same reference to `scrollContainer` and `portalContainer`. |           |
| `scrollContainer`                                                                                              | `HTMLElement` \| `null`                                | If the popover portal has a scrollable ancestor other than the window, this prop allows passing a reference to that element to allow the portal to position properly.                                                                            |           |
| `portalClassName`                                                                                              | `string`                                               | Passes the given className to the popover's portal container if the default portal container is being used.                                                                                                                                      |           |
| `popoverZIndex`                                                                                                | `number`                                               | Sets the z-index CSS property for the popover.                                                                                                                                                                                                   |           |
| ...                                                                                                            | native `input` attributes                              | Any other props will be spread on the root `input` element                                                                                                                                                                                       |           |

##
