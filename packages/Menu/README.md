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
      title="Atlas"
      description="cloud.mongodb.com"
      disabled={boolean('disabled', false)}
    />
    <MenuItem title="University" description="university.mongodb.com" />
    <MenuItem
      title="Cloud Support"
      description="support.mongodb.com"
      active={boolean('active', true)}
    />
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
          <p class="leafygreen-ui-cd8qtr">Atlas</p>
          <p class="leafygreen-ui-1al7n0m">cloud.mongodb.com</p>
        </span>
      </div>
      <div class="leafygreen-ui-ukwa9q leafygreen-ui-1jdnb2e" role="menuitem">
        <span>
          <p class="leafygreen-ui-cd8qtr">University</p>
          <p class="leafygreen-ui-1al7n0m">university.mongodb.com</p>
        </span>
      </div>
      <div
        class="leafygreen-ui-ukwa9q leafygreen-ui-1jdnb2e leafygreen-ui-16ht5zo"
        role="menuitem"
      >
        <span>
          <p class="leafygreen-ui-cd8qtr">Cloud Support</p>
          <p class="leafygreen-ui-1al7n0m">support.mongodb.com</p>
        </span>
      </div>
    </section>
    <div class="leafygreen-ui-ukwa9q leafygreen-ui-1jdnb2e" role="menuitem">
      <span>
        <p class="leafygreen-ui-cd8qtr">Logout</p>
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

Determines the justification of the `Menu` component (based on the alignment) relative to ar eference element or the element's nearest parent

### refEl

**Type:** `node`

**Default:** `null`

Pass a reference to an element that the `Menu` component should be positioned against

### usePortal

**Type:** `boolean`

**Default:** `true`

Will position Menu's children relative to its parent without using a Portal, if `usePortal` is set to false. NOTE: The parent element should be CSS position relative, fixed, or absolute if using this option.

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

### description

**Type:** `string`

**Default:** ``

Description text that will appear main content of `MenuItem`
