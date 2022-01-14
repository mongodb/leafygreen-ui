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
  <Option value="dog">Dog</Option>
  <Option value="cat">Cat</Option>
  <OptionGroup label="Less common">
    <Option value="hamster">Hamster</Option>
    <Option value="parrot">Parrot</Option>
  </OptionGroup>
</Select>;
```

**Output HTML**

```html
<div class="">
  <label id="select-7-label" class="leafygreen-ui-xzhurf">Label</label>
  <div id="select-7-description" class="leafygreen-ui-3gds6m">Description</div>
  <button
    type="button"
    class="leafygreen-ui-1fdrra0"
    aria-disabled="false"
    aria-labelledby="select-7-label"
    aria-controls="select-7-menu"
    aria-expanded="false"
    aria-describedby="select-7-description"
    name="Name"
    value="cat"
  >
    <span class="leafygreen-ui-tdo6z2"
      ><div class="leafygreen-ui-ogsjyj">
        <span class="leafygreen-ui-1ks3bq2">Cat</span
        ><svg
          class="leafygreen-ui-1jr2j1f"
          height="16"
          width="16"
          role="presentation"
          aria-hidden="true"
          alt=""
          viewBox="0 0 16 16"
        >
          <g
            id="CaretDown-Copy"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <path
              d="M4.67285687,6 L11.3271431,6 C11.9254697,6 12.224633,6.775217 11.8024493,7.22717749 L8.47530616,10.7889853 C8.21248981,11.0703382 7.78751019,11.0703382 7.52748976,10.7889853 L4.19755071,7.22717749 C3.77536701,6.775217 4.07453029,6 4.67285687,6 Z"
              id="Path"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      </div>
      <div></div
    ></span>
  </button>
</div>
```

## Select Properties

| Prop              | Type                                          | Description                                                                                                                                                          | Default     |
| ----------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `children`        | `node`                                        | `<Option />` and `<OptionGroup />` elements.                                                                                                                         |             |
| `className`       | `string`                                      | Adds a className to the outermost element.                                                                                                                           |             |
| `darkMode`        | `boolean`                                     | Determines whether or not the component will appear in dark mode.                                                                                                    | `false`     |
| `size`            | `'xsmall'`, `'small'`, `'default'`, `'large'` | Sets the size of the component's elements.                                                                                                                           | `'default'` |
| `id`              | `string`                                      | id associated with the Select component.                                                                                                                             |             |
| `name`            | `string`                                      | The name that will be used when submitted as part of a form.                                                                                                         |             |
| `label`           | `string`                                      | Text shown in bold above the input element.                                                                                                                          |             |
| `aria-labelledby` | `string`                                      | Must be provided if and only if `label` is not provided.                                                                                                             |             |
| `description`     | `string`                                      | Text that gives more detail about the requirements for the input.                                                                                                    |             |
| `placeholder`     | `string`                                      | The placeholder text shown in the input element when an option is not selected.                                                                                      | `'Select'`  |
| `disabled`        | `boolean`                                     | Disables the component from being edited.                                                                                                                            | `false`     |
| `value`           | `string`                                      | Sets the `<Option />` that will appear selected and makes the component a controlled component.                                                                      | `''`        |
| `defaultValue`    | `string`                                      | Sets the `<Option />` that will appear selected on page load when the component is uncontrolled.                                                                     | `''`        |
| `onChange`        | `function`                                    | A function that gets called when the selected value changes. Receives the value string as the first argument.                                                        | `() => {}`  |
| `readOnly`        | `boolean`                                     | Disables the console warning when the component is controlled and no `onChange` prop is provided.                                                                    | `false`     |
| `allowDeselect`   | `boolean`                                     | Enables or disables the option for a user to select a null default value.                                                                                            | `true`      |
| `usePortal`       | `boolean`                                     | Determines if Select dropdown will be rendered inside a portal.                                                                                                      | `true`      |
| `portalContainer` | `HTMLElement` \| `null`                       | Sets the container used for the popover's portal.                                                                                                                    |             |
| `scrollContainer` | `HTMLElement` \| `null`                       | If the popover portal has a scrollable ancestor other than the window, this prop allows passing a reference to that lement to allow the portal to position properly. |             |
| `portalClassName` | `string`                                      | Passes the given className to the popover's portal container if the default portal container is being used.                                                          |             |
| `popoverZIndex`   | `number`                                      | Sets the z-index CSS property for the popover.                                                                                                                       |             |
| `state`           | `'none'`, `'error'`                           | Determines the state of the `<select>`                                                                                                                               | `'none'`    |
| `errorMessage`    | `string`                                      | Text that shows when the `state` is set to `error`.                                                                                                                  |             |

# Option

| Prop        | Type                 | Description                                                                                           | Default                     |
| ----------- | -------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------- |
| `children`  | `string`, `number`   | Content to appear inside of the component.                                                            |                             |
| `className` | `string`             | Adds a className to the outermost element.                                                            |                             |
| `glyph`     | `React.ReactElement` | Icon to display next to the option text.                                                              |                             |
| `value`     | `string`             | Corresponds to the value passed into the `onChange` prop of `<Select />` when the option is selected. | text contents of `children` |
| `disabled`  | `boolean`            | Prevents the option from being selectable.                                                            | `false`                     |

# OptionGroup

| Prop        | Type      | Description                                               | Default |
| ----------- | --------- | --------------------------------------------------------- | ------- |
| `children`  | `node`    | `<Option />` elements                                     |         |
| `className` | `string`  | Adds a className to the outermost element.                |         |
| `label`     | `string`  | Text shown above the group's options.                     |         |
| `disabled`  | `boolean` | Prevents all the contained options from being selectable. | `false` |
