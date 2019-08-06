# Tabs

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/tabs.svg)

## Example

<!-- Will update once the component is finalized -->

## Output HTML

<!-- Will update once the comcponetn is finalized -->

# Tabs

## Properties

### className

**Type:** `string`

**Default:** ''

Adds a className to the root element.

### onChange

**Type:** `function`

**Default:** `() => {}`

The event handler function for the 'onChange' event. Receives the associated event object as the first argument.

### children

**Type:** `node`

**Default:** `null`

`Tab` components that will be supplied to `Tabs` component.

### selected

**Type:** `string`

**Default:** ``

If property is used, component will behave as a controlled component. The value passed here should match the value property of the `Tab` component that should appear active.

### as

**Type:** `HTML Tag` or `React Element`

**Default:** `button`

Determines the root element. For example, `Link` or `a` tags can be supplied to replace `button` from being the element that wraps the components in the Tab List.

### Any other properties supplied will be spread on the root element.

# Tab

## Properties

### value

**Type:** required, can be a `string` or an `number`

Every `Tab` needs a value prop.

### tabTitle

**Type:** required, `string`

**Default:** ``

String that will appear in the list of `Tabs`.

### className

**Type:** string

**Default:** ``

Adds a className to the root element.

### disabled

**Type:** `boolean`

**Default:** `false`

Indicates whether or not the `Tab` can be clicked by a user.

### default

**Type:** `boolean`

**Default:** `false`

Should be supplied when using the Uncontrolled `Tabs` component. This determines which tab will be active by default.

### children

**Type:** `node`

**Default:** `null`

Content that appears inside the `Tab` component

### Any other properties supplied will be spread on the root element.
