# Tooltip

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/tooltip.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/tooltip/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/tooltip
```

### NPM

```shell
npm install @leafygreen-ui/tooltip
```

## Example

```js
import Tooltip from '@leafygreen-ui/tooltip';

<Tooltip
  align="top"
  justify="start"
  trigger={<button>trigger</button>}
  triggerEvent="hover"
  darkMode={true}
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

| Prop              | Type                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Default                                     |
| ----------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `open`            | `boolean`                                | Controls the component, and determines whether or not the `<Tooltip />` will appear open or closed.                                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`                                     |
| `setOpen`         | `function`                               | If controlling the component, pass state handling function to setOpen prop. This will keep the consuming application's state in-sync with LeafyGreen's state, while the `<Tooltip />` component responds to events such as backdrop clicks and a user pressing the Escape key.                                                                                                                                                                                                                                                                 | `(boolean) => boolean`                      |
| `initialOpen`     | `boolean`                                | Passes an initial "open" value to an uncontrolled Tooltip.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `false`                                     |
| `shouldClose`     | `function`                               | Callback that should return a boolean that determines whether or not the `<Tooltip />` should close when a user tries to close it.                                                                                                                                                                                                                                                                                                                                                                                                             | `() => true`                                |
| `align`           | `'top'`, `'bottom'`, `'left'`, `'right'` | Determines the preferred alignment of the `<Tooltip />` component relative to the element passed to the `trigger` prop. If no `trigger` is passed, the Tooltip will be positioned against its nearest parent element.                                                                                                                                                                                                                                                                                                                          | `'top'`                                     |
| `justify`         | `'start'`, `'middle'`, `'end'`, `'fit'`  | Determines the preferred justification of the `<Tooltip />` component (based on the alignment) relative to the element passed to the `trigger` prop. If no `trigger` is passed, the Tooltip will be positioned against its nearest parent element.                                                                                                                                                                                                                                                                                             | `'start'`                                   |
| `trigger`         | `function`, `React.ReactNode`            | A `React.ReactNode` against which the `<Tooltip />` will be positioned, and what will be used to trigger the opening and closing of the `Tooltip` component, when the `Tooltip` is uncontrolled. If no `trigger` is passed, the `Tooltip` will be positioned against its nearest parent element. If using a `ReactNode` or inline function, trigger signature is: ({children, ...rest}) => (<button {...rest}>trigger {children}</button>). When using a function, you must pass `children` as an argument in order for the tooltip to render. |                                             |
| `triggerEvent`    | `'hover'`, `'click'`                     | DOM event that triggers opening/closing of `<Tooltip />` component                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `'hover'`                                   |
| `darkMode`        | `boolean`                                | Determines if the `<Tooltip />` will appear in dark mode.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `false`                                     |
| `id`              | `string`                                 | `id` applied to `<Tooltip />` component                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |                                             |
| `className`       | `string`                                 | Applies a className to Tooltip container                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                             |
| `children`        | `node`                                   | Content that will be rendered inside of `<Tooltip />`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |                                             |
| `enabled`         | `boolean`                                | Enables Tooltip to trigger based on the event specified by `triggerEvent`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `true`                                      |
| `onClose`         | `function`                               | Callback that is called when the tooltip is closed internally. E.g. on ESC press, on backdrop click, on blur..                                                                                                                                                                                                                                                                                                                                                                                                                                 | `() => {}`                                  |
| `usePortal`       | `boolean`                                | Determines if the Tooltip will be rendered within a portal.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `true`                                      |
| `portalContainer` | `HTMLElement` \| `null`                  | Sets the container used for the popover's portal. NOTE: If using a `scrollContainer` make sure that the `portalContainer` is contained within the `scrollContainer`. E.g, passing the same refrence to `scrollContainer` and `portalContainer`.                                                                                                                                                                                                                                                                                                |                                             |
| `scrollContainer` | `HTMLElement` \| `null`                  | If the popover portal has a scrollable ancestor other than the window, this prop allows passing a reference to that lement to allow the portal to position properly.                                                                                                                                                                                                                                                                                                                                                                           |                                             |
| `portalClassName` | `string`                                 | Passes the given className to the popover's portal container if the default portal container is being used.                                                                                                                                                                                                                                                                                                                                                                                                                                    |                                             |
| `popoverZIndex`   | `number`                                 | Sets the z-index CSS property for the popover.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |                                             |
| `baseFontSize`    | `13` \| `16`                             | font-size applied to typography element                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | default to value set by LeafyGreen Provider |
| ...               | native `div` attributes                  | Any other props will be spread on the root `div` element                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |                                             |
