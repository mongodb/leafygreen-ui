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
  Popover
  <Popover
    align="bottom"
    justify="start"
    active={this.state.active}
    usePortal={true}
    spacing={10}
  >
    <div className={popoverStyle}>Popover content</div>
  </Popover>
</button>;
```

## Output HTML

```html
<button class="leafygreen-ui-79elbk">
  Popover
  <div class="leafygreen-ui-1hyfx7x"></div>
</button>

<div align="bottom" justify="start" class="leafygreen-ui-1t5dnko">
  <div class="leafygreen-ui-ii2v5b">Popover content</div>
</div>
```

## Simple Use Case

The popover component will be automatically positioned relative to its nearest parent. If `usePortal` is set to `false`, then it will be positioned relative to its nearest ancestor with the CSS property: `position: absolute | relative | fixed`.

## Properties

| Prop               | Type                                                                                           | Description                                                                                                                                                                                                                                      | Default    |
| ------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `active`           | `boolean`                                                                                      | Determines whether the Popover is active or inactive                                                                                                                                                                                             | `false`    |
| `align`            | `'top'` \| `'bottom'` \| `'left'` \| `'right'` \| `'center-horizontal'` \| `'center-vertical'` | A string that determines the alignment of the popover relative to the `refEl`.                                                                                                                                                                   | `'bottom'` |
| `justify`          | `'start'` \| `'middle'` \| `'end'` \| `'fit'`                                                  | A string that determines the justification of the popover relative to the `refEl`. Justification will be defined relative to the `align` prop                                                                                                    | `'start'`  |
| `children`         | `node`                                                                                         | Content that will appear inside of the `<Popover />` component                                                                                                                                                                                   |            |
| `spacing`          | `number`                                                                                       | Specifies the amount of spacing (in pixels) between the trigger element and the content element.                                                                                                                                                 | `10`       |
| `className`        | `string`                                                                                       | Classname to apply to popover-content container                                                                                                                                                                                                  |            |
| `adjustOnMutation` | `boolean`                                                                                      | Should the Popover auto adjust its content when the DOM changes (using MutationObserver).                                                                                                                                                        | `false`    |
| `onClick`          | `function`                                                                                     | Function that will be called when popover content is clicked.                                                                                                                                                                                    |            |
| `usePortal`        | `boolean`                                                                                      | Will position Popover's children relative to its parent without using a Portal, if `usePortal` is set to false. NOTE: The parent element should be CSS position `relative`, `fixed`, or `absolute` if using this option.                         | `true`     |
| `portalContainer`  | `HTMLElement` \| `null`                                                                        | Sets the container used for the popover's portal. NOTE: If using a `scrollContainer` make sure that the `portalContainer` is contained within the `scrollContainer`. E.g, passing the same reference to `scrollContainer` and `portalContainer`. |            |
| `scrollContainer`  | `HTMLElement` \| `null`                                                                        | If the popover portal has a scrollable ancestor other than the window, this prop allows passing a reference to that element to allow the portal to position properly.                                                                            |            |
| `portalClassName`  | `string`                                                                                       | Passes the given className to the popover's portal container if the default portal container is being used.                                                                                                                                      |            |
| `popoverZIndex`    | `number`                                                                                       | Sets the z-index CSS property for the popover.                                                                                                                                                                                                   |            |
| ...                | native attributes of Portal or Fragment                                                        | Any other properties will be spread on the popover-content container                                                                                                                                                                             |            |

## Advanced Use Case

| Prop    | Type          | Description                                                                                                                                                                                         | Default |
| ------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `refEl` | `HTMLElement` | You can supply a `refEl` prop, if you do not want the popover to be positioned relative to it's nearest parent. Ref to the element to which the popover component should be positioned relative to. | `null`  |
