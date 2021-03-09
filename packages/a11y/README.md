# A11y

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/a11y.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/a11y--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/a11y
```

### NPM

```shell
npm install @leafygreen-ui/a11y
```

## Example

```js
import { VisuallyHidden } from '@leafygreen-ui/a11y';

const Button = () => {
  return (
    <button>
      <svg role="presentation" aria-hidden />
      <VisuallyHidden>Click me</VisuallyHidden>
    </button>
  );
};
```

**Output HTML**

```html
<button>
  <svg role="presentation" aria-hidden="true" />
  <div>Click me</div>
</button>
```

## VisuallyHidden

### Properties

| Prop       | Type     | Description                                                             | Default |
| ---------- | -------- | ----------------------------------------------------------------------- | ------- |
| `children` | `string` | Text that is announced to screen readers but is hidden from the screen. |         |

## useAccessibleFormField

Hook that returns two sets of props that accessibly associate a label and its respective input element

### Properties

| Prop | Type     | Description                          | Default |
| ---- | -------- | ------------------------------------ | ------- |
| `id` | `string` | id that describes the input element. |         |

## validateAriaLabelProps

Function that validates that either aria-label or aria-labelledby are present within props.

### Arguments

| Arguments       | Type                  | Description                                   | Default |
| --------------- | --------------------- | --------------------------------------------- | ------- |
| `props`         | `Record<string, any>` | Object of component properties.               |         |
| `componentName` | `string`              | Name of component with props to be validated. |         |

## validateLabelProps

Function that validates that either label or aria-labelledby are present within props.

### Arguments

| Arguments       | Type                  | Description                                   | Default |
| --------------- | --------------------- | --------------------------------------------- | ------- |
| `props`         | `Record<string, any>` | Object of component properties.               |         |
| `componentName` | `string`              | Name of component with props to be validated. |         |
