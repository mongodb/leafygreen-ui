# Split Button

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/split-button.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/split-button/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/split-button
```

### NPM

```shell
npm install @leafygreen-ui/split-button
```

## Example

```js

import { SplitButton } from `@leafygreen-ui/split-button`;
import { MenuItem } from '@leafygreen-ui/menu';

<SplitButton
  label="label"
  menuItems={
    [
      <MenuItem key='0'>Menu Item</MenuItem>,
      <MenuItem key='1' disabled>Disabled Menu Item</MenuItem>,
      <MenuItem key='2' description="I am also a description">
        Menu Item With Description
      </MenuItem>
    ]
  }
/>
```

## Properties

| Prop               | Type                                                | Description                                                                                                                                                                                                                                      | Default     |
| ------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `label`            | `string`                                            | The text that will appear inside of the primary button.                                                                                                                                                                                          |             |
| `darkMode`         | `boolean`                                           | Renders the component with dark mode styles.                                                                                                                                                                                                     | `false`     |
| `variant`          | `'default'` \| `'primary'` \| `'danger'`            | Sets the variant for both Buttons.                                                                                                                                                                                                               | `'default'` |
| `size`             | `'xsmall'` \| `'small'` \| `'default'` \| `'large'` | Sets the size for both buttons.                                                                                                                                                                                                                  | `'default'` |
| `align`            | `'top'` \| `'bottom'`                               | Determines the alignment of the menu relative to the component wrapper.                                                                                                                                                                          | `'bottom'`  |
| `justify`          | `'start'` \| `'end'`                                | Determines the justification of the menu relative to the component wrapper.                                                                                                                                                                      | `'end'`     |
| `menuItems`        | `Array<MenuItem>`                                   | The menu items to appear in the menu dropdown. Must be an array of `<MenuItem />`.                                                                                                                                                               |             |
| `onTriggerClick`   | `React.MouseEventHandler`                           | Callback fired when the trigger is clicked.                                                                                                                                                                                                      |             |
| `triggerAriaLabel` | `string`                                            | aria-label for the menu trigger button.                                                                                                                                                                                                          |             |
| `onChange`         | `React.MouseEventHandler`                           | Callback fired when a menuItem is clicked.                                                                                                                                                                                                       |             |
| `portalContainer`  | `HTMLElement` \| `null`                             | Sets the container used for the popover's portal. NOTE: If using a `scrollContainer` make sure that the `portalContainer` is contained within the `scrollContainer`. E.g, passing the same reference to `scrollContainer` and `portalContainer`. |             |
| `scrollContainer`  | `HTMLElement` \| `null`                             | If the popover portal has a scrollable ancestor other than the window, this prop allows passing a reference to that element to allow the portal to position properly.                                                                            |             |
| `portalClassName`  | `string`                                            | Passes the given className to the popover's portal container if the default portal container is being used.                                                                                                                                      |             |
| `popoverZIndex`    | `number`                                            | Sets the z-index CSS property for the popover.                                                                                                                                                                                                   |             |
| ...                | `native attributes of component passed to as prop`  | Any other properties will be spread on the root element                                                                                                                                                                                          |             |
