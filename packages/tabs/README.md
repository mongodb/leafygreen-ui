# Tabs

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/tabs.svg)

## Example

```js
import { Tabs, Tab } from '@leafygreen-ui/tabs';

<Tabs>
  <Tab value="test1" title="Title 1">
    Hello 1
  </Tab>
  <Tab default value="test2" title="Title 2">
    Hello 2
  </Tab>
  <Tab value="test3" title="Title 3">
    Hello 3
  </Tab>
</Tabs>;
```

## Output HTML

```html
<div>
  <ul class="leafygreen-ui-1dj4xsu">
    <li class="leafygreen-ui-19hzp2t" data-tab-id="test1">Title 1</li>
    <li class="leafygreen-ui-1ti8pf9" data-tab-id="test2">Title 2</li>
    <li class="leafygreen-ui-19hzp2t" data-tab-id="test3">Title 3</li>
  </ul>
  <div aria-disabled="false" data-tab-id="test2" title="Title 2">Hello 2</div>
</div>
```

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

If property is used, will ensure that component behaves as a controlled component. The value passed here should match the value property of the `Tab` component that should appear active.

### Any other properties supplied will be spread on the root element.

# Tab

as?: React.ElementType<any>;

## Properties

### value

**Type:** required, can be a `string` or an `number`

Every `Tab` needs a value prop

### title

**Type:** `string`

**Default:** ``

String that will appear in the list of `Tabs`.

### className

**Type:** string

**Default:** ``

Adds a className to the root element

### disabled

**Type:** `boolean`

**Default:** `false`

Indicates whether or not the `Tab` can be clicked by a user

### default

**Type:** `boolean`

**Default:** `false`

Should be supplied when using the Uncontrolled `Tabs` component. This determines which tab will be active by default.

### as

**Type:** `HTML Tag` or `React Element`

**Default:** `div`

Determines the root element. For example, `Link` or `a` tags can be supplied to replace `div` from being the DOM element that wraps the component.

### children

**Type:** `node`

**Default:** `null`
Content that appears inside the `Tab` component

### Any other properties supplied will be spread on the root element.
