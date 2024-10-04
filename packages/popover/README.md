# Popover

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/popover.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/popover/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/popover
```

### NPM

```shell
npm install @leafygreen-ui/popover
```

## Example

```js
import Popover from '@leafygreen-ui/popover';

<button
  className={containerStyle}
  onClick={() => this.setState({ active: !this.state.active })}
>
  Open Popover
  <Popover
    align="bottom"
    justify="start"
    active={this.state.active}
    usePortal={true}
    spacing={10}
  >
    <div>Popover content</div>
  </Popover>
</button>;
```

## Output HTML

```html
<html>
  <body>
    <button class="leafygreen-ui-79elbk">
      Open Popover
      <span class="leafygreen-ui-1hyfx7x"></div>
      <div align="bottom" justify="start" class="leafygreen-ui-1t5dnko">
        <div>Popover content</div>
        ::backdrop
      </div>
    </button>
  </body>
</html>
#top-layer
  > div
    > ::backdrop
```

## Render mode

### v12+

In v12+ versions, a popover should now render in the [top layer](https://developer.mozilla.org/en-US/docs/Glossary/Top_layer), which "appear[s] on top of all other content on the page."

The `usePortal` prop is available as an escape hatch to override the `renderMode` prop. `usePortal` can be used to render a popover positioned `'inline'` relative to the nearest ancestor or in a `'portal'`. `RenderMode.Inline` and `RenderMode.Portal` are marked deprecated and will eventually lose support. All overlay elements should migrate to using the top layer.

### Pre-v12

In pre-v12 versions, a popover can be rendered in 2 ways using the `usePortal` prop. By default, `usePortal={true}`, and it is rendered in a portal. If `usePortal={false}`, it is rendered inline in the DOM.

## Properties

| Prop                         | Type                                                                                           | Description                                                                                                                                                                                         | Default    |
| ---------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `active`                     | `boolean`                                                                                      | Determines whether the Popover is active or inactive                                                                                                                                                | `false`    |
| `adjustOnMutation`           | `boolean`                                                                                      | Should the Popover auto adjust its content when the DOM changes (using MutationObserver).                                                                                                           | `false`    |
| `align`                      | `'top'` \| `'bottom'` \| `'left'` \| `'right'` \| `'center-horizontal'` \| `'center-vertical'` | A string that determines the alignment of the popover relative to the `refEl`.                                                                                                                      | `'bottom'` |
| `children`                   | `node`                                                                                         | Content that will appear inside of the `<Popover />` component                                                                                                                                      |            |
| `className`                  | `string`                                                                                       | Classname to apply to popover-content container                                                                                                                                                     |            |
| `justify`                    | `'start'` \| `'middle'` \| `'end'`                                                             | A string that determines the justification of the popover relative to the `refEl`. Justification will be defined relative to the `align` prop                                                       | `'start'`  |
| `onClick`                    | `function`                                                                                     | Function that will be called when popover content is clicked.                                                                                                                                       |            |
| `popoverZIndex` (deprecated) | `number`                                                                                       | Sets the z-index CSS property for the popover. This will only apply if `usePortal` is defined and `renderMode` is not `'top-layer'`                                                                 |            |
| `refEl`                      | `React.RefObject<HTMLElement>`                                                                 | You can supply a `refEl` prop, if you do not want the popover to be positioned relative to it's nearest parent. Ref to the element to which the popover component should be positioned relative to. | `null`     |
| `spacing`                    | `number`                                                                                       | Specifies the amount of spacing (in pixels) between the trigger element and the content element.                                                                                                    | `4`        |
| ...                          | native attributes of Portal or Fragment                                                        | Any other properties will be spread on the popover-content container                                                                                                                                |            |

### v12+

| Prop                           | Type                                      | Description                                                                                                                                                                                                                                                                                                                                                       | Default  |
| ------------------------------ | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `dismissMode`                  | `'auto'` \| `'manual'`                    | Options to control how the popover element is dismissed. This will only apply when `usePortal` is undefined and `renderMode` is `'top-layer'` <br> \* `'auto'` will automatically handle dismissal on backdrop click or esc key press, ensuring only one popover is visible at a time <br> \* `'manual'` will require that the consumer handle dismissal manually | `'auto'` |
| `onToggle`                     | `(e: ToggleEvent) => void;`               | Function that is called when the popover is toggled. This will only apply when `usePortal` is undefined and `renderMode` is `'top-layer'`                                                                                                                                                                                                                         |          |
| `portalClassName` (deprecated) | `string`                                  | Passes the given className to the popover's portal container if the default portal container is being used. This will only apply when `usePortal` is `true`                                                                                                                                                                                                       |          |
| `portalContainer` (deprecated) | `HTMLElement` \| `null`                   | Sets the container used for the popover's portal. This will only apply when `usePortal` is `true`. <br> NOTE: If using a `scrollContainer` make sure that the `portalContainer` is contained within the `scrollContainer`. E.g, passing the same reference to `scrollContainer` and `portalContainer`.                                                            |          |
| `portalRef` (deprecated)       | `string`                                  | Passes a ref to forward to the portal element. This will only apply when `usePortal` is `true`                                                                                                                                                                                                                                                                    |          |
| `scrollContainer` (deprecated) | `HTMLElement` \| `null`                   | If the popover portal has a scrollable ancestor other than the window, this prop allows passing a reference to that element to allow the portal to position properly. This will only apply when `usePortal` is `true`                                                                                                                                             |          |
| `renderMode`                   | `'inline'` \| `'portal'` \| `'top-layer'` | Options to render the popover element <br> \* [deprecated] `'inline'` will render the popover element inline with the reference element <br> \* [deprecated] `'portal'` will render the popover element in a provided `portalContainer` or in a new div appended to the body <br> \* `'top-layer'` will render the popover element in the top layer               | `'auto'` |
| `usePortal` (deprecated)       | `boolean`                                 | Migration escape hatch that can be defined to override `renderMode`. <br> When `true`, it will set `renderMode` to `'portal'` <br> When `false`, it will set `renderMode` to `'inline'`                                                                                                                                                                           |          |

### Pre-v12

| Prop              | Type                    | Description                                                                                                                                                                                                                                                                                            | Default |
| ----------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `portalClassName` | `string`                | Passes the given className to the popover's portal container if the default portal container is being used. This will only apply when `usePortal` is `true`                                                                                                                                            |         |
| `portalContainer` | `HTMLElement` \| `null` | Sets the container used for the popover's portal. This will only apply when `usePortal` is `true`. <br> NOTE: If using a `scrollContainer` make sure that the `portalContainer` is contained within the `scrollContainer`. E.g, passing the same reference to `scrollContainer` and `portalContainer`. |         |
| `portalRef`       | `string`                | Passes a ref to forward to the portal element. This will only apply when `usePortal` is `true`                                                                                                                                                                                                         |         |
| `scrollContainer` | `HTMLElement` \| `null` | If the popover portal has a scrollable ancestor other than the window, this prop allows passing a reference to that element to allow the portal to position properly. This will only apply when `usePortal` is `true`                                                                                  |         |
| `usePortal`       | `boolean`               | Option to render popover element in a portal. <br> When `true`, the popover element will portal into the provided `portalContainer` or a new div appended to the end of the `<body>` <br> When `false`, the popover element will render inline in the DOM                                              | `true`  |
