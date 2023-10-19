# Chip

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/chip.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/chip/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/chip
```

### NPM

```shell
npm install @leafygreen-ui/chip
```

## Example

```js
import { Chip } from `@leafygreen-ui/chip`;

<Chip label="leafygreen" />

or

<Chip
  label="leafygreen"
  variant="blue"
  baseFontSize={13}
  disabled
  onDismiss={() => {}}
  popoverZIndex={1}
  chipCharacterLimit={10}
  chipTruncationLocation="end"
  dismissButtonAriaLabel="aria-label"
  darkMode
/>

```

## Properties

| Prop                     | Type                                                                                 | Description                                                                                                                                                                                                                                               | Default             |
| ------------------------ | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `label`                  | `React.ReactNode`                                                                    | Label rendered in the chip                                                                                                                                                                                                                                |                     |
| `chipTruncationLocation` | `'end'` \| `'middle'` \| `'none'` \| `'start'`                                       | Defines where the ellipses will appear in a Chip when the label length exceeds the `chipCharacterLimit`. If `none` is passed, the chip will not truncate. **Note**: If there is any truncation, the full label text will appear inside a tooltip on hover | `none`              |
| `chipCharacterLimit`     | `number`                                                                             | Defines the character limit of a Chip before they start truncating. **Note**: the three ellipses dots are included in the character limit and the chip will only truncate if the chip length is greater than the `chipCharacterLimit`.                    |                     |
| `popoverZIndex`          | `number`                                                                             | Number that controls the z-index of the tooltip containing the full label text.                                                                                                                                                                           |                     |
| `baseFontSize`           | `'13'` \| `'16'`                                                                     | Determines the base font-size of the chip.                                                                                                                                                                                                                |                     |
| `variant`                | `'gray'` \| `'blue'` \| `'green'` \| `'purple'` \| `'red'` \| `'yellow'` \| `'blue'` | The color of the chip.                                                                                                                                                                                                                                    |                     |
| `disabled`               | `boolean`                                                                            | Determines if the chip should be disabled.                                                                                                                                                                                                                | `false`             |
| `onDismiss`              | `React.MouseEventHandler<HTMLButtonElement>`                                         | Callback when dismiss button is clicked. If set, a dismiss button will render.                                                                                                                                                                            |                     |
| `dismissButtonAriaLabel` | `string`                                                                             | aria-label for the dismiss button.                                                                                                                                                                                                                        | `${label} deselect` |
| `darkMode`               | `boolean`                                                                            | Render the component in dark mode.                                                                                                                                                                                                                        | `false`             |
| ...                      | native `span` attributes                                                             | Any other props will be spread on the root `span` element                                                                                                                                                                                                 |
