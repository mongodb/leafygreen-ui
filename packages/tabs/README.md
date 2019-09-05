# Tabs

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/tabs.svg)

## Example

```js
import { Tabs, Tab } from '@leafygreen-ui/tabs';

const [selected, setSelected] = useState(0)

<Tabs setSelected={setSelected} selected={selected}>
  <Tab name="Tab One">Tab Content One</Tab>
  <Tab name="Tab Two">Tab Content Two</Tab>
  <Tab name="Tab Three">Tab Content Three</Tab>
</Tabs>
```

## Output HTML

```html
<div>
  <div class="leafygreen-ui-4furr2" role="tablist">
    <button
      class="leafygreen-ui-17lvitv"
      role="tab"
      aria-controls="tab-0"
      aria-selected="true"
      tabindex="0"
    >
      Tab One
    </button>
    <button
      class="leafygreen-ui-6uqhxy"
      role="tab"
      aria-controls="tab-1"
      aria-selected="false"
      tabindex="-1"
    >
      Tab Two
    </button>
    <button
      class="leafygreen-ui-6uqhxy"
      role="tab"
      aria-controls="tab-2"
      aria-selected="false"
      tabindex="-1"
    >
      Tab Three
    </button>
  </div>
  <div class="leafygreen-ui-xh3r7y">
    <div class="leafygreen-ui-11283ir"></div>
  </div>
  <div
    aria-disabled="false"
    aria-selected="true"
    aria-controls="tab-0"
    role="tabpanel"
  >
    Tab Content One
  </div>
</div>
```

# Tabs

## Properties

### className

**Type:** `string`

Adds a className to the root element.

### setSelected

**Type:** `function`

A callback that receives the index of the tab a user is switching to when clicking, or via keyboard navigation. Usually this is used to set the selected prop to the correct index. The function is only invoked if the selected prop is set.

### selected

**Type:** `number`

Sets the selected tab. If selected is undefined, the <Tabs> component will behave as an uncontrolled component.

### children

**Type:** `node`

`Tab` components that will be supplied to `Tabs` component.

### as

**Type:** `HTML Tag` or `React Element`

**Default:** `button`

Sets the root element of all `Tab` components in `Tabs`. For example, setting as to `Link` will render each tab as a <Link> component rather than as a button.

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
