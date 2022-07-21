# Side Nav

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/side-nav.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/side-nav/example/)

## Installation

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
  <SideNav widthOverride={300}>
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

**Output HTML**

```html
<nav id="side-nav-1" class="leafygreen-ui-i56wdo">
  <div class="leafygreen-ui-hwrjab">
    <ul class="leafygreen-ui-qlfd8j">
      <li class="leafygreen-ui-1aih96i">
        <button
          data-leafygreen-ui="side-nav-item-container"
          class="leafygreen-ui-3fnnkm"
          aria-current="false"
          aria-disabled="false"
        >
          Overview
        </button>
      </li>
      <li class="leafygreen-ui-1aih96i">
        <button
          data-leafygreen-ui="side-nav-item-container"
          class="leafygreen-ui-3fnnkm"
          aria-current="false"
          aria-disabled="false"
        >
          Introduction
        </button>
      </li>
      <li class="leafygreen-ui-1aih96i">
        <button
          data-leafygreen-ui="side-nav-item-container"
          class="leafygreen-ui-3fnnkm"
          aria-current="false"
          aria-disabled="false"
        >
          Android SDK
        </button>
        <ul class="leafygreen-ui-jc13hm">
          <li class="leafygreen-ui-1aih96i">
            <button
              data-leafygreen-ui="side-nav-item-container"
              class="leafygreen-ui-63gsd"
              aria-current="false"
              aria-disabled="false"
            >
              Install MongoDB Community Edition
            </button>
          </li>
          <li class="leafygreen-ui-1ihxey3">
            <button
              data-leafygreen-ui="side-nav-group-button"
              aria-controls="menu-3"
              aria-expanded="true"
              class="leafygreen-ui-jh4uem"
              id="menu-group-label-id-3"
              data-testid="side-nav-group-header-label"
            >
              <div class="leafygreen-ui-y6v9s0">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  class="leafygreen-ui-nckpfs"
                  role="presentation"
                  aria-hidden="true"
                  alt=""
                  data-testid="side-nav-group-header-icon"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1 2a1 1 0 011-1h5a1 1 0 011 1v13H6v-2H4v2H1v-4h4.5a.5.5 0 000-1H1V8h4.5a.5.5 0 000-1H1V5h4.5a.5.5 0 000-1H1V2zm8 9h4.5a.5.5 0 000-1H9V8h4.5a.5.5 0 000-1H9V5a1 1 0 011-1h5a1 1 0 011 1v10h-2v-2h-2v2H9v-4z"
                    fill="currentColor"
                  ></path></svg
                ><span>Fundamentals</span>
              </div>
              <svg
                class="leafygreen-ui-rpsdnb"
                height="12"
                width="12"
                role="presentation"
                aria-hidden="true"
                alt=""
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.36396 14.364C5.75449 14.7545 6.38765 14.7545 6.77818 14.364L11.7279 9.41421L12.435 8.70711C12.8256 8.31658 12.8256 7.68342 12.435 7.29289L11.7279 6.58579L6.77817 1.63604C6.38765 1.24552 5.75449 1.24551 5.36396 1.63604L4.65685 2.34315C4.26633 2.73367 4.26633 3.36684 4.65685 3.75736L8.89949 8L4.65685 12.2426C4.26633 12.6332 4.26633 13.2663 4.65686 13.6569L5.36396 14.364Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <div class="leafygreen-ui-4079c1">
              <ul
                id="menu-3"
                aria-labelledby="menu-group-label-id-3"
                class="leafygreen-ui-1yygg05"
              >
                <li class="leafygreen-ui-1aih96i">
                  <button
                    data-leafygreen-ui="side-nav-item-container"
                    class="leafygreen-ui-dtsdkv"
                    aria-current="page"
                    aria-disabled="false"
                  >
                    Upgrade MongoDB Community to MongoDB Enterprise
                  </button>
                </li>
                <li class="leafygreen-ui-1aih96i">
                  <button
                    data-leafygreen-ui="side-nav-item-container"
                    class="leafygreen-ui-lfsxym"
                    aria-current="false"
                    aria-disabled="false"
                  >
                    Verify Integrity of MongoDB Packages
                  </button>
                </li>
                <li class="leafygreen-ui-1ihxey3">
                  <div
                    data-leafygreen-ui="side-nav-group-button"
                    data-testid="side-nav-group-header-label"
                    id="menu-group-label-id-6"
                    class="leafygreen-ui-1xmwsit"
                  >
                    <div class="leafygreen-ui-y6v9s0">
                      <span>Preferences</span>
                    </div>
                  </div>
                  <ul
                    aria-labelledby="menu-group-label-id-6"
                    class="leafygreen-ui-bdnco"
                  >
                    <li class="leafygreen-ui-1aih96i">
                      <button
                        data-leafygreen-ui="side-nav-item-container"
                        class="leafygreen-ui-f08not"
                        aria-current="false"
                        aria-disabled="false"
                      >
                        Privacy
                      </button>
                    </li>
                    <li class="leafygreen-ui-1aih96i">
                      <button
                        data-leafygreen-ui="side-nav-item-container"
                        class="leafygreen-ui-f08not"
                        aria-current="false"
                        aria-disabled="false"
                      >
                        Security
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="leafygreen-ui-rsx6j">
    <ul aria-hidden="true" class="leafygreen-ui-bb1go4">
      <li class="leafygreen-ui-1hvuzjp">
        <svg
          width="16"
          height="16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          class="leafygreen-ui-nckpfs"
          role="presentation"
          aria-hidden="true"
          alt=""
          data-testid="side-nav-group-header-icon"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1 2a1 1 0 011-1h5a1 1 0 011 1v13H6v-2H4v2H1v-4h4.5a.5.5 0 000-1H1V8h4.5a.5.5 0 000-1H1V5h4.5a.5.5 0 000-1H1V2zm8 9h4.5a.5.5 0 000-1H9V8h4.5a.5.5 0 000-1H9V5a1 1 0 011-1h5a1 1 0 011 1v10h-2v-2h-2v2H9v-4z"
            fill="currentColor"
          ></path>
        </svg>
      </li>
    </ul>
  </div>
</nav>
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
| ...                | native attributes of component passed to `as` prop | Any other props will be spread on the root element                                                                                                                                                                                                                                       |             |

# CollapsedSideNavItem

Displays the passed React node within the collapsed state of the navigation.

## Properties

| Prop        | Type      | Description                                                         | Default |
| ----------- | --------- | ------------------------------------------------------------------- | ------- |
| `active`    | `boolean` | Whether or not the component should be rendered in an active state. | `false` |
| `className` | `string`  | Class name that will be applied to the component's header.          |         |
| `children`  | `node`    | Content that will be rendered inside the collapsed navigation.      |         |
