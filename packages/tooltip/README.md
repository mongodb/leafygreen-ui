# Tooltip

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/tooltip.svg)

## Example

<!-- will update once component is finalized -->

## Properties

### open

**Type:** `boolean`

**Default:** `false`

Determines whether or not the `Tooltip` will appear as open or closed, if controlled.

### setOpen

**Type:** `function`

When controlling the component, use `setOpen` to keep track of the `Tooltip` component's state so that clicks on the document's backdrop as well as a user pressing the Escape Key will close the `Tooltip` and update the consuming application's local state accordingly.

### shouldClose

**Type:** `function`

**Default:** `() => true`

Determines if the `Tooltip` should close when the backdrop or Escape keys are clicked. Defaults to true.

### align

**Type:** `top`, `bottom`, `left`, `right`

**Default:** `top`

Determines the alignment of the `Tooltip` component relative to a reference element, or the element's nearest parent

### justify

**Type:** `start`, `middle`, `end`

**Default:** `start`

Determines the justification of the `Tooltip` component (based on the alignment) relative to a reference element or the element's nearest parent

### trigger

**Type:** `HTMLElement` or `ReactNode`

An `HTMLElement` or `ReactNode` against which the `Tooltip` will be positioned.

### triggerEvent

**Type:** `hover` or `click`

**Default:** `hover`

Event that triggers opening/closing of `Tooltip` component

### variant

**Type:** `light` or `dark`

**Default:** `light`

Determines color of `Tooltip` component

### id

**Type:** `string`

id applied to `Tooltip` component

#### Any other properties will be spread on the Menu `div` container
