# Side Nav

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/side-nav.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/side-nav--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/side-nav
```

### NPM

```shell
npm install @leafygreen-ui/side-nav
```

## Example

```js
import {
  GlyphVisibility,
  SideNav,
  SideNavItem,
  SideNavGroup,
} from '@leafygreen-ui/side-nav';

<SideNav>
  <SideNavItem
    glyph={<AppsIcon />}
    glyphVisibility={GlyphVisibility.Visible}
    href="https://www.mongodb.com/realm"
  >
    Realm Apps
  </SideNavItem>
  <SideNavItem glyph={<HomeIcon />}>Investments</SideNavItem>
  <SideNavGroup label="Data Access" glyph={<CloudIcon />}>
    <SideNavItem>Rules</SideNavItem>
    <SideNavItem>Schema</SideNavItem>
    <SideNavItem>App Users</SideNavItem>
    <SideNavItem>Authentication</SideNavItem>
  </SideNavGroup>
  <SideNavGroup label="Build" glyph={<LaptopIcon />}>
    <SideNavItem>SDKs</SideNavItem>
    <SideNavItem>Sync</SideNavItem>
    <SideNavItem>GraphQL</SideNavItem>
    <SideNavItem>Functions</SideNavItem>
    <SideNavItem>Triggers</SideNavItem>
    <SideNavItem>3rd Party Services</SideNavItem>
    <SideNavItem>Values {'&'} Secrets</SideNavItem>
  </SideNavGroup>
  <SideNavGroup label="Manage" glyph={<SettingsIcon />}>
    <SideNavItem>Linked Data Sources</SideNavItem>
    <SideNavItem>Deploy</SideNavItem>
    <SideNavItem>Hosting</SideNavItem>
    <SideNavItem>Logs</SideNavItem>
    <SideNavItem>App Settings</SideNavItem>
    <SideNavItem>Push Notifications</SideNavItem>
  </SideNavGroup>
  <SideNavGroup label="Help" glyph={<SupportIcon />}>
    <SideNavItem>Documentation</SideNavItem>
    <SideNavItem>Feature Requests</SideNavItem>
  </SideNavGroup>
</SideNav>;
```

**Output HTML**

```html
<nav aria-label="side-nav" class="leafygreen-ui-wrjhix">
  <button
    aria-controls="side-nav-11"
    aria-expanded="true"
    aria-describedby="tooltip-69"
    aria-label="Collapse sidebar"
    tabindex="0"
    aria-disabled="false"
    class="leafygreen-ui-1alp393"
  >
    <div class="leafygreen-ui-xhlipt">
      <svg
        class="leafygreen-ui-cw4n9e"
        height="16"
        width="16"
        viewBox="0 0 16 16"
        role="img"
        aria-labelledby="ChevronLeft-43"
      >
        ...</svg
      ><svg
        class="leafygreen-ui-16xqsmu"
        height="16"
        width="16"
        viewBox="0 0 16 16"
        role="img"
        aria-labelledby="ChevronRight-43"
      >
        ...
      </svg>
    </div>
  </button>
  <div class="leafygreen-ui-1orcjpq">
    <a
      aria-label="Realm Apps"
      aria-current="false"
      class="leafygreen-ui-17t5x0n"
      href="https://www.mongodb.com/realm"
      ><svg
        class="leafygreen-ui-13p6dfv"
        height="16"
        width="16"
        viewBox="0 0 16 16"
        role="img"
        aria-labelledby="Apps-11"
      >
        ...</svg
      >Realm Apps</a
    ><a
      aria-label="Investments"
      aria-current="false"
      tabindex="0"
      class="leafygreen-ui-r3tfmb"
      >Investments</a
    >
    <div
      role="group"
      aria-labelledby="side-nav-group-41"
      class="leafygreen-ui-1ka9xum"
    >
      <div
        id="side-nav-group-41"
        aria-hidden="false"
        class="leafygreen-ui-18egciw"
      >
        <div class="leafygreen-ui-a0xhem">
          <svg
            class="leafygreen-ui-13p6dfv"
            height="16"
            width="16"
            viewBox="0 0 16 16"
            role="img"
            aria-labelledby="Cloud-11"
          >
            ...
          </svg>
        </div>
        Data Access
      </div>
      <a
        aria-label="Rules"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >Rules</a
      ><a
        aria-label="Schema"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >Schema</a
      ><a
        aria-label="App Users"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >App Users</a
      ><a
        aria-label="Authentication"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >Authentication</a
      >
    </div>
    <div
      role="group"
      aria-labelledby="side-nav-group-43"
      class="leafygreen-ui-1ka9xum"
    >
      <div
        id="side-nav-group-43"
        aria-hidden="false"
        class="leafygreen-ui-18egciw"
      >
        <div class="leafygreen-ui-a0xhem">
          <svg
            class="leafygreen-ui-13p6dfv"
            height="16"
            width="16"
            viewBox="0 0 16 16"
            role="img"
            aria-labelledby="Laptop-11"
          >
            ...
          </svg>
        </div>
        Build
      </div>
      <a
        aria-label="SDKs"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >SDKs</a
      ><a
        aria-label="Sync"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >Sync</a
      ><a
        aria-label="GraphQL"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >GraphQL</a
      ><a
        aria-label="Functions"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >Functions</a
      ><a
        aria-label="Triggers"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >Triggers</a
      ><a
        aria-label="3rd Party Services"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >3rd Party Services</a
      ><a
        aria-label="Values ,&amp;, Secrets"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >Values &amp; Secrets</a
      >
    </div>
    <div
      role="group"
      aria-labelledby="side-nav-group-45"
      class="leafygreen-ui-1ka9xum"
    >
      <div
        id="side-nav-group-45"
        aria-hidden="false"
        class="leafygreen-ui-18egciw"
      >
        <div class="leafygreen-ui-a0xhem">
          <svg
            class="leafygreen-ui-13p6dfv"
            height="16"
            width="16"
            viewBox="0 0 16 16"
            role="img"
            aria-labelledby="Settings-21"
          >
            ...
          </svg>
        </div>
        Manage
      </div>
      <a
        aria-label="Linked Data Sources"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >Linked Data Sources</a
      ><a
        aria-label="Deploy"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >Deploy</a
      ><a
        aria-label="Hosting"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >Hosting</a
      ><a
        aria-label="Logs"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >Logs</a
      ><a
        aria-label="App Settings"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >App Settings</a
      ><a
        aria-label="Push Notifications"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >Push Notifications</a
      >
    </div>
    <div
      role="group"
      aria-labelledby="side-nav-group-47"
      class="leafygreen-ui-1ka9xum"
    >
      <div
        id="side-nav-group-47"
        aria-hidden="false"
        class="leafygreen-ui-18egciw"
      >
        <div class="leafygreen-ui-a0xhem">
          <svg
            class="leafygreen-ui-13p6dfv"
            height="16"
            width="16"
            viewBox="0 0 16 16"
            role="img"
            aria-labelledby="Support-11"
          >
            ...
          </svg>
        </div>
        Help
      </div>
      <a
        aria-label="Documentation"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >Documentation</a
      ><a
        aria-label="Feature Requests"
        aria-current="false"
        tabindex="0"
        class="leafygreen-ui-j568gn"
        >Feature Requests</a
      >
    </div>
  </div>
