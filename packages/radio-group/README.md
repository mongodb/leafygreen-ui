# Radio Group

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/radio-group.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/radio-group/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/radio-group
```

### NPM

```shell
npm install @leafygreen-ui/radio-group
```

## Example

```js
import { Radio, RadioGroup } from '@leafygreen-ui/radio-group';

<RadioGroup
  className="my-radio-group"
  variant="default"
  onChange={event => console.log('hi')}
  value="option-1"
  name="name-of-input-group"
>
  <Radio className="my-radio" value="option-1">
    Label Text Goes Here
  </Radio>
</RadioGroup>;
```

## Output HTML

```html
<div
  class="leafygreen-ui-16glayc my-radio-group"
  role="group"
  aria-label="radio-group-660118"
>
  <label
    for="radio-group-660118-button-0"
    class="leafygreen-ui-11wfvmq my-radio"
  >
    <input
      id="radio-group-660118-button-0"
      name="name-of-input-group"
      type="radio"
      class="leafygreen-ui-i6tne my-radio"
      aria-checked="true"
      aria-disabled="false"
      value="option-1"
    />
    <span class="leafygreen-ui-1l7rt9l">Label Text Goes Here</span>
  </label>
</div>
```

## Properties

| Prop        | Type                               | Description                                                                                                                                                                          | Default    |
| ----------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `darkMode`  | `boolean`                          | Determines whether or not the component appears in dark mode                                                                                                                         | `false`    |
| `name`      | `string`                           | Sets the name of the input group                                                                                                                                                     |            |
| `value`     | `string`, `number`                 | Sets the radio that will appear checked on page load, also makes the component a controlled component                                                                                |            |
| `className` | `string`                           | Adds a className to the root element.                                                                                                                                                | `''`       |
| `onChange`  | `function`                         | The event handler function for the 'onchange' event. Receives the associated `event` object as the first argument.                                                                   | `() => {}` |
| `children`  | `node`                             | Can be any node; however, any `<Radio />` components, will be treated as belonging to the `<RadioGroup />` compound component, and will receive internal state from `<RadioGroup />` |            |
| `size`      | `'xsmall'`, `'small'`, `'default'` | Sets the size for the Radios. Use of `xsmall` should be limited to only Charts                                                                                                       | `default`  |

_Any other properties will be spread on the root element._

# Radio

## Example

```js
<Radio className="my-radio" value="option-1" disabled={true}>
  Label Text Goes Here
</Radio>
```

## Output HTML

```html
<label class="leafygreen-ui-11wfvmq my-radio">
  <input
    type="radio"
    class="leafygreen-ui-i6tne"
    aria-checked="false"
    disabled="true"
    aria-disabled="true"
    value="option-1"
  />
  <span class="leafygreen-ui-1l7rt9l">Label Text Goes Here</span>
</label>
```

## Properties

| Prop               | Type                      | Description                                                                                               | Default |
| ------------------ | ------------------------- | --------------------------------------------------------------------------------------------------------- | ------- |
| `value` (Required) | `string`, `number`        | Every `<Radio />` needs a value prop.                                                                     |         |
| `className`        | `string`                  | Adds a className to the label                                                                             | `''`    |
| `disabled`         | `boolean`                 | Indicates whether or not the radio can be clicked by a user                                               | `false` |
| `children`         | `node`                    | Text that appears adjacent to the radio input; label text.                                                |         |
| `default`          | `boolean`                 | If `<RadioGroup />` is uncontrolled, the default property makes this Radio checked on the initial render. |         |
| `checked`          | `boolean`                 | Determines if `<Radio />` will appear checked                                                             | `false` |
| ...                | native `input` attributes | Any other props will be spread on the root `input` element                                                |         |
