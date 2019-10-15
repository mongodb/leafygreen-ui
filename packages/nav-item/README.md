# NavItem

## Properties

### href

**Type:** `string`

**Default:** ``

If supplied, will render the `NavItem` inside of an `<a>` tag, rather than a `<span>` tag

### children

**Type:** `node`

**Default:** `null`

Main content to appear inside of `NavItem` component

### className

**Type:** `string`

**Default:** ``

Classname applied to root element

### onClick

**Type:** `function`

**Default:** `() => {}`

Function that will be called when a `NavItem` is clicked

### active

**Type:** `boolean`

**Default:** `false`

Determines if the NavItem is `active`

### disabled

**Type:** `boolean`

**Default:** `false`

Determines if the NavItem is `disabled`

### description

**Type:** `string`

**Default:** ``

Description text that will appear below the main content of `NavItem`

#### Any other properties will be spread on the NavItem container
