# Popover

## Example

```js
<div className={containerStyle}>
  <button onClick={() => this.setState({ active: !this.state.active })}>
    Popover
  </button>
  <Popover
    align='bottom'
    justify='start'
    active={this.state.active}
    usePortal={true}
  >
    <div className={popoverStyle}>Popover content</div>
  </Popover>
</div>
```

## Output HTML

```html
<div class="leafygreen-ui-79elbk">
  <button>Popover</button>
  <div class="leafygreen-ui-1hyfx7x"></div>
</div>

<div align="bottom" justify="start" class="leafygreen-ui-1t5dnko">
  <div class="leafygreen-ui-ii2v5b">Popover content</div>
</div>
```

## Simple Use Case
The popover component will be automatically positioned relative to its neartest parent, which has position `absolute` specified.

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

### getUpdatePosition

**Type:** `function`

**Default:** `() => {}`

Callback to execute and force a position recalculation when the DOM has changed

### className

**Type:** `string`

**Default:** ''

Classname to apply to popover-content container

## Advanced Use Case 

### refEl

**Type:** `object`

**Default:** `null`

You can supply a `refEl` prop, if you do not want the popover to be positioned relative to it's nearest parent. Ref to the element to which the popover component should be positioned relative to. 

#### Any other properties will be spread on the popover-content container
