# SSOMenu

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/sso-menu.svg)

## Example

<!-- will update once we have component finalized  -->

## Output HTML

<!-- will update once we have component finalized  -->

## Properties

### user: { name, email }

**Type:** `object`

**Default:** {}

Object that contains information about the active user. {name: 'string', email: 'string'}

### activeProduct

**Type:** `['atlas', 'university', 'support']`

MongoDB product that is currently active.

### onProductChange

**Type:** `function`

**Default:** `() => {}`

Callback invoked when user switches products.

### onLogout

**Type:** `function`

**Default:** `() => {}`

Callback invoked when user logs out.
