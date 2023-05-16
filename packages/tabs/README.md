# Tabs

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/tabs.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/tabs/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/tabs
```

### NPM

```shell
npm install @leafygreen-ui/tabs
```

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

## Properties

| Prop           | Type                | Description                                                                                                                                                                                                                                   | Default  |
| -------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `selected`     | `number`            | Sets the selected tab. If selected is undefined, the `<Tabs />` component will behave as an uncontrolled component.                                                                                                                           |          |
| `setSelected`  | `function`          | A callback that receives the index of the tab a user is switching to when clicking, or via keyboard navigation. Usually this is used to set the selected prop to the correct index. The function is only invoked if the selected prop is set. |          |
| `as`           | `React.ElementType` | Sets the root element of all `<Tab />` components in `<Tabs />`. For example, setting as to `Link` will render each tab as a `<Link />` component rather than as a button.                                                                    | `button` |
| `className`    | `string`            | Adds a className to the root element.                                                                                                                                                                                                         |          |
| `children`     | `node`              | `<Tab />` components that will be supplied to `<Tabs />` component.                                                                                                                                                                           |          |
| `darkMode`     | `boolean`           | Determines whether or not the component will appear in DarkMode                                                                                                                                                                               | `false`  |
| `baseFontSize` | `13`, `16`          | Determines `font-size` for Tabs Component                                                                                                                                                                                                     | `13`     |

_Any other properties supplied will be spread on the root element._

# Tab

## Properties

| Prop              | Type                                               | Description                                                                                                               | Default |
| ----------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------- |
| `name` (Required) | `string`, `ReactNode`                              | String that will appear in the list of tabs.                                                                              |         |
| `disabled`        | `boolean`                                          | Indicates whether or not the `<Tab />` can be clicked by a user.                                                          | `false` |
| `default`         | `boolean`                                          | Should be supplied when using the uncontrolled `<Tabs />` component. This determines which tab will be active by default. |         |
| `className`       | `string`                                           | Adds a className to the root element.                                                                                     |         |
| `href`            | `string`                                           | Destination when Tab's `name` in the list should be rendered as an `a` tag.                                               |         |
| `to`              | `string`                                           | Destination when Tab's `name` in the list should be rendered as a `Link` tag.                                             |         |
| `children`        | `node`                                             | Content that appears inside the `<Tab />` component                                                                       |         |
| ...               | native attributes of component passed to `as` prop | Any other props will be spread on the root element                                                                        |         |

## Reference

### Usage with NextJS Link components

Tabs may not render with the correct tags or styles if the NextJS Link component is passed to the `as` prop directly, given how NextJS handles default rendering of the component based on the `href` prop. To work around this, pass the NextJS Link as shown below.

```
import NextLink from 'next/link';

function Linker({ href, children, ...props }) {
  return (
    <NextLink href={href}>
      <a {...props}>
        {children}
      </a>
    </NextLink>
  );
}

<Tabs aria-label="Profile Sections" as={Linker}>
...
</Tabs>
```
