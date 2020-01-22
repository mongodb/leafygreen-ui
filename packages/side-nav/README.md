# Side Nav

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/side-nav.svg)

## Example

```js
import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/sideNav';

<SideNav>
  <SideNavGroup headerText="Simple States">
    <SideNavItem href="#clusters" active>
      Active State
    </SideNavItem>
    <SideNavItem href="#dataLake" disabled>
      Disabled State
    </SideNavItem>
  </SideNavGroup>
  <SideNavGroup headerText="Other Usages">
    <SideNavItem href="#databaseAccess">Content with a link</SideNavItem>
    <SideNavItem>Content without a link renders as a button</SideNavItem>
    <SideNavItem href="#networkAccess"
      description="This leverages MenuItem's description">Content with a Description</SideNavItem>
    <SideNavItem>
      <div>This can contain any content</div>
      <input type="text" value="even inputs" disabled>
    </SideNavItem>
  </SideNavGroup>
</SideNav>
```

**Output HTML**

```html
<nav aria-label="side-nav" class="leafygreen-ui-1inivuc">
  <ul class="leafygreen-ui-bdnco">
    <li>
      <div class="leafygreen-ui-4vsth9" role="heading">Simple States</div>
      <ul class="leafygreen-ui-bdnco">
        <li role="none">
          <a
            target="_self"
            rel=""
            href="#clusters"
            titletextclassname="leafygreen-ui-1ja8vjy"
            aria-current="page"
            data-leafygreen-ui="menu-item-container"
            class="leafygreen-ui-kxq8r5"
            role="menuitem"
            aria-disabled="false"
          >
            <div class="leafygreen-ui-14a8fex">Active State</div>
          </a>
        </li>
        <li role="none">
          <a
            target="_self"
            rel=""
            href="#dataLake"
            titletextclassname="leafygreen-ui-1ja8vjy"
            data-leafygreen-ui="menu-item-container"
            class="leafygreen-ui-ogq1tn"
            role="menuitem"
            aria-disabled="true"
            tabindex="-1"
          >
            <div class="leafygreen-ui-10xqyru">Disabled State</div>
          </a>
        </li>
      </ul>
    </li>
    <li>
      <div class="leafygreen-ui-4vsth9" role="heading">Other Usages</div>
      <ul class="leafygreen-ui-bdnco">
        <li role="none">
          <a
            target="_self"
            rel=""
            href="#databaseAccess"
            titletextclassname="leafygreen-ui-1ja8vjy"
            data-leafygreen-ui="menu-item-container"
            class="leafygreen-ui-n21tgd"
            role="menuitem"
            aria-disabled="false"
          >
            <div class="leafygreen-ui-r0sqyc">Content with a link</div>
          </a>
        </li>
        <li role="none">
          <button
            titletextclassname="leafygreen-ui-1ja8vjy"
            data-leafygreen-ui="menu-item-container"
            class="leafygreen-ui-n21tgd"
            role="menuitem"
            aria-disabled="false"
          >
            <div class="leafygreen-ui-r0sqyc">
              Content without a link renders as a button
            </div>
          </button>
        </li>
        <li role="none">
          <a
            target="_self"
            rel=""
            href="#networkAccess"
            titletextclassname="leafygreen-ui-1ja8vjy"
            data-leafygreen-ui="menu-item-container"
            class="leafygreen-ui-n21tgd"
            role="menuitem"
            aria-disabled="false"
          >
            <div class="leafygreen-ui-r0sqyc">Content with a Description</div>
            <div class="leafygreen-ui-1dm36mc">
              This leverages MenuItem's description
            </div>
          </a>
        </li>
        <li role="none">
          <button
            titletextclassname="leafygreen-ui-1ja8vjy"
            data-leafygreen-ui="menu-item-container"
            class="leafygreen-ui-n21tgd"
            role="menuitem"
            aria-disabled="false"
          >
            <div class="leafygreen-ui-r0sqyc">
              <div>This can contain any content</div>
              <input type="text" disabled="" value="even inputs" />
            </div>
          </button>
        </li>
      </ul>
    </li>
  </ul>
</nav>
```

## Properties

| Prop        | Type     | Description | Default    |
| ----------- | -------- | ----------- | ---------- |
| `className` | `string` |             |            |
| `children`  | `node`   |             | (required) |

_Any other properties will be spread on the SideNav `nav` container_

# Side Nav Group

## Properties

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |


|
| `className` | `string` | | |
| `headerText` | `string` | | |
| `headerClassName` | `string` | | |
| `children` | `node` | | (required) |

_Any other properties will be spread on the SideNavGroup `li` container_

# Side Nav Item

## Properties

| Prop          | Type      | Description | Default    |
| ------------- | --------- | ----------- | ---------- |
| `active`      | `boolean` |             | `false`    |
| `disabled`    | `boolean` |             | `false`    |
| `href`        | `string`  |             |            |
| `description` | `string`  |             |            |
| `className`   | `string`  |             |            |
| `children`    | `node`    |             | (required) |

_Side Nav Item wraps @leafygreen-ui/menu's Menu Item._
_All properties provided above will be set on the Menu Item itself._
_Any other properties will be spread on the Menu Item's `div` container_
