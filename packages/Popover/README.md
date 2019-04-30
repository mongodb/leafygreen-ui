# Popover

## Example

```js
<Popover
  active
  align="top"
  justify="center"
  refEl={document.getElementById('root')}
>
  Popover!
</Popover>
```

## Output HTML

```html
<div>Popover!</div>
```

### refEl

**Type:** `object`

**Default:** `null`

Required. Ref to the element to which the popover component should be positioned against

### active

**Type:** `boolean`

**Default:** `false`

Determines whether the Popover is active or inactive

### align

**Type:** `string`

**Default:** `top`

A string that determines the aligment of the popover relative to the `refEl`. There are four options: `top`, `bottom`, `left`, or `right`

### justify

**Type:** `string`

**Default:** `left`

A string that determines the justification of the popover relative to the `refEl`. There are three options `start`, `middle`, and `end`, which will be defined relative to the `align` prop

### children

**Type:** `node`

**Default:** `null`

Content that will appear inside of the Popver component

### withoutPortal

**Type:** `boolean`

**Default:** `false`

Will position the contents of the Popover component absolutely to a parent element, which should be position `relative.` The popover contents will appear linearly in the DOM, rather than being portaled to the end.

### getUpdatePosition

**Type:** `function`

**Default:** `() => {}`

Callback to execute and force a position recalculation when the DOM has changed

### className

**Type:** `string`

**Default:** ''

Classname to apply to popover-content container

#### Any other properties will be spread on the popover-content container