</nav>
```

## SideNav Properties

| Prop               | Type                    | Description                                                                                                                           | Default |
| ------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `className`        | `string`                | The className applied to the nav element.                                                                                             |
| `collapsible`      | `boolean`               | Whether the navigation can be collapsed and the collapse button should be displayed.                                                  | `true`  |
| `initialCollapsed` | `boolean`               | Whether the navigation bar should be collapsed when initially rendered.                                                               | `false` |
| `currentPath`      | `string`                | Indicate which `SideNavItem` with the matching `path` prop is currently active. This will typically be the path provided by a router. |
| ...                | native `nav` attributes | Any other props will be spread on the root `nav` element.                                                                             |         |

# SideNavGroup

| Prop               | Type                 | Description                                                                         | Default                      |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------- | ---------------------------- |
| `className`        | `string`             | The className applied to the outermost element.                                     |
| `glyph`            | `React.ReactElement` | The icon to display in the group's header.                                          |
| `label`            | `node`               | The label text to display in the group's header.                                    |
| `aria-label`       | `string`             | Must be provided if `label` is not a `string`.                                      | `label` when it's a `string` |
| `collapsible`      | `boolean`            | Determines whether or not the Group is collapsible                                  | `false`                      |
| `initialCollapsed` | `boolean`            | Determines whether or not the SideNavGroup should be collapsed on the first render. | `true`                       |

# SideNavItem

| Prop              | Type                                                   | Description                                                                                                                                           | Default                         |
| ----------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `as`              | `React.ElementType`                                    | Determines the root element. For example, `Link` or `button` tags can be supplied to replace `a` from being the DOM element that wraps the component. | `a`                             |
| `className`       | `string`                                               | The className applied to the outermost element.                                                                                                       |
| `glyph`           | `React.ReactElement`                                   | The icon to display for the item.                                                                                                                     |
| `glyphVisibility` | `'visible'` \| `'only-collapsed'` \| `'only-expanded'` | Value which indicates when the glyph should be visible. The glyph will never be visible when the nav is collapsed when the item is disabled.          | `'only-collapsed'`              |
| `href`            | `string`                                               | The link that the anchor tag will navigate to.                                                                                                        |
| `path`            | `string`                                               | Renders the item as active when it corresponds to the `currentPath` prop of the containing `SideNav`.                                                 |
| `onSelect`        | `function`                                             | Callback that is executed when the item is selected which, for example, can be used to set the `currentPath` to be passed to the `SideNav`.           |
| `aria-label`      | `string`                                               | Must be provided if `children` is not a `string`.                                                                                                     | `children` when it's a `string` |
| `disabled`        | `boolean`                                              | Whether the item can be selected.                                                                                                                     | `false`                         |
| ...               | native attributes of component passed to as prop       | Any other properties will be spread on the root element                                                                                               |                                 |
