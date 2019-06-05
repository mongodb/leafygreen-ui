# Menu

## Example

```js
<Menu
  align={select('Align', ['top', 'bottom', 'left', 'right'], 'bottom')}
  justify={select('justify', ['start', 'middle', 'end'], 'start')}
  trigger={<button>trigger</button>}
>
  <MenuGroup>
    <MenuItem
      description="cloud.mongodb.com"
      disabled={boolean('disabled', false)}
    >
      Atlas
    </MenuItem>
    <MenuItem description="university.mongodb.com">University</MenuItem>
    <MenuItem
      description="support.mongodb.com"
      active={boolean('active', true)}
    >
      Cloud Support
    </MenuItem>
  </MenuGroup>
  <MenuItem title="Logout" />
</Menu>
```

**Output HTML**

```html
<button>
  trigger
  <div class="leafygreen-ui-1hyfx7x"></div>
</button>
<div class="leafygreen-ui-1l5xdq6">
  <div class="leafygreen-ui-e4n0rk" role="menu">
    <section
      data-leafygreen-ui="menu-group-section"
      role="menu"
      class="leafygreen-ui-0"
    >
      <div class="leafygreen-ui-ukwa9q leafygreen-ui-1jdnb2e" role="menuitem">
        <span>
          <h4 class="leafygreen-ui-cd8qtr">Atlas</h4>
          <h6 class="leafygreen-ui-1al7n0m">cloud.mongodb.com</h6>
        </span>
      </div>
      <div class="leafygreen-ui-ukwa9q leafygreen-ui-1jdnb2e" role="menuitem">
        <span>
          <h4 class="leafygreen-ui-cd8qtr">University</h4>
          <h6 class="leafygreen-ui-1al7n0m">university.mongodb.com</h6>
        </span>
      </div>
      <div
        class="leafygreen-ui-ukwa9q leafygreen-ui-1jdnb2e leafygreen-ui-16ht5zo"
        role="menuitem"
      >
        <span>
          <h4 class="leafygreen-ui-cd8qtr">Cloud Support</h4>
          <h6 class="leafygreen-ui-1al7n0m">support.mongodb.com</h6>
        </span>
      </div>
    </section>
    <div class="leafygreen-ui-ukwa9q leafygreen-ui-1jdnb2e" role="menuitem">
      <span>
        <h4 class="leafygreen-ui-cd8qtr">Logout</h4>
      </span>
    </div>
  </div>
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

Determines the justification of the `Menu` component (based on the alignment) relative to a reference element or the element's nearest parent

### refEl

**Type:** `node`

**Default:** `null`

Pass a reference to an element that the `Menu` component should be positioned against

### trigger

**Type:** `HTMLElement` or `ReactNode`

An `HTMLElement` or `ReactNode` against which the Menu will be positioned. If this prop is present, the Menu's state will be managed internally.

### usePortal

**Type:** `boolean`

**Default:** `true`

Will position Menu's children relative to its parent without using a Portal if `usePortal` is set to false. NOTE: The parent element should be CSS position relative, fixed, or absolute if using this option.

#### Any other properties will be spread on the Menu `div` container

# MenuGroup

## Properties

### children

**Type:** `node`

**Default:** `null`

Children that will be rendered inside this group of `MenuItem` components

### className

**Type:** `string`

**Default:** ``

Style to be applied to the `MenuGroup` component

#### Any other properties will be spread on the MenuGroup `section` container

# MenuItem

## Properties

### href

**Type:** `string`

**Default:** ``

If supplied, will render the `MenuItem` inside of an `<a>` tag, rather than a `<span>` tag

### children

**Type:** `node`

**Default:** `null`

Main content to appear inside of `MenuItem` component

### className

**Type:** `string`

**Default:** ``

Classname applied to `li` element

### onClick

**Type:** `function`

**Default:** `() => {}`

Function that will be called when a `MenuItem` is clicked

### active

**Type:** `boolean`

**Default:** `false`

Determines if the MenuItem is `active`

### disabled

**Type:** `boolean`

**Default:** `false`

Determines if the MenuItem is `disabled`

### description

**Type:** `string`

**Default:** ``

Description text that will appear below the main content of `MenuItem`

#### Any other properties will be spread on the MenuItem `div` container

## Advanced Use Case

## Example

```js
<Menu
  align="bottom"
  justify="start"
  trigger={({ onClick, children }) => (
    <button onClick={onClick}>
      Example Trigger
      {children}
    </button>
  )}
>
  <MenuGroup>
    <MenuItem>Menu Item 1</MenuItem>
    <MenuItem>Menu Item 2</MenuItem>
  </MenuGroup>
  <MenuItem>Menu Item 3</MenuItem>
</Menu>
```

## Output HTML

```html
<button>
  Example Trigger
  <div class="leafygreen-ui-1hyfx7x"></div>
</button>
<div class="leafygreen-ui-1xkqkbo">
  <div class="leafygreen-ui-3aunlx" role="menu">
    <section data-leafygreen-ui="menu-group-section">
      <div class="leafygreen-ui-1hjnbck" role="menuitem">
        <span>
          <h4 class="leafygreen-ui-18xtbxy">Menu Item 1</h4>
        </span>
      </div>
      <div class="leafygreen-ui-1hjnbck" role="menuitem">
        <span>
          <h4 class="leafygreen-ui-18xtbxy">Menu Item 2</h4>
        </span>
      </div>
    </section>
    <div class="leafygreen-ui-1hjnbck" role="menuitem">
      <span>
        <h4 class="leafygreen-ui-18xtbxy">Menu Item 3</h4>
      </span>
    </div>
  </div>
</div>
```

### trigger

**Type:** `function` or `ReactNode`

The trigger prop can also support being passed a function. To work as expected, the function must accept an argument of `children`, which should be rendered inside of the function passed to trigger.
