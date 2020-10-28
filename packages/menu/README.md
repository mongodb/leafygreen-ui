# Menu

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/menu.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/menu--controlled)

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
```

**Output HTML**

```html
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
```

## Properties

| Prop               | Type                                           | Description                                                                                                                                                                                                                                                             | Default      |
| ------------------ | ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `open`             | `boolean`                                      | Determines whether or not the `<Menu />` will appear as open or closed                                                                                                                                                                                                  | `false`      |
| `setOpen`          | `function`                                     | When controlling the component, use `setOpen` to keep track of the `<Menu />` component's state so that clicks on the document's backdrop as well as a user pressing the Escape Key will close the Menu and update the consuming application's local state accordingly. |              |
| `shouldClose`      | `function`                                     | Determines if the `Menu` should close when the backdrop or Escape keys are clicked. Defaults to true.                                                                                                                                                                   | `() => true` |
| `align`            | `'top'` \| `'bottom'` \| `'left'` \| `'right'` | Determines the alignment of the `<Menu />` component relative to a reference element, or the element's nearest parent                                                                                                                                                   | `'bottom'`   |
| `justify`          | `'start'` \| `'middle'` \| `'end'`             | Determines the justification of the `Menu` component (based on the alignment) relative to a reference element or the element's nearest parent                                                                                                                           | `'end'`      |
| `refEl`            | `HTMLElement`                                  | Pass a reference to an element that the `Menu` component should be positioned against                                                                                                                                                                                   |              |
| `trigger`          | `React.ReactNode`                              | A `React.ReactNode` against which the Menu will be positioned.                                                                                                                                                                                                          |              |
| `usePortal`        | `boolean`                                      | Will position Menu's children relative to its parent without using a Portal if `usePortal` is set to false. NOTE: The parent element should be CSS position relative, fixed, or absolute if using this option.                                                          | `true`       |
| `adjustOnMutation` | `boolean`                                      | Determines whether or not the `<Menu/>` should reposition itself based on changes to `trigger` or reference element position.                                                                                                                                           | `false`      |

_Any other properties will be spread on the Menu `ul` container_

# MenuSeparator

## Properties

| Prop | Type | Description | Default |
| ---- | ---- | ----------- | ------- |
|      |      |             |         |

Self-closing component that provides a way to group `MenuItems` in a `Menu` component.

# MenuItem

## Properties

| Prop          | Type                                     | Description                                                                                      | Default     |
| ------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------ | ----------- |
| `href`        | `string`                                 | If supplied, will render the `<MenuItem />` inside of an `<a>` tag, rather than a `<button>` tag |             |
| `children`    | `node`                                   | Content to appear inside of `<MenuItem />` component                                             |             |
| `className`   | `string`                                 | Classname applied to `li` element                                                                |             |
| `onClick`     | `function`                               | Function that will be called when a `<MenuItem />` is clicked                                    |             |
| `active`      | `boolean`                                | Determines if the `<MenuItem />` is `active`                                                     | `false`     |
| `disabled`    | `boolean`                                | Determines if the `<MenuItem />` is `disabled`                                                   | `false`     |
| `description` | `React.ReactElement`                     | Content to appear below main text of the `<MenuItem />`                                          |             |
| `as`          | `React.ElementType`                      | Determines what the `<MenuItem />` will be rendered as                                           |             |
| `size`        | `default` \| `large`                     | Size of the `<MenuItem />` component                                                             | `'default'` |
| `glyph`       | `React.ReactElement`                     | Slot to pass in an Icon rendered to the left of `<MenuItem />` text.                             |             |
| ...           | `React.ComponentPropsWithRef<typeof as>` | Any other properties will be spread on the MenuItem root container                               |             |

# SubMenu

## Properties

| Prop          | Type                                             | Description                                                                                     | Default |
| ------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------------------- | ------- |
| `open`        | `boolean`                                        | Determines if `<SubMenu />` item appears open                                                   | `false` |
| `setOpen`     | `function`                                       | Function to set the value of `open` in `<SubMenu />`                                            |         |
| `className`   | `string`                                         | className applied to `SubMenu` root element                                                     |         |
| `description` | `React.ReactElement`                             | Content to appear below main text of SubMenu                                                    |         |
| `active`      | `boolean`                                        | Determines if `<SubMenu />` appears `active`                                                    | `false` |
| `disabled`    | `boolean`                                        | Determines if `<SubMenu />` appears `disabled`                                                  | `false` |
| `glyph`       | `React.ReactElement`                             | Slot to pass in an Icon rendered to the left of `<SubMenu />` text.                             |         |
| `title`       | `string`                                         | Main text rendered in `<SubMenu />`                                                             |         |
| `href`        | `string`                                         | If supplied, will render the `<SubMenu />` inside of an `<a>` tag, rather than a `<button>` tag |         |
| `spacing`     | `number`                                         | Distance between the content rendered inside of the Menu and the trigger                        | `15`    |
| ...           | `React.ComponentPropsWithRef<'a'` \| `'button'>` | Any other properties will be spread on the rendered HTML element or component.                  |         |

# Advanced Use Case

## Example

```js
import { Menu, MenuSeparator, MenuItem } from '@leafygreen-ui/menu';

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

## Output HTML

```html
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

| Prop      | Type                            | Description                                                                                                                                                                                            | Default |
| --------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `trigger` | `function` \| `React.ReactNode` | The trigger prop can also support being passed a function. To work as expected, the function must accept an argument of `children`, which should be rendered inside of the function passed to trigger. |         |
