# Popover

## Example

```js
import Popover from '@leafygreen-ui/popover';

<button
  className={containerStyle}
  onClick={() => this.setState({ active: !this.state.active })}
>
  Popover
  <Popover
    align={select('Align', ['top', 'bottom', 'left', 'right'], 'bottom')}
    justify={select('justify', ['start', 'middle', 'end'], 'start')}
    active={this.state.active}
    usePortal={boolean('usePortal', true)}
    spacing={number('spacing', 10)}
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

### active

**Type:** `boolean`

**Default:** `false`

Determines whether the Popover is active or inactive

### align

**Type:** `string`

**Default:** `bottom`

A string that determines the aligment of the popover relative to the `refEl`. There are four options: `top`, `bottom`, `left`, or `right`

### justify

**Type:** `string`

**Default:** `left`

A string that determines the justification of the popover relative to the `refEl`. There are three options `start`, `middle`, and `end`, which will be defined relative to the `align` prop

### children

**Type:** `node`

**Default:** `null`

Content that will appear inside of the Popver component

### usePortal

**Type:** `boolean`

**Default:** `true`

Will position Popover's children relative to its parent without using a Portal, if `usePortal` is set to false. NOTE: The parent element should be CSS position relative, fixed, or absolute if using this option.

### spacing

**Type:** `number`

**Default:** `10`

Specifies the amount of spacing (in pixels) between the trigger element and the content element.

### id

**Type:** `string`

Adds an `id` to root div element

### role

**Type:** valid WAI-Aria role, as listed here: https://www.w3.org/WAI/PF/aria/roles

Supplies a value to `role` attribute on root div element

### className

**Type:** `string`

**Default:** ''

Classname to apply to popover-content container

### adjustOnMutation

**Type:** `boolean`

**Default:** 'false'

Should the Popover auto adjust its content when the DOM changes (using MutationObserver).

## Advanced Use Case

### refEl

**Type:** `object`

**Default:** `null`

You can supply a `refEl` prop, if you do not want the popover to be positioned relative to it's nearest parent. Ref to the element to which the popover component should be positioned relative to.

#### Any other properties will be spread on the popover-content container
