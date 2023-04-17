# Segmented Control

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/segmented-control.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/segmented-control/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/segmented-control
```

### NPM

```shell
npm install @leafygreen-ui/segmented-control
```

## Example

```js
import {
  SegmentedControl,
  SegmentedControlOption,
} from '@leafygreen-ui/segmented-control';

<SegmentedControl
  name="fruit"
  size={'default'}
  darkMode={false}
  followFocus={true}
  defaultValue={carrot}
  onChange={(value: string) => {
    console.log(value);
  }}
>
  <SegmentedControlOption value="apple">Apple</SegmentedControlOption>

  <SegmentedControlOption value="banana">Banana</SegmentedControlOption>

  <SegmentedControlOption value="carrot">Carrot</SegmentedControlOption>

  <SegmentedControlOption value="dragonfruit" disabled>
    Dragonfruit
  </SegmentedControlOption>
</SegmentedControl>;
```

**Output HTML**

```html
<div>
  <div
    role="tablist"
    aria-label="fruit"
    aria-owns="fruit-0 fruit-1 fruit-2 fruit-3"
  >
    <div data-lg-checked="true">
      <div>
        <div tabindex="-1">
          <button role="tab" id="fruit-0" tabindex="0" aria-selected="true">
            <span>Apple</span>
          </button>
        </div>
        <div data-leafygreen-ui="interaction-ring"></div>
      </div>
    </div>
    <div data-lg-checked="false">
      <div>
        <div tabindex="-1">
          <button role="tab" id="fruit-1" tabindex="-1" aria-selected="false">
            <span>Banana</span>
          </button>
        </div>
        <div data-leafygreen-ui="interaction-ring"></div>
      </div>
    </div>
    <div data-lg-checked="false">
      <div>
        <div tabindex="-1">
          <button role="tab" id="fruit-2" tabindex="-1" aria-selected="false">
            <span>Carrot</span>
          </button>
        </div>
        <div data-leafygreen-ui="interaction-ring"></div>
      </div>
    </div>
    <div data-lg-checked="false">
      <div>
        <div tabindex="-1">
          <button
            role="tab"
            id="fruit-3"
            tabindex="-1"
            aria-selected="false"
            disabled=""
          >
            <span>Dragonfruit</span>
          </button>
        </div>
        <div data-leafygreen-ui="interaction-ring"></div>
      </div>
    </div>
    <div data-leafygreen-ui="selection-indicator"></div>
    <div data-leafygreen-ui="hover-indicator"></div>
  </div>
</div>
```

## Props

| Prop              | Type                       | Description                                                                                                                                                                                              | Default   |
| ----------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `children`        | `React.ReactNode`          | Children must be `SegmentedControlOptions`                                                                                                                                                               | `null`    |
| `size`            | `xsmall / default / large` | Defines the size of the segmented control.                                                                                                                                                               | `default` |
| `darkMode`        | `boolean`                  | Toggles dark mode                                                                                                                                                                                        | `false`   |
| `defaultValue`    | `string`                   | Defines the default, or initial value of the component. Ignored if `value` is also provided.                                                                                                             | `''`      |
| `value`           | `string`                   | Controls the value of the component. If provided, you must update the value in the `onChange` method, or other user actions (such as routing)                                                            |           |
| `label`           | `string`                   | A text label to the left of the segmented control. Sets the `name` prop if none is provided.                                                                                                             |           |
| `name`            | `string`                   | Identifies the segmented control group to screen readers. Auto-generated if no `name` or `label` is provided. It's recommended for accessability to set this to a meaningful value for accessibility.    |           |
| `followFocus`     | `boolean`                  | Defines whether the selection should automatically follow focus. If set to true, the arrow keys can be used to switch selection, otherwise a keyboard user will need to press enter to make a selection. | `true`    |
| `'aria-controls'` | `string`                   | An `id` ref that identifies the element(s) whose contents/presence is controlled by the segmented control. Required as a prop on the control, or on each individual option.                              |           |
| `className`       | `string`                   | Adds a className to the outermost element.                                                                                                                                                               |           |
| `onChange`        | `(value: string) => void`  | Callback that gets called when a user makes a new selection.                                                                                                                                             |           |

# SegmentedControlOption

## Props

| Prop              | Type                         | Description                                                                                                                                                                 | Default            |
| ----------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `children`        | `React.ReactNode`            | Should be text.                                                                                                                                                             |                    |
| `value`           | `string`                     | Required. The value of the option.                                                                                                                                          |                    |
| `glyph`           | `React.ReactElement`         | The icon to display to the left of the option.                                                                                                                              |                    |
| `disabled`        | `boolean`                    | Toggles whether the option is disabled.                                                                                                                                     | `false`            |
| `as`              | `string`                     | Render the option wrapped in another component. Typically used for router `Link` components.                                                                                | `'div'`            |
| `'aria-controls'` | `string`                     | An `id` ref that identifies the element(s) whose contents/presence is controlled by the segmented control. Required as a prop on the control, or on each individual option. |                    |
| `className`       | `string`                     | Adds a className to the outermost element.                                                                                                                                  |                    |
| `_id`             | `string`                     | Internal. A unique identifier for the option                                                                                                                                | `${name}-${index}` |
| `_checked`        | `boolean`                    | Internal. Identifies whether the option is checked.                                                                                                                         |                    |
| `_focused`        | `boolean`                    | Internal. Identifies whether the option has focus                                                                                                                           |                    |
| `_index`          | `number`                     | Internal. The index of the option                                                                                                                                           |                    |
| `_onClick`        | `(value: string) => void`    | Internal. Calls the onChange callback                                                                                                                                       |                    |
| `_onHover`        | `(hovered: boolean) => void` | Internal. Fires on mouse in and out                                                                                                                                         |                    |
