# Collapsible Side Nav

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/collapsible-side-nav.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/collapsible-side-nav--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/collapsible-side-nav
```

### NPM

```shell
npm install @leafygreen-ui/collapsible-side-nav
```

## Example

```js
import {
  GlyphVisibility,
  SideNav,
  SideNavItem,
  SideNavGroup,
} from '@leafygreen-ui/collapsible-side-nav';

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
        <title id="ChevronLeft-43">Chevron Left Icon</title>
        <g
          id="ChevronLeft-Copy"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <path
            d="M7.16396103,3.51396103 L14.163961,3.51396103 L14.163961,5.51396103 L7.16396103,5.51396103 L7.16396103,12.513961 L5.16396103,12.513961 L5.16396103,3.51396103 L7.16396103,3.51396103 Z"
            id="Combined-Shape"
            fill="currentColor"
            transform="translate(9.663961, 8.013961) rotate(-45.000000) translate(-9.663961, -8.013961) "
          ></path>
        </g></svg
      ><svg
        class="leafygreen-ui-16xqsmu"
        height="16"
        width="16"
        viewBox="0 0 16 16"
        role="img"
        aria-labelledby="ChevronRight-43"
      >
        <title id="ChevronRight-43">Chevron Right Icon</title>
        <desc>Created with Sketch.</desc>
        <g
          id="ChevronRight-Copy"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <path
            d="M3.86396103,3.51396103 L10.863961,3.51396103 L10.863961,5.51396103 L3.86396103,5.51396103 L3.86396103,12.513961 L1.86396103,12.513961 L1.86396103,3.51396103 L3.86396103,3.51396103 Z"
            id="Combined-Shape"
            fill="currentColor"
            transform="translate(6.363961, 8.013961) rotate(135.000000) translate(-6.363961, -8.013961) "
          ></path>
        </g>
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
        <title id="Apps-11">Apps Icon</title>
        <rect x="3" y="3" width="4" height="4" fill="currentColor"></rect>
        <rect x="3" y="9" width="4" height="4" fill="currentColor"></rect>
        <rect x="9" y="3" width="4" height="4" fill="currentColor"></rect>
        <rect x="9" y="9" width="4" height="4" fill="currentColor"></rect></svg
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
            <title id="Cloud-11">Cloud Icon</title>
            <g
              id="Cloud-Copy"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <path
                d="M14.25,6.1953125 C15.3203125,6.921875 16,8.1484375 16,9.5 C16,11.703125 14.203125,13.5 12,13.5 L3.890625,13.5 L3.78125,13.484375 C1.625,13.25 0,11.421875 0,9.25 C0,7.40625 1.1796875,5.8359375 2.8203125,5.25 C3.53125,3.3515625 5.359375,2 7.5,2 C9.109375,2 10.59375,2.7890625 11.5234375,4.0390625 C12.765625,4.2265625 13.796875,5.0625 14.25,6.1953125 Z M12,11.5 C13.1015625,11.5 14,10.6015625 14,9.5 C14,8.5703125 13.359375,7.7890625 12.4921875,7.5703125 C12.4921875,7.546875 12.5,7.5234375 12.5,7.5 C12.5,6.671875 11.828125,6 11,6 C10.890625,6 10.78125,6.015625 10.6796875,6.0390625 L10.6640625,6.0390625 C10.5625,6.0625 10.46875,6.1015625 10.375,6.140625 C9.859375,6.375 9.5,6.8984375 9.5,7.5 L8.5,7.5 C8.5,6.5078125 9.0859375,5.6484375 9.9296875,5.25 C9.390625,4.4921875 8.5,4 7.5,4 C5.84375,4 4.5,5.34375 4.5,7 L4.5,7.0234375 C4.4140625,7.015625 4.3359375,7 4.25,7 C3.0078125,7 2,8.0078125 2,9.25 C2,10.40625 2.875,11.375 4,11.5 L12,11.5 Z"
                id="\uE204"
                fill="currentColor"
              ></path>
            </g>
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
            <title id="Laptop-11">Laptop Icon</title>
            <g
              id="Laptop-Copy"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <path
                d="M14,4 L14,11 L2,11 L2,4 C2,2.8984375 2.8984375,2 4,2 L12,2 C13.1015625,2 14,2.8984375 14,4 Z M12,9 L12,4 L4,4 L4,9 L12,9 Z M0,12 L16,12 L16,13 C16,13.5546875 15.5546875,14 15,14 L1,14 C0.4453125,14 0,13.5546875 0,13 L0,12 Z"
                id="\uE206"
                fill="currentColor"
              ></path>
            </g>
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
            <title id="Settings-21">Settings Icon</title>
            <g
              id="Settings-Copy"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <path
                d="M15.5,8.5 L13.8515625,9.328125 L13.734375,9.78125 L14.7421875,11.3203125 L14.2421875,12.1796875 L12.3984375,12.0703125 C12.296875,12.1875 12.1875,12.296875 12.0703125,12.3984375 L12.1796875,14.2421875 L11.3203125,14.7421875 L9.78125,13.734375 L9.328125,13.8515625 L8.5,15.5 L7.5,15.5 L6.671875,13.8515625 L6.21875,13.734375 L4.6796875,14.7421875 L3.8203125,14.2421875 L3.9296875,12.3984375 C3.8125,12.296875 3.703125,12.1875 3.6015625,12.0703125 L1.7578125,12.1796875 L1.2578125,11.3203125 L2.265625,9.78125 L2.1484375,9.328125 L0.5,8.5 L0.5,7.5 L2.1484375,6.671875 L2.265625,6.21875 L1.2578125,4.6796875 L1.7578125,3.8203125 L3.6015625,3.9296875 C3.703125,3.8125 3.8125,3.703125 3.9296875,3.6015625 L3.8203125,1.7578125 L4.6796875,1.2578125 L6.21875,2.265625 L6.671875,2.1484375 L7.5,0.5 L8.5,0.5 L9.328125,2.1484375 L9.78125,2.265625 L11.3203125,1.2578125 L12.1796875,1.7578125 L12.0703125,3.6015625 C12.1875,3.703125 12.296875,3.8125 12.3984375,3.9296875 L14.2421875,3.8203125 L14.7421875,4.6796875 L13.734375,6.21875 L13.8515625,6.671875 L15.5,7.5 L15.5,8.5 Z M8,3.5 C7.359375,3.5 6.75,3.6328125 6.1953125,3.8828125 L7.2109375,5.640625 C7.4609375,5.5546875 7.7265625,5.5 8,5.5 C8.2734375,5.5 8.5390625,5.5546875 8.7890625,5.640625 L9.8046875,3.8828125 C9.25,3.6328125 8.640625,3.5 8,3.5 Z M5.3359375,4.3828125 C4.3515625,5.109375 3.671875,6.2265625 3.53125,7.5 L5.546875,7.5 C5.65625,6.9609375 5.953125,6.4921875 6.34375,6.140625 L5.3359375,4.3828125 Z M10.453125,7.5 L12.46875,7.5 C12.328125,6.2265625 11.6484375,5.109375 10.6640625,4.3828125 L9.65625,6.140625 C10.046875,6.4921875 10.34375,6.9609375 10.453125,7.5 Z M9,8 C9,7.4453125 8.5546875,7 8,7 C7.4453125,7 7,7.4453125 7,8 C7,8.5546875 7.4453125,9 8,9 C8.5546875,9 9,8.5546875 9,8 Z M3.53125,8.5 C3.671875,9.7734375 4.3515625,10.890625 5.3359375,11.6171875 L6.34375,9.859375 C5.953125,9.5078125 5.65625,9.0390625 5.546875,8.5 L3.53125,8.5 Z M10.6640625,11.6171875 C11.6484375,10.890625 12.328125,9.7734375 12.46875,8.5 L10.453125,8.5 C10.34375,9.0390625 10.046875,9.5078125 9.65625,9.859375 L10.6640625,11.6171875 Z M8,12.5 C8.640625,12.5 9.25,12.359375 9.8046875,12.1171875 L8.7890625,10.359375 C8.5390625,10.4453125 8.2734375,10.5 8,10.5 C7.7265625,10.5 7.4609375,10.4453125 7.2109375,10.359375 L6.1953125,12.1171875 C6.75,12.359375 7.359375,12.5 8,12.5 Z"
                id="\uE313"
                fill="currentColor"
              ></path>
            </g>
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
            <title id="Support-11">Support Icon</title>
            <g
              id="Support-Copy"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <path
                d="M8,0 C10.8984375,0 13,2.1015625 13,5 L13,11 L11,11 L11,5 C11,3.0703125 9.65625,2 8,2 C6.34375,2 5,3.0703125 5,5 L5,11 L3,11 L3,5 C3,2.1015625 5.1015625,0 8,0 Z M0,8 C0,6.34375 0.34375,5 2,5 L2,11 C0.34375,11 0,9.65625 0,8 Z M14,5 C15.65625,5 16,6.34375 16,8 C16,9.65625 15.65625,11 14,11 L14,5 Z M2,13.7890625 L2,11 L3,11 L3,13.2109375 L5,14.3515625 L5,14 L7,14 L7,16 L5,16 L5,15.5078125 L2,13.7890625 Z"
                id="\uE210"
                fill="currentColor"
              ></path>
            </g>
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

| Prop        | Type                 | Description                                      | Default |
| ----------- | -------------------- | ------------------------------------------------ | ------- |
| `className` | `string`             | The className applied to the outermost element.  |
| `glyph`     | `React.ReactElement` | The icon to display in the group's header.       |
| `label`     | `string`             | The label text to display in the group's header. |

# SideNavItem

| Prop              | Type                                                   | Description                                                                                                                                | Default            |
| ----------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `className`       | `string`                                               | The className applied to the outermost element.                                                                                            |
| `glyph`           | `React.ReactElement`                                   | The icon to display for the item.                                                                                                          |
| `glyphVisibility` | `'visible'` \| `'only-collapsed'` \| `'only-expanded'` | Value which indicates when the glyph should be visible.                                                                                    | `'only-collapsed'` |
| `href`            | `string`                                               | The link that the anchor tag will navigate to.                                                                                             |
| `path`            | `string`                                               | Renders the item as active when it corresponds to the `currentPath` prop of the containing `SideNav`.                                      |
| `onClick`         | `function`                                             | Callback that is executed when the item is clicked which, for example, can be used to set the `currentPath` to be passed to the `SideNav`. |
