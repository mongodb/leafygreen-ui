# Tooltip

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/tooltip.svg)

## Example

```js
import Tooltip from '@leafygreen-ui/tooltip';

<Tooltip
  align="top"
  justify="start"
  trigger={<button>trigger</button>}
  triggerEvent="hover"
  variant="dark"
>
  I am an uncontrolled Tooltip!
</Tooltip>;
```

**Output HTML**

```html
<button aria-describedby="tooltip-6">
  trigger
  <div class="leafygreen-ui-1hyfx7x"></div>
</button>
<div>
  <div class="leafygreen-ui-63ea86">
    <div role="tooltip" id="tooltip-6" class="leafygreen-ui-a17v6a">
      <div class="leafygreen-ui-11wlmto">
        <div class="leafygreen-ui-ry7wu4"></div>
      </div>
      I am an uncontrolled Tooltip!
    </div>
  </div>
</div>
```

## Properties

### open

**Type:** `boolean`

**Default:** `false`

Controls the component, and determines whether or not the `Tooltip` will appear open or closed.

### setOpen

**Type:** `function`

**Signature:** `(boolean) => boolean`

If controlling the component, pass state handling function to setOpen prop. This will keep the consuming application's state in-sync with LeafyGreen's state, while the `Tooltip` component responds to events such as backdrop clicks and a user pressing the Escape key.

### shouldClose

**Type:** `function`

**Default:** `() => true`

Callback that should return a boolean that determines whether or not the `Tooltip` should close when a user tries to close it.

### align

**Type:** `top`, `bottom`, `left`, `right`

**Default:** `top`

Determines the preferred alignment of the `Tooltip` component relative to the element passed to the `trigger` prop. If no `trigger` is passed, the Tooltip will be positioned against its nearest parent element.

### justify

**Type:** `start`, `middle`, `end`

**Default:** `start`

Determines the preferred justification of the `Tooltip` component (based on the alignment) relative to the element passed to the `trigger` prop. If no `trigger` is passed, the Tooltip will be positioned against its nearest parent element.

### trigger

**Type:** `HTMLElement` or `ReactNode`

An `HTMLElement` or `ReactNode` against which the `Tooltip` will be positioned, and what will be used to trigger the opening and closing of the `Tooltip` component, when the `Tooltip` is uncontrolled. If no `trigger` is passed, the `Tooltip` will be positioned against its nearest parent element.

If using a `ReactNode` or inline function, trigger signature is:

**Signature:** ({children, ...rest}) => (<button {...rest}>trigger {children}</button>)

### triggerEvent

**Type:** `hover` or `click`

**Default:** `hover`

DOM event that triggers opening/closing of `Tooltip` component

### variant

**Type:** `light` or `dark`

**Default:** `light`

Determines the color variant of the `Tooltip` component.

### id

**Type:** `string`

`id` applied to `Tooltip` component

#### Any other properties will be spread on the Menu `div` container
