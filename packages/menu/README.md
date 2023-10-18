# Menu

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/menu.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/menu/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/menu
```

### NPM

```shell
npm install @leafygreen-ui/menu
```

## Peer Dependencies

| Package                              | Version  |
| ------------------------------------ | -------- |
| `@leafygreen-ui/leafygreen-provider` | `^1.1.0` |

## Example

```js
import { Menu, MenuSeparator, MenuItem } from '@leafygreen-ui/menu';

// Trigger as an HTML Element
<Menu align="bottom" justify="start" trigger={<button>trigger</button>}>
  <MenuItem active>Active Menu Item</MenuItem>
  <MenuItem
    disabled={boolean('Disabled', true)}
    description="I am a description"
  >
    Disabled Menu Item
  </MenuItem>
  <MenuItem description="I am also a description">
    Menu Item With Description
  </MenuItem>
  <MenuItem href="http://mongodb.design">I am a link!</MenuItem>
</Menu>;

// Trigger as a function
<Menu
  align="bottom"
  justify="start"
  trigger={({ onClick, children }) => (
    <button onClick={onClick}>
      Example Trigger
      {children}
    </button>
  )}
>
  <MenuItem>Menu Item 1</MenuItem>
  <MenuItem>Menu Item 2</MenuItem>
  <MenuItem>Menu Item 3</MenuItem>
</Menu>;
```

**Output HTML**

```html
<!-- Trigger as an HTML Element -->
<button>
  trigger
  <div class="leafygreen-ui-1hyfx7x"></div>
</button>
<div class="leafygreen-ui-19z0mfw">
  <ul class="leafygreen-ui-1guv7w9" role="menu">
    <li role="none">
      <button
        data-leafygreen-ui="menu-item-container"
        class="leafygreen-ui-19xfwtd"
        role="menuitem"
        aria-disabled="false"
      >
        <div class="leafygreen-ui-14a8fex">Active Menu Item</div>
      </button>
    </li>
    <li role="none">
      <button
        data-leafygreen-ui="menu-item-container"
        class="leafygreen-ui-7pgwa0"
        role="menuitem"
        aria-disabled="true"
        tabindex="-1"
      >
        <div class="leafygreen-ui-10xqyru">Disabled Menu Item</div>
        <div class="leafygreen-ui-17sf9go">I am a description</div>
      </button>
    </li>
    <li role="none">
      <button
        data-leafygreen-ui="menu-item-container"
        class="leafygreen-ui-1sk3xcx"
        role="menuitem"
        aria-disabled="false"
      >
        <div class="leafygreen-ui-r0sqyc">Menu Item With Description</div>
        <div class="leafygreen-ui-1dm36mc">I am also a description</div>
      </button>
    </li>
    <li role="none">
      <a
        data-leafygreen-ui="menu-item-container"
        target="_blank"
        rel="noopener noreferrer"
        class="leafygreen-ui-1sk3xcx"
        role="menuitem"
        aria-disabled="false"
        href="http://mongodb.design"
        ><div class="leafygreen-ui-r0sqyc">I am a link!</div></a
      >
    </li>
  </ul>
</div>

<!-- Trigger as a function -->
<button>
  Example Trigger
  <div class="leafygreen-ui-1hyfx7x"></div>
</button>
<div class="leafygreen-ui-1td4qre">
  <ul class="leafygreen-ui-1guv7w9" role="menu">
    <li role="none">
      <button
        data-leafygreen-ui="menu-item-container"
        class="leafygreen-ui-1sk3xcx"
        role="menuitem"
        aria-disabled="false"
      >
        <div class="leafygreen-ui-r0sqyc">Menu Item 1</div>
      </button>
    </li>
    <li role="none">
      <button
        data-leafygreen-ui="menu-item-container"
        class="leafygreen-ui-1sk3xcx"
        role="menuitem"
        aria-disabled="false"
      >
        <div class="leafygreen-ui-r0sqyc">Menu Item 2</div>
      </button>
    </li>
    <li role="none">
      <button
        data-leafygreen-ui="menu-item-container"
        class="leafygreen-ui-1sk3xcx"
        role="menuitem"
        aria-disabled="false"
      >
        <div class="leafygreen-ui-r0sqyc">Menu Item 3</div>
      </button>
    </li>
  </ul>
</div>
```

## Usage with NextJS Link components

We recommend using `Menu` with NextJS's links components in the following pattern:

```
import NextLink from 'next/link';

function CustomLink({ href, children, ...props }) {
  return (
    <NextLink href={href}>
      <a {...props}>
        {children}
      </a>
    </NextLink>
  );
}

<Menu trigger={<button onClick={handleClick}>trigger</button>} open={open}>
  <MenuItem as={CustomLink} href="/test">
    Test
  </MenuItem>
  <SubMenu
    title="Submenu"
    href="http://mongodb.design"
  >
    <MenuItem>SubMenu Item 1</MenuItem>
    <MenuItem as={CustomLink} href="/test-2">
      SubMenu Item 2
    </MenuItem>
  </SubMenu>
</Menu>
```

This pattern is recommended given the `SubMenu` component expects to pass styling through the `className` prop, which would not apply correctly if it was passed to `NextLink`.

In other words, defining a `MenuItem` as:

```
<MenuItem as={CustomLink} href="/test-2">
  SubMenu Item 2
  </MenuItem>
