# Tabs

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/tabs.svg)

## Example

```js
import { Tabs, Tab } from '@leafygreen-ui/tabs';

<Tabs>
  <Tab default value="test1" title="Title 1">
    Hello 1
  </Tab>
  <Tab value="test2" title="Title 2">
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
  <div class="leafygreen-ui-ohrh5k" role="tablist">
    <button
      class="leafygreen-ui-oy1280"
      role="tab"
      data-tab-id="test1"
      aria-controls="tab-0"
      aria-selected="true"
      tabindex="0"
    >
      Title 1
    </button>
    <button
      class="leafygreen-ui-1i13m9b"
      role="tab"
      data-tab-id="test2"
      aria-controls="tab-1"
      aria-disabled="true"
      tabindex="-1"
    >
      Title 2
    </button>
    <button
      class="leafygreen-ui-1xd1z7d"
      role="tab"
      data-tab-id="test3"
      aria-controls="tab-2"
      tabindex="-1"
    >
      Title 3
    </button>
  </div>
  <div class="leafygreen-ui-1k5h8zu">
    <div class="leafygreen-ui-p15qvm"></div>
  </div>
  <div
    aria-disabled="false"
    aria-selected="true"
    aria-controls="tab-0"
    data-tab-id="test1"
    role="tabpanel"
  >
    Hello 1
  </div>
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

### as

**Type:** `HTML Tag` or `React Element`

**Default:** `button`

Determines the root element. For example, `Link` or `a` tags can be supplied to replace `button` from being the element that wraps the component.

### Any other properties supplied will be spread on the root element.

# Tab

## Properties

### value

**Type:** required, can be a `string` or an `number`

Every `Tab` needs a value prop

### title

**Type:** required, `string`

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

### children

**Type:** `node`

**Default:** `null`
Content that appears inside the `Tab` component

### Any other properties supplied will be spread on the root element.
