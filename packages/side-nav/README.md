# Side Nav

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/side-nav.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/sidenav--default)

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

const header = (
  <div>
    <strong>Polymorphism</strong>
    <br />
    <small>(content header)</small>
  </div>
);

return (
  <SideNav>
    <SideNavGroup header="States">
      <SideNavItem active>Active State</SideNavItem>
      <SideNavItem disabled>Disabled State</SideNavItem>
    </SideNavGroup>
    <SideNavGroup header={header}>
      <SideNavItem>Default root element (button)</SideNavItem>
      <SideNavItem href="/">Anchor root element</SideNavItem>
      <SideNavItem as="label" htmlFor="docs-input">
        Custom root element (label)
        <input
          id="docs-input"
          type="text"
          value=""
          placeholder="placeholder text"
          disabled
        />
      </SideNavItem>
    </SideNavGroup>
  </SideNav>
);
```

**Output HTML**

```html
<nav class="leafygreen-ui-1inivuc" aria-label="side-nav">
  <ul class="leafygreen-ui-bdnco">
    <li>
      <h4 class="leafygreen-ui-19w7vet">States</h4>
      <ul role="menu" class="leafygreen-ui-bdnco">
        <li role="none">
          <button
            data-leafygreen-ui="side-nav-item-container"
            class="leafygreen-ui-d18uaj"
            role="menuitem"
            aria-current="page"
            aria-disabled="false"
          >
            <div class="leafygreen-ui-1mikaeo">Active State</div>
          </button>
        </li>
        <li role="none">
          <button
            data-leafygreen-ui="side-nav-item-container"
            class="leafygreen-ui-g84goy"
            role="menuitem"
            aria-current="false"
            aria-disabled="true"
            tabindex="-1"
          >
            <div class="leafygreen-ui-18g544y">Disabled State</div>
          </button>
        </li>
      </ul>
    </li>
    <li>
      <div>
        <strong>Polymorphism</strong><br />
        <small>(content header)</small>
      </div>
      <ul role="menu" class="leafygreen-ui-bdnco">
        <li role="none">
          <button
            data-leafygreen-ui="side-nav-item-container"
            class="leafygreen-ui-1b8asku"
            role="menuitem"
            aria-current="false"
            aria-disabled="false"
          >
            <div class="leafygreen-ui-f3d0a6">
              Default root element (button)
            </div>
          </button>
        </li>
        <li role="none">
          <a
            href="/"
            data-leafygreen-ui="side-nav-item-container"
            class="leafygreen-ui-1b8asku"
            role="menuitem"
            aria-current="false"
            aria-disabled="false"
          >
            <div class="leafygreen-ui-f3d0a6">Anchor root element</div>
          </a>
        </li>
        <li role="none">
          <label
            for="docs-input"
            data-leafygreen-ui="side-nav-item-container"
            class="leafygreen-ui-1b8asku"
            role="menuitem"
            aria-current="false"
            aria-disabled="false"
          >
            <div class="leafygreen-ui-f3d0a6">
              Custom root element (label)
              <input
                id="docs-input"
                type="text"
                placeholder="placeholder text"
                disabled=""
                value=""
              />
            </div>
          </label>
        </li>
      </ul>
    </li>
  </ul>
</nav>
```

## Properties

| Prop        | Type     | Description                                                  | Default     |
| ----------- | -------- | ------------------------------------------------------------ | ----------- |
| `className` | `string` | Class name that will be applied to the root-level element.   | `undefined` |
| `children`  | `node`   | Content that will be rendered inside the root-level element. | `undefined` |

_Any other properties will be spread on the root-level element._

# Side Nav Group

## Properties

| Prop               | Type                    | Description                                                                                                                                      | Default     |
| ------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `className`        | `string`                | Class name that will be applied to the root-level element.                                                                                       | `undefined` |
| `header`           | `string`<br />or `node` | Content that will be rendered as the component's header.<br />If a string is provided, it will be rendered with default styling as a header tag. | `undefined` |
| `children`         | `node`                  | Content that will be rendered inside the root-level element.                                                                                     | `undefined` |
| `collapsible`      | `boolean`               | Determines whether or not the Group is collapsible                                                                                               | `false`     |
| `defaultCollapsed` | `boolean`               | Determines whether or not the SideNavGroup should be collapsed by default.                                                                       | `true`      |

_Any other properties will be spread on the root-level element._

# Side Nav Item

## Properties

| Prop               | Type                          | Description                                                                                                                                                                                                                                                                                   | Default     |
| ------------------ | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `active`           | `boolean`                     | Whether or not the component should be rendered in an active state.                                                                                                                                                                                                                           | `false`     |
| `disabled`         | `boolean`                     | Whether or not the component should be rendered in a disabled state.                                                                                                                                                                                                                          | `false`     |
| `ariaCurrentValue` | `enum`                        | The aria-current attribute value set when the component is active.<br/>See the [WAI-ARIA 1.1 spec](https://www.w3.org/TR/wai-aria-1.1/#aria-current 'WAI-ARIA 1.1 Spec') for a list of accepted values.                                                                                       | `'page'`    |
| `className`        | `string`                      | Class name that will be applied to the component's header.                                                                                                                                                                                                                                    | `undefined` |
| `children`         | `node`                        | Content that will be rendered inside the root-level element.                                                                                                                                                                                                                                  | `undefined` |
| `href`             | `string`                      | When provided, the component will be rendered as an anchor element.                                                                                                                                                                                                                           | `undefined` |
| `as`               | `HTML Tag` or `React Element` | When provided, the component will be rendered as the component or html tag indicated by this prop. <br/>Other additional props will be spread on the anchor element. For example, `Link` or `a` tags can be supplied to replace `button` from being the DOM element that wraps the component. | `undefined` |

_When `href` is set, `href` and any additional props will be spread on the anchor element._

_When `as` is set, any additional props will be spread on the provided component or html tag._

_Otherwise, any other properties will be spread on the root-level element (`button`)._
