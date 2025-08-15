# A11y

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/a11y.svg)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/a11y
```

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

## VisuallyHidden

### Properties

| Prop       | Type     | Description                                                             | Default |
| ---------- | -------- | ----------------------------------------------------------------------- | ------- |
| `children` | `string` | Text that is announced to screen readers but is hidden from the screen. |         |

## useAccessibleFormField

Hook that returns two sets of props that accessibly associate a label and its respective input element

### Properties

| Parameter | Type     | Description                          | Default |
| --------- | -------- | ------------------------------------ | ------- |
| `id`      | `string` | id that describes the input element. |         |

## validateAriaLabelProps

Function that validates that either aria-label or aria-labelledby are present within props.

### Properties

| Parameter       | Type                  | Description                                   | Default |
| --------------- | --------------------- | --------------------------------------------- | ------- |
| `props`         | `Record<string, any>` | Object of component properties.               |         |
| `componentName` | `string`              | Name of component with props to be validated. |         |

## prefersReducedMotion

Returns an emotion CSS instance for rendering styles that respect
OS-level preferences for reduced motion.

Use this function to remove scale, size, and positional transitions
for users with that preference set.

### Properties

| Parameter | Type     | Description                                               | Default |
| --------- | -------- | --------------------------------------------------------- | ------- |
| `styles`  | `string` | String of styles to render within preference media query. |         |
