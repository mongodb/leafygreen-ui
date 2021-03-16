# Radio Box Group

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/radio-box-group.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/radio-box-group/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/radio-box-group
```

### NPM

```shell
npm install @leafygreen-ui/radio-box-group
```

## Peer Dependencies

| Package                              | Version  |
| ------------------------------------ | -------- |
| `@leafygreen-ui/leafygreen-provider` | `^1.1.0` |

## Example

```js
import { RadioBox, RadioBoxGroup } from '@leafygreen-ui/radio-box-group';

<RadioBoxGroup className="radio-box-group-style">
  <RadioBox value="option-1">Radio Box 1</RadioBox>
  <RadioBox value="option-2">Radio Box 2</RadioBox>
</RadioBoxGroup>;
```

## Output HTML

```html
<div
  class="leafygreen-ui-k008qs radio-box-group-style"
  role="group"
  aria-label="radio-box-group-850132"
>
  <label for="radio-box-group-850132-button-0" class="leafygreen-ui-i6e9um">
    <input
      type="radio"
      id="radio-box-group-850132-button-0"
      name="radio-box-group-850132"
      aria-checked="false"
      aria-disabled="false"
      class="leafygreen-ui-10udnlm"
      value="option-1"
    />
    <div class="leafygreen-ui-1rd79mb"></div>
    <div class="leafygreen-ui-1m9u12l leafygreen-ui-tv1yok">Radio Box 1</div>
  </label>
  <label for="radio-box-group-850132-button-1" class="leafygreen-ui-i6e9um">
    <input
      type="radio"
      id="radio-box-group-850132-button-1"
      name="radio-box-group-850132"
      aria-checked="false"
      aria-disabled="false"
      class="leafygreen-ui-10udnlm"
      value="option-2"
    />
    <div class="leafygreen-ui-1rd79mb"></div>
    <div class="leafygreen-ui-1m9u12l leafygreen-ui-tv1yok">Radio Box 2</div>
  </label>
</div>
```

## Properties

| Prop        | Type                               | Description                                                                                                      | Default     |
| ----------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------- |
| `size`      | `'compact'`, `'default'`, `'full'` | Sets the style of the `<RadioBoxGroup />`.                                                                       | `'default'` |
| `name`      | `string`                           | Sets the name of the input group.                                                                                |             |
| `value`     | `string`, `number`                 | Sets the `<Radio />` that will appear checked on page load, also makes the component a controlled component      |             |
| `className` | `string`                           | Adds a className to the root element                                                                             |             |
| `children`  | `node`                             | Content of the component                                                                                         |             |
| `onChange`  | `function`                         | The event handler function for the 'onChange' event. Receives the associated event object as the first argument. | `() => {}`  |
| ...         | native `div` attributes            | Any other props will be spread on the root `div` element                                                         |             |

# Radio Box

## Example

```js
<RadioBox value="option-2">Radio Box 2</RadioBox>
```

## Output HTML

```html
<label for="radio-box-group-746930-button-1" class="leafygreen-ui-i6e9um">
  <input
    type="radio"
    id="radio-box-group-746930-button-1"
    name="radio-box-group-746930"
    aria-checked="false"
    aria-disabled="false"
    class="leafygreen-ui-10udnlm"
    value="option-2"
  />
  <div class="leafygreen-ui-1rd79mb"></div>
  <div class="leafygreen-ui-1m9u12l leafygreen-ui-tv1yok">Radio Box 2</div>
</label>
```

## Properties

| Prop               | Type                      | Description                                                                                                     | Default |
| ------------------ | ------------------------- | --------------------------------------------------------------------------------------------------------------- | ------- |
| `value` (Required) | `string`, `number`        | Every `<RadioBox />` needs a value prop                                                                         |         |
| `className`        | `string`                  | Adds a className to the root element                                                                            | `''`    |
| `checked`          | `boolean`                 | Indicates whether or not the box will be checked                                                                | `false` |
| `disabled`         | `boolean`                 | Indicates whether or not the radio can be clicked by a user                                                     | `false` |
| `children`         | `node`                    | Content that appears inside of the `<RadioBox />`                                                               |         |
| `default`          | `boolean`                 | If `<RadioBoxGroup />` is uncontrolled, the default property makes this RadioBox checked on the initial render. |         |
| ...                | native `input` attributes | Any other props will be spread on the root `input` element                                                      |         |
