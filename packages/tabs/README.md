# Tabs

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/tabs.svg)

## Example

<!-- Will update once the component is finalized -->

## Output HTML

<!-- Will update once the component is finalized -->

# Tabs

## Properties

### className

**Type:** `string`

Adds a className to the root element.

### setSelected

**Type:** `function`

Function that receives information about newly activated Tab Index as its first argument.

### selected

**Type:** `number`

If selected is set, component will behave as a controlled component. The value passed here should match the index of the `Tab` component to appear active.

### children

**Type:** `node`

`Tab` components that will be supplied to `Tabs` component.

### as

**Type:** `HTML Tag` or `React Element`

**Default:** `button`

Determines the root element for components that comprise the Tab List. For example, `Link` or `a` tags can be supplied to replace `button` from being the element that wraps these components.

### Any other properties supplied will be spread on the root element.

# Tab

## Properties

### name

**Type:** required, `string` | `ReactNode`

String that will appear in the list of `Tabs`.

### className

**Type:** string

Adds a className to the root element.

### disabled

**Type:** `boolean`

**Default:** `false`

Indicates whether or not the `Tab` can be clicked by a user.

### default

**Type:** `boolean`

Should be supplied when using the uncontrolled `Tabs` component. This determines which tab will be active by default.

### children

**Type:** `node`

Content that appears inside the `Tab` component

### href

**Type:** `string`

Destination when TabTitle is rendered as `a` tag.

### to

**Type:** `string`

Destination when TabTitle is rendered as `Link` tag.

### Any other properties supplied will be spread on the root element.
