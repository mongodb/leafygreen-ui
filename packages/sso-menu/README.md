# SSOMenu

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/sso-menu.svg)

## Example

<!-- will update once we have componenet finalized  -->

## Output HTML

<!-- will update once we have componenet finalized  -->

## Properties

### userInfo: { name, email }

**Type:** `object`

**Default:** {}

Object that contains information about the active user. {name: 'string', email: 'string'}

### activeProduct

**Type:** `['atlas', 'university', 'support']`

**Default:** `''`

MongoDB product that is currently active

### onAccountClick

**Type:** `function`

**Default:** `() => {}`

Callback invoked when user views their MDB account.

### onProductChange

**Type:** `function`

**Default:** `() => {}`

Callback invoked when user switches products.

### onLogout

**Type:** `function`

**Default:** `() => {}`

Callback invoked when user logs out.
