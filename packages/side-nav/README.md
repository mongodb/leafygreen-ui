# Side Nav

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/side-nav.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/side-nav/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/side-nav
```

### Yarn

```shell
yarn add @leafygreen-ui/side-nav
```

### NPM

```shell
npm install @leafygreen-ui/side-nav
```

## Peer Dependencies

| Package                              | Version  |
| ------------------------------------ | -------- |
| `@leafygreen-ui/leafygreen-provider` | `^1.1.0` |

## Example

```js
import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';

return (
  <SideNav
    widthOverride={300}
    className={css`
      height: 100vh; // sets height of SideNav
    `}
  >
    <SideNavItem>Overview</SideNavItem>
    <SideNavItem>Introduction</SideNavItem>
    <SideNavItem>
      Android SDK
      <SideNavItem>Install MongoDB Community Edition</SideNavItem>
      <SideNavGroup
        header="Fundamentals"
        collapsible
        glyph={<Icon glyph="Building" />}
      >
        <SideNavItem active>
          Upgrade MongoDB Community to MongoDB Enterprise
        </SideNavItem>
        <SideNavItem>Verify Integrity of MongoDB Packages</SideNavItem>
        <SideNavGroup header="Preferences">
          <SideNavItem>Privacy</SideNavItem>
          <SideNavItem>Security</SideNavItem>
        </SideNavGroup>
      </SideNavGroup>
    </SideNavItem>
  </SideNav>
);
```

## Properties

| Prop            | Type                                            | Description                                                                     | Default     |
| --------------- | ----------------------------------------------- | ------------------------------------------------------------------------------- | ----------- |
| `className`     | `string`                                        | Class name that will be applied to the root-level element.                      | `undefined` |
| `children`      | `node`                                          | Content that will be rendered inside the root-level element.                    | `undefined` |
| `baseFontSize`  | `14`, `16`                                      | Determines the base font size (in pixels) of the Side Nav                       | `14`        |
| `widthOverride` | `number`                                        | Width (in pixels) of Side Navigation.                                           | `184`       |
| `collapsed`     | `boolean`                                       | Allows consuming applications to control the collapsed state of the navigation. |             |
| `setCollapsed`  | `React.Dispatch<React.SetStateAction<boolean>>` | Consuming application's collapsed-state management controller                   | `() => {}`  |

_Any other properties will be spread on the root-level element._

# SideNavGroup

## Properties

| Prop               | Type              | Description                                                                                                                                                                                                                                                                                | Default     |
| ------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `className`        | `string`          | Class name that will be applied to the root-level element.                                                                                                                                                                                                                                 | `undefined` |
| `header`           | `string`, `node`  | Content that will be rendered as the component's header.<br />If a string is provided, it will be rendered with default styling as a header tag.                                                                                                                                           | `undefined` |
| `children`         | `node`            | Content that will be rendered inside the root-level element.                                                                                                                                                                                                                               | `undefined` |
| `collapsible`      | `boolean`         | Determines whether or not the Group is collapsible                                                                                                                                                                                                                                         | `false`     |
| `initialCollapsed` | `boolean`         | Determines whether or not the SideNavGroup should be collapsed on the first render.                                                                                                                                                                                                        | `true`      |
| `hasActiveItem`    | `boolean`         | Manually overrides automatic detection of whether a group contains an active item.                                                                                                                                                                                                         |             |
| `glyph`            | `React.ReactNode` | Sets an optional glyph to be rendered with the group header. **Note: This prop expects either a LeafyGreen `Icon` component, or a component created with the `createIconComponent()` function from the `@leafygreen-ui/icon` package, and may not render other React nodes passed to it.** |             |

_Any other properties will be spread on the root-level element._

# SideNavItem

## Properties

| Prop               | Type                                               | Description                                                                                                                                                                                                                                                                              | Default     |
| ------------------ | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `active`           | `boolean`                                          | Whether or not the component should be rendered in an active state.                                                                                                                                                                                                                      | `false`     |
| `disabled`         | `boolean`                                          | Whether or not the component should be rendered in a disabled state.                                                                                                                                                                                                                     | `false`     |
| `ariaCurrentValue` | `enum`                                             | The aria-current attribute value set when the component is active. See the [WAI-ARIA 1.1 spec](https://www.w3.org/TR/wai-aria-1.1/#aria-current 'WAI-ARIA 1.1 Spec') for a list of accepted values.                                                                                      | `'page'`    |
| `className`        | `string`                                           | Class name that will be applied to the component's header.                                                                                                                                                                                                                               | `undefined` |
| `children`         | `node`                                             | Content that will be rendered inside the root-level element.                                                                                                                                                                                                                             | `undefined` |
| `href`             | `string`                                           | When provided, the component will be rendered as an anchor element.                                                                                                                                                                                                                      | `undefined` |
| `onClick`          | `function`                                         | The event handler function for the 'onclick' event. Receives the associated `event` object as the first argument.                                                                                                                                                                        |             |
| `as`               | `React.ElementType`                                | When provided, the component will be rendered as the component or html tag indicated by this prop. Other additional props will be spread on the anchor element. For example, `Link` or `a` tags can be supplied to replace `button` from being the DOM element that wraps the component. | `undefined` |
| `indentLevel`      | `Number`                                           | Changes the indentation. Will not work if `<SideNavItem>` is a child of `<SideNavGroup>`.                                                                                                                                                                                                | `1`         |
| ...                | native attributes of component passed to `as` prop | Any other props will be spread on the root element                                                                                                                                                                                                                                       |             |

# CollapsedSideNavItem

Displays the passed React node within the collapsed state of the navigation.

## Properties

| Prop        | Type      | Description                                                         | Default |
| ----------- | --------- | ------------------------------------------------------------------- | ------- |
| `active`    | `boolean` | Whether or not the component should be rendered in an active state. | `false` |
| `className` | `string`  | Class name that will be applied to the component's header.          |         |
| `children`  | `node`    | Content that will be rendered inside the collapsed navigation.      |         |