```

would render, but without the correct styles.

## Properties

| Prop               | Type                                     | Description                                                                                                                                                                                                                                                             | Default      |
| ------------------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `open`             | `boolean`                                | Determines whether or not the `<Menu />` will appear as open or closed                                                                                                                                                                                                  | `false`      |
| `setOpen`          | `function`                               | When controlling the component, use `setOpen` to keep track of the `<Menu />` component's state so that clicks on the document's backdrop as well as a user pressing the Escape Key will close the Menu and update the consuming application's local state accordingly. |              |
| `initialOpen`      | `boolean`                                | Passes an initial value for "open" to an uncontrolled menu                                                                                                                                                                                                              | `false`      |
| `shouldClose`      | `function`                               | Determines if the `Menu` should close when the backdrop or Escape keys are clicked. Defaults to true.                                                                                                                                                                   | `() => true` |
| `align`            | `'top'`, `'bottom'`, `'left'`, `'right'` | Determines the alignment of the `<Menu />` component relative to a reference element, or the element's nearest parent                                                                                                                                                   | `'bottom'`   |
| `justify`          | `'start'`, `'middle'`, `'end'`           | Determines the justification of the `Menu` component (based on the alignment) relative to a reference element or the element's nearest parent                                                                                                                           | `'end'`      |
| `refEl`            | `HTMLElement`                            | Pass a reference to an element that the `Menu` component should be positioned against                                                                                                                                                                                   |              |
| `trigger`          | `function`, `React.ReactNode`            | A `ReactNode` against which the Menu will be positioned. The trigger prop can also support being passed a function. To work as expected, the function must accept an argument of `children`, which should be rendered inside of the function passed to trigger.         |              |
| `usePortal`        | `boolean`                                | Will position Menu's children relative to its parent without using a Portal if `usePortal` is set to false. NOTE: The parent element should be CSS position relative, fixed, or absolute if using this option.                                                          | `true`       |
| `adjustOnMutation` | `boolean`                                | Determines whether or not the `<Menu/>` should reposition itself based on changes to `trigger` or reference element position.                                                                                                                                           | `false`      |
| `usePortal`        | `boolean`                                | Determines if the Menu will be rendered within a portal.                                                                                                                                                                                                                | `true`       |
| `portalContainer`  | `HTMLElement`, `null`                    | Sets the container used for the popover's portal.                                                                                                                                                                                                                       |              |
| `scrollContainer`  | `HTMLElement`, `null`                    | If the popover portal has a scrollable ancestor other than the window, this prop allows passing a reference to that lement to allow the portal to position properly.                                                                                                    |              |
| `portalClassName`  | `string`                                 | Passes the given className to the popover's portal container if the default portal container is being used.                                                                                                                                                             |              |
| `popoverZIndex`    | `number`                                 | Sets the z-index CSS property for the popover.                                                                                                                                                                                                                          |              |
| `darkMode`         | `boolean`                                | Determines whether or not the component will be rendered in dark theme.                                                                                                                                                                                                 |              |

_Any other properties will be spread on the Menu `ul` container_

# MenuItem

## Properties

| Prop          | Type                                               | Description                                                                                      | Default     |
| ------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------- |
| `href`        | `string`                                           | If supplied, will render the `<MenuItem />` inside of an `<a>` tag, rather than a `<button>` tag |             |
| `children`    | `node`                                             | Content to appear inside of `<MenuItem />` component                                             |             |
| `className`   | `string`                                           | Classname applied to `li` element                                                                |             |
| `onClick`     | `function`                                         | Function that will be called when a `<MenuItem />` is clicked                                    |             |
| `active`      | `boolean`                                          | Determines if the `<MenuItem />` is `active`                                                     | `false`     |
| `disabled`    | `boolean`                                          | Determines if the `<MenuItem />` is `disabled`                                                   | `false`     |
| `description` | `node`                                             | Content to appear below main text of the `<MenuItem />`                                          |             |
| `as`          | `React.ElementType`                                | Determines what the `<MenuItem />` will be rendered as                                           |             |
| `size`        | `default`, `large`                                 | Size of the `<MenuItem />` component                                                             | `'default'` |
| `glyph`       | `React.ReactElement`                               | Slot to pass in an Icon rendered to the left of `<MenuItem />` text.                             |             |
| `variant`     | `'default', 'destructive'`                         | Determines variant of `<MenuItem />` component                                                   | `'default'` |
| ...           | native attributes of component passed to `as` prop | Any other props will be spread on the root element                                               |             |

# SubMenu

## Properties

| Prop          | Type                                   | Description                                                                                     | Default |
| ------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------- | ------- |
| `open`        | `boolean`                              | Determines if `<SubMenu />` item appears open                                                   | `false` |
| `setOpen`     | `function`                             | Function to set the value of `open` in `<SubMenu />`                                            |         |
| `className`   | `string`                               | className applied to `SubMenu` root element                                                     |         |
| `description` | `string`, `React.ReactElement`         | Content to appear below main text of SubMenu                                                    |         |
| `active`      | `boolean`                              | Determines if `<SubMenu />` appears `active`                                                    | `false` |
| `disabled`    | `boolean`                              | Determines if `<SubMenu />` appears `disabled`                                                  | `false` |
| `glyph`       | `React.ReactElement`                   | Slot to pass in an Icon rendered to the left of `<SubMenu />` text.                             |         |
| `title`       | `string`                               | Main text rendered in `<SubMenu />`                                                             |         |
| `href`        | `string`                               | If supplied, will render the `<SubMenu />` inside of an `<a>` tag, rather than a `<button>` tag |         |
| `spacing`     | `number`                               | Distance between the content rendered inside of the Menu and the trigger                        | `15`    |
| ...           | native `anchor` or `button` attributes | Any other props will be spread on the root element                                              |         |
