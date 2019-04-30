# Menu

## Example

```js
<Menu active={active}>
  <MenuList>
    <MenuItem>Element A</MenuItem>
    <MenuItem>Element B</MenuItem>
  </MenuList>
  <MenuItem>Element C</MenuItem>
</Menu>
```

**Output HTML**

```html
<div
  class="leafygreen-ui-1mgywk9"
  style="top: 314px; left: 184.641px; transform-origin: left bottom; transform: translate3d(0px, 0px, 0px) scale(1); opacity: 1;"
>
  <ul class="leafygreen-ui-1pmg95n leafygreen-ui-a4vi4u">
    <div role="menu" class="leafygreen-ui-nr6zi2">
      <li class="leafygreen-ui-qgvq6k">
        <span class="leafygreen-ui-t0k4ub">Element A</span>
      </li>
      <li class="leafygreen-ui-qgvq6k">
        <span class="leafygreen-ui-t0k4ub">Element B</span>
      </li>
    </div>
    <li class="leafygreen-ui-qgvq6k">
      <span class="leafygreen-ui-t0k4ub">Element C</span>
    </li>
  </ul>
</div>
```

## Properties

### active

**Type:** `boolean`

**Default:** `false`

Determines whether or not the `Menu` will appear as open or closed

### align

**Type:** `top`, `bottom`, `left`, `right`

**Default:** `bottom`

Determines the alignment of the `Menu` component relative to a reference element, or the element's nearest parent

### justify

**Type:** `start`, `middle`, `end`

**Default:** `start`

Determines the justification of the `Menu` component (based on the alignment) relative to ar eference element or the element's nearest parent

### refEl

**Type:** `node`

**Default:** `null`

Pass a reference to an element that the `Menu` component should be positioned against

# MenuList

## Properties

### children

**Type:** `node`

**Default:** `null`

Children that will be rendered inside this group of `MenuItem` components

### className

**Type:** `string`

**Default:** ``

Style to be applied to the `MenuList` component

# MenuItem

## Properties

### href

**Type:** `string`

**Default:** ``

If supplied, will render the `MenuItem` inside of an `<a>` tag, rather than a `<span>` tag

### children

**Type:** `node`

**Default:** `null`

Contents to appear inside of `MenuItem` component

### className

**Type:** `string`

**Default:** ``

Classname applied to `li` element

### onSelect

**Type:** `function`

**Default:** `() => {}`

Function that will be called when a `MenuItem` is clicked
